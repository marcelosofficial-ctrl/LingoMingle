import test from "node:test";
import assert from "node:assert/strict";
import { mapKoreanPos } from "../src/features/glossary/korean-pos.mjs";
import { lookupGlosses } from "../src/features/glossary/matching.mjs";

const kiwi = (tag) => mapKoreanPos({ scheme: "kiwi-sejong-v1", tag });
const nikl = (tag) => mapKoreanPos({ scheme: "nikl-basic-v1", tag });

test("Kiwi common and proper nouns map to the shared noun category", () => {
  assert.equal(kiwi("NNG").tag, "noun");
  assert.equal(kiwi("NNP").tag, "noun");
  assert.equal(kiwi("NNB").tag, "bound-noun");
  assert.deepEqual(kiwi("NNP").source, { scheme: "kiwi-sejong-v1", tag: "NNP" });
});

test("Kiwi irregular and regular suffix variants preserve raw source tags", () => {
  assert.equal(kiwi("VV-I").tag, "verb");
  assert.equal(kiwi("VA-R").tag, "adjective");
  assert.deepEqual(kiwi("VV-I").source, { scheme: "kiwi-sejong-v1", tag: "VV-I" });
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

test("NIKL numeric POS codes and Korean labels map to the same scheme", () => {
  const pairs = [
    ["1", "명사", "noun"], ["2", "대명사", "pronoun"], ["3", "수사", "numeral"],
    ["4", "조사", "particle"], ["5", "동사", "verb"], ["6", "형용사", "adjective"],
    ["7", "관형사", "determiner"], ["8", "부사", "adverb"], ["9", "감탄사", "interjection"],
    ["10", "접사", "affix"], ["11", "의존 명사", "bound-noun"],
    ["12", "보조 동사", "auxiliary-verb"], ["13", "보조 형용사", "auxiliary-adjective"],
    ["14", "어미", "ending"],
  ];

  for (const [code, label, canonical] of pairs) {
    assert.equal(nikl(code).tag, canonical);
    assert.equal(nikl(label).tag, canonical);
  }
  assert.equal(nikl("5").scheme, "lingomingle-pos-v1");
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
  assert.equal(mapKoreanPos({ scheme: "kiwi-sejong-v1", tag: " " }), null);
});

test("mapped Kiwi and NIKL verbs share canonical POS and remain traceable", () => {
  const kiwiVerb = kiwi("VV");
  const niklVerb = nikl("5");

  assert.equal(kiwiVerb.scheme, niklVerb.scheme);
  assert.equal(kiwiVerb.tag, niklVerb.tag);
  assert.deepEqual(kiwiVerb.source, { scheme: "kiwi-sejong-v1", tag: "VV" });
  assert.deepEqual(niklVerb.source, { scheme: "nikl-basic-v1", tag: "5" });
});

test("canonical crosswalk result can safely match a Korean gloss entry", () => {
  const pos = nikl("5");
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
    partOfSpeech: nikl("5"),
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
