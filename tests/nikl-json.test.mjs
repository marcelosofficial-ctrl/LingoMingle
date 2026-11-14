import test from "node:test";
import assert from "node:assert/strict";
import { createNiklEntryNormalizer, normalizeNiklEntry } from "../src/features/glossary/nikl-json.mjs";

const feat = (att, val) => ({ att, val });
const equivalent = (language, lemma, definition) => ({
  feat: [feat("language", language), feat("lemma", lemma), feat("definition", definition)],
});
const sense = (order, translations = [equivalent("영어", "synthetic-equivalent", "synthetic definition")]) => ({
  att: "id",
  val: String(order),
  feat: feat("definition", "synthetic source definition"),
  Equivalent: translations,
});
const entry = (overrides = {}) => ({
  att: "id",
  val: "990001",
  feat: [
    feat("lexicalUnit", "단어"),
    feat("partOfSpeech", "명사"),
    feat("vocabularyLevel", "초급"),
  ],
  Lemma: { feat: feat("writtenForm", "LM_TEST_표제어") },
  Sense: sense(1),
  ...overrides,
});

test("normalizes an object-shaped word entry and preserves English equivalent separately", () => {
  const result = normalizeNiklEntry(entry({
    WordForm: { feat: [feat("type", "발음"), feat("sound", "must-not-leak")] },
    Sense: {
      ...sense(1, [equivalent("영어", "synthetic &quot;term&quot;", "synthetic it&apos;s meaning")]),
      SenseExample: [{ feat: feat("example", "must-not-leak") }],
      Multimedia: [{ feat: feat("url", "must-not-leak") }],
    },
    RelatedForm: { feat: feat("writtenForm", "must-not-leak") },
  }));

  assert.equal(result.status, "accepted");
  assert.equal(result.entry.id, "nikl-kbd:990001");
  assert.equal(result.entry.sourceId, "nikl-korean-basic-dictionary");
  assert.equal(result.entry.lemma, "LM_TEST_표제어");
  assert.deepEqual(result.entry.surfaceForms, ["LM_TEST_표제어"]);
  assert.equal(result.entry.partOfSpeech.tag, "noun");
  assert.equal(result.entry.partOfSpeech.source.tag, "명사");
  assert.equal(result.entry.learnerLevel, "초급");
  assert.equal(result.entry.senses[0].id, "nikl-kbd:990001:1");
  assert.equal(result.entry.senses[0].englishEquivalent, 'synthetic "term"');
  assert.equal(result.entry.senses[0].englishGloss, "synthetic it's meaning");
  assert.equal(JSON.stringify(result.entry).includes("must-not-leak"), false);
  assert.equal(result.entry.priority, 0);
});

test("normalizes array-shaped singleton fields and multiple ordered senses", () => {
  const result = normalizeNiklEntry(entry({
    feat: [
      feat("lexicalUnit", "단어"),
      feat("partOfSpeech", "명사"),
      feat("vocabularyLevel", "중급"),
    ],
    Lemma: [
      { feat: feat("writtenForm", "LM_ARRAY_표제어") },
      { feat: feat("variant", "must-not-be-surface") },
    ],
    Sense: [
      sense(1, [equivalent("일본어", "ignored", "ignored"), equivalent("영어", "first", "first meaning")]),
      sense(2, [equivalent("영어", "second", "second meaning")]),
    ],
  }));

  assert.equal(result.status, "accepted");
  assert.deepEqual(result.entry.surfaceForms, ["LM_ARRAY_표제어"]);
  assert.deepEqual(result.entry.senses.map((item) => item.id), [
    "nikl-kbd:990001:1",
    "nikl-kbd:990001:2",
  ]);
  assert.deepEqual(result.entry.senses.map((item) => item.englishEquivalent), ["first", "second"]);
});

test("normalizes tabs, outer whitespace, numeric entities and NFC without collapsing spaces", () => {
  const decomposed = "cafe\u0301";
  const result = normalizeNiklEntry(entry({
    Sense: sense(1, [equivalent("영어", "  &#x27;word&#39;  ", `  ${decomposed}\t  keeps  spaces  `)]),
  }));

  assert.equal(result.status, "accepted");
  assert.equal(result.entry.senses[0].englishEquivalent, "'word'");
  assert.equal(result.entry.senses[0].englishGloss, "café   keeps  spaces");
});

test("skips non-word lexical units and entries with any untranslated sense", () => {
  const nonWord = normalizeNiklEntry(entry({
    feat: feat("lexicalUnit", "관용구"),
  }));
  const untranslated = normalizeNiklEntry(entry({
    Sense: [sense(1), sense(2, [equivalent("일본어", "ignored", "ignored")])],
  }));

  assert.deepEqual(nonWord, { status: "skipped", reason: "non-word" });
  assert.deepEqual(untranslated, { status: "skipped", reason: "incomplete-english" });
});

test("keeps snapshot no-POS entries surface-searchable but without a false canonical POS", () => {
  const result = normalizeNiklEntry(entry({
    feat: [
      feat("lexicalUnit", "단어"),
      feat("partOfSpeech", "품사 없음"),
      feat("vocabularyLevel", "없음"),
    ],
  }));

  assert.equal(result.status, "accepted");
  assert.equal(Object.hasOwn(result.entry, "partOfSpeech"), false);
  assert.deepEqual(result.entry.surfaceForms, ["LM_TEST_표제어"]);
  assert.equal(result.entry.learnerLevel, "없음");
});

test("rejects malformed IDs, duplicate sense order, duplicate English translations and unsafe entities", () => {
  assert.equal(normalizeNiklEntry(entry({ val: "not-numeric" })).reason, "invalid-entry");
  assert.equal(normalizeNiklEntry(entry({ Sense: [sense(1), sense(1)] })).reason, "duplicate-sense-order");
  assert.equal(normalizeNiklEntry(entry({
    Sense: sense(1, [equivalent("영어", "one", "one"), equivalent("영어", "two", "two")]),
  })).reason, "duplicate-english-equivalent");
  assert.equal(normalizeNiklEntry(entry({
    Sense: sense(1, [equivalent("영어", "bad &unknown;", "definition")]),
  })).reason, "invalid-english-translation");
  assert.equal(normalizeNiklEntry(entry({
    Sense: sense(1, [equivalent("영어", "term", "bad &#xD800;")]),
  })).reason, "invalid-english-translation");
});

test("stream normalizer rejects duplicate word IDs but ignores non-word ID collisions", () => {
  const normalize = createNiklEntryNormalizer();
  const first = normalize(entry());
  const phrase = normalize(entry({
    feat: [feat("lexicalUnit", "구")],
  }));
  const duplicate = normalize(entry());

  assert.equal(first.status, "accepted");
  assert.deepEqual(phrase, { status: "skipped", reason: "non-word" });
  assert.deepEqual(duplicate, { status: "rejected", reason: "duplicate-entry-id" });
});

test("normalization is deterministic for the same synthetic record", () => {
  const record = entry();
  assert.deepEqual(normalizeNiklEntry(record), normalizeNiklEntry(record));
});
