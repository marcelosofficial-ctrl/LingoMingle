import { mapKoreanPos } from "./korean-pos.mjs";

const SOURCE_ID = "nikl-korean-basic-dictionary";
const HTML_ENTITIES = Object.freeze({
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: "\u00a0",
  quot: '"',
});

const asArray = (value) => (Array.isArray(value) ? value : value == null ? [] : [value]);
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isNumericId = (value) => typeof value === "string" && /^\d+$/u.test(value) && Number.isSafeInteger(Number(value));

function readFeatures(node) {
  if (!isRecord(node)) return null;
  const raw = node.feat;
  const items = Array.isArray(raw) ? raw : [raw];
  if (items.length === 0 || items.some((item) => !isRecord(item))) return null;

  const features = Object.create(null);
  for (const item of items) {
    if (typeof item.att !== "string" || !item.att || typeof item.val !== "string") return null;
    if (Object.hasOwn(features, item.att)) return null;
    features[item.att] = item.val;
  }
  return features;
}

function readEntryIdentity(record) {
  if (!isRecord(record) || record.att !== "id" || !isNumericId(record.val)) return null;
  const features = readFeatures(record);
  if (!features || typeof features.lexicalUnit !== "string") return null;
  return { id: record.val, lexicalUnit: features.lexicalUnit };
}

function decodeHtmlEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z][a-z\d]+);/giu, (match, token) => {
    if (token[0] !== "#") {
      const decoded = HTML_ENTITIES[token.toLowerCase()];
      if (decoded === undefined) throw new TypeError("unknown-html-entity");
      return decoded;
    }

    const hexadecimal = token[1]?.toLowerCase() === "x";
    const codePoint = Number.parseInt(token.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    if (!Number.isSafeInteger(codePoint) || codePoint <= 0 || codePoint > 0x10ffff
      || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
      throw new TypeError("invalid-html-codepoint");
    }
    return String.fromCodePoint(codePoint);
  });
}

function normalizeText(value) {
  if (typeof value !== "string" || !value) return null;
  try {
    const decoded = decodeHtmlEntities(value).replace(/\t/gu, " ").normalize("NFC").trim();
    if (!decoded || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(decoded)) return null;
    for (let index = 0; index < decoded.length; index += 1) {
      const unit = decoded.charCodeAt(index);
      if (unit >= 0xd800 && unit <= 0xdbff) {
        const next = decoded.charCodeAt(index + 1);
        if (!(next >= 0xdc00 && next <= 0xdfff)) return null;
        index += 1;
      } else if (unit >= 0xdc00 && unit <= 0xdfff) {
        return null;
      }
    }
    return decoded;
  } catch {
    return null;
  }
}

function reject(reason) {
  return { status: "rejected", reason };
}

export function normalizeNiklEntry(record) {
  const identity = readEntryIdentity(record);
  if (!identity) return reject("invalid-entry");
  if (identity.lexicalUnit !== "단어") return { status: "skipped", reason: "non-word" };

  const entryFeatures = readFeatures(record);
  if (typeof entryFeatures.partOfSpeech !== "string" || typeof entryFeatures.vocabularyLevel !== "string") {
    return reject("invalid-entry-metadata");
  }

  const lemmaNodes = asArray(record.Lemma);
  const writtenForms = lemmaNodes.flatMap((node) => {
    const features = readFeatures(node);
    return features && Object.hasOwn(features, "writtenForm") ? [features.writtenForm] : [];
  });
  if (writtenForms.length !== 1) return reject("invalid-lemma");
  const lemma = normalizeText(writtenForms[0]);
  if (!lemma) return reject("invalid-lemma");

  const senses = asArray(record.Sense);
  if (senses.length === 0) return reject("missing-senses");
  const seenSenseOrders = new Set();
  const normalizedSenses = [];

  for (const sense of senses) {
    if (!isRecord(sense) || sense.att !== "id" || !isNumericId(sense.val) || !readFeatures(sense)) {
      return reject("invalid-sense");
    }
    if (seenSenseOrders.has(sense.val)) return reject("duplicate-sense-order");
    seenSenseOrders.add(sense.val);

    const english = asArray(sense.Equivalent)
      .map((equivalent) => readFeatures(equivalent))
      .filter((features) => features?.language === "영어");
    if (english.length === 0) return { status: "skipped", reason: "incomplete-english" };
    if (english.length !== 1) return reject("duplicate-english-equivalent");

    const englishEquivalent = normalizeText(english[0].lemma);
    const englishGloss = normalizeText(english[0].definition);
    if (!englishEquivalent || !englishGloss) return reject("invalid-english-translation");

    normalizedSenses.push({
      id: `nikl-kbd:${identity.id}:${sense.val}`,
      englishEquivalent,
      englishGloss,
    });
  }

  const partOfSpeech = mapKoreanPos({
    scheme: "nikl-basic-pos-api-v1",
    tag: entryFeatures.partOfSpeech,
  });

  return {
    status: "accepted",
    entry: {
      id: `nikl-kbd:${identity.id}`,
      sourceId: SOURCE_ID,
      language: "ko",
      surfaceForms: [lemma],
      lemma,
      ...(partOfSpeech ? { partOfSpeech } : {}),
      senses: normalizedSenses,
      learnerLevel: entryFeatures.vocabularyLevel,
      priority: 0,
    },
  };
}

/**
 * Create one normalizer per import stream. A duplicate word-entry ID is a hard
 * failure; callers must abort the data-pack build rather than keep either copy.
 */
export function createNiklEntryNormalizer() {
  const seenWordIds = new Set();
  return (record) => {
    const identity = readEntryIdentity(record);
    if (identity?.lexicalUnit === "단어") {
      if (seenWordIds.has(identity.id)) return reject("duplicate-entry-id");
      seenWordIds.add(identity.id);
    }
    return normalizeNiklEntry(record);
  };
}
