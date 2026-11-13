import test from "node:test";
import assert from "node:assert/strict";
import { mapKoreanPos } from "../src/features/glossary/korean-pos.mjs";
import { lookupGlosses } from "../src/features/glossary/matching.mjs";

const kiwi = (tag) => mapKoreanPos({ scheme: "kiwi-postag-v0.24.1", tag });
const nikl = (tag) => mapKoreanPos({ scheme: "nikl-basic-pos-api-v1", tag });

test("Kiwi common and proper nouns map to the shared noun category", () => {
  assert.equal(kiwi("NNG").tag, "noun");
  assert.equal(kiwi("NNP").tag, "noun");
  assert.equal(kiwi("NNB").tag, "bound-noun");
  assert.deepEqual(kiwi("NNP").source, { scheme: "kiwi-postag-v0.24.1", tag: "NNP" });
});

test("Kiwi irregular and regular suffix variants preserve raw source tags", () => {
  assert.equal(kiwi("VV-I").tag, "verb");
  assert.equal(kiwi("VA-R").tag, "adjective");
  assert.deepEqual(kiwi("VV-I").source, { scheme: "kiwi-postag-v0.24.1", tag: "VV-I" });
});

test("Kiwi maps unambiguous POS groups", () => {
  const pairs = [
    ["NR", "numeral"], ["NP", "pronoun"], ["VV", "verb"], ["VA", "adjective"],
    ["MM", "determiner"], ["MAG", "adverb"], ["MAJ", "adverb"],
    ["IC", "interjection"], ["JKS", "particle"], ["JC", "particle"],
    ["EP", "ending"], ["ETM", "ending"], ["XPN", "affix"], ["XSA", "affix"],
  ];

  for (const [raw, canonical] of pairs) assert.equal(kiwi(raw).tag, canonical);
});

test("NIKL result POS labels map while numeric search filters are rejected", () => {
  const pairs = [
    ["명사", "noun"], ["대명사", "pronoun"], ["수사", "numeral"], ["조사", "particle"],
    ["동사", "verb"], ["형용사", "adjective"], ["관형사", "determiner"], ["부사", "adverb"],
    ["감탄사", "interjection"], ["접사", "affix"], ["의존 명사", "bound-noun"],
    ["보조 동사", "auxiliary-verb"], ["보조 형용사", "auxiliary-adjective"], ["어미", "ending"],
  ];
  for (const [label, canonical] of pairs) assert.equal(nikl(label).tag, canonical);
  for (let filterCode = 0; filterCode <= 15; filterCode += 1) {
    assert.equal(nikl(String(filterCode)), null, String(filterCode));
  }
});

test("ambiguous or unsupported Kiwi tags remain unresolved", () => {
  for (const tag of ["VX", "VCP", "VCN", "SL", "SH", "SN", "SF", "UN", "Z_CODA", "UNKNOWN"]) {
    assert.equal(kiwi(tag), null, tag);
  }
});

test("NIKL all-POS and no-POS values remain unresolved", () => {
  assert.equal(nikl("0"), null);
  assert.equal(nikl("15"), null);
});

test("unknown POS source schemes are never guessed", () => {
  assert.equal(mapKoreanPos({ scheme: "unknown-pos-v1", tag: "VV" }), null);
  assert.equal(mapKoreanPos({ scheme: "kiwi-postag-v0.24.1", tag: " " }), null);
});

test("mapped Kiwi and NIKL verbs share canonical POS and remain traceable", () => {
  const kiwiVerb = kiwi("VV");
  const niklVerb = nikl("동사");

  assert.equal(kiwiVerb.scheme, niklVerb.scheme);
  assert.equal(kiwiVerb.tag, niklVerb.tag);
  assert.deepEqual(kiwiVerb.source, { scheme: "kiwi-postag-v0.24.1", tag: "VV" });
  assert.deepEqual(niklVerb.source, { scheme: "nikl-basic-pos-api-v1", tag: "5" });
});

test("canonical crosswalk result can safely match a Korean gloss entry", () => {
  const pos = nikl("동사");
  const entries = [{
    id: "synthetic-eat",
    sourceId: "synthetic-nikl",
    language: "ko",
    surfaceForms: ["먹다"],
    lemma: "먹다",
    partOfSpeech: pos,
    senses: [{ id: "synthetic-sense", englishGloss: "synthetic verb meaning" }],
    priority: 1,
  }];
  const results = lookupGlosses(entries, {
    language: "ko",
    surfaceForm: "먹어요",
    analysis: {
      surfaceForm: "먹어요",
      lemma: "먹다",
      partOfSpeech: kiwi("VV"),
    },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].matchedBy, "lemma-pos");
});

test("unresolved POS cannot pass Korean lemma matching", () => {
  const entries = [{
    id: "synthetic-eat",
    sourceId: "synthetic-nikl",
    language: "ko",
    surfaceForms: ["먹다"],
    lemma: "먹다",
    partOfSpeech: nikl("동사"),
    senses: [{ id: "synthetic-sense", englishGloss: "synthetic verb meaning" }],
    priority: 1,
  }];
  const results = lookupGlosses(entries, {
    language: "ko",
    surfaceForm: "먹어요",
    analysis: { surfaceForm: "먹어요", lemma: "먹다" },
  });

  assert.deepEqual(results, []);
});

test("unknown and inherited object-property names never become false POS tags", () => {
  for (const tag of ["__proto__", "constructor", "toString", "hasOwnProperty"]) {
    assert.equal(kiwi(tag), null, `Kiwi ${tag}`);
    assert.equal(nikl(tag), null, `NIKL ${tag}`);
  }
});
test("Kiwi derived adverb suffix is an affix; root and private tags stay unresolved", () => {
  assert.equal(kiwi("XSM").tag, "affix");
  assert.equal(kiwi("XSA-I").tag, "affix");
  for (const tag of ["XR", "UN", "USER0", "W_URL", "Z_CODA", "NNG-R", "JKS-I", "XSM-R"]) {
    assert.equal(kiwi(tag), null, tag);
  }
});
