import test from "node:test";
import assert from "node:assert/strict";
import { lookupGlosses } from "../src/features/glossary/matching.mjs";

const japaneseEntries = [
  {
    id: "ja-hot-weather",
    sourceId: "synthetic-ja",
    language: "ja",
    surfaceForms: ["暑い"],
    lemma: "暑い",
    reading: "あつい",
    partOfSpeech: "adjective",
    senses: [{ id: "s1", englishGloss: "hot weather" }],
    priority: 1,
  },
  {
    id: "ja-hot-touch",
    sourceId: "synthetic-ja",
    language: "ja",
    surfaceForms: ["熱い"],
    lemma: "熱い",
    reading: "あつい",
    partOfSpeech: "adjective",
    senses: [{ id: "s1", englishGloss: "hot to the touch" }],
    priority: 2,
  },
  {
    id: "ja-thick",
    sourceId: "synthetic-ja",
    language: "ja",
    surfaceForms: ["厚い"],
    lemma: "厚い",
    reading: "あつい",
    partOfSpeech: "adjective",
    senses: [{ id: "s1", englishGloss: "thick" }],
    priority: 3,
  },
];

const koreanEntries = [
  {
    id: "ko-eat",
    sourceId: "synthetic-ko",
    language: "ko",
    surfaceForms: ["먹다"],
    lemma: "먹다",
    partOfSpeech: "verb",
    senses: [{ id: "s1", englishGloss: "to eat" }],
    learnerLevel: "beginner",
    frequencyRank: 120,
    domainLabels: ["food"],
    priority: 1,
  },
];

test("Japanese reading lookup preserves homonym candidates and their glosses", () => {
  const results = lookupGlosses(japaneseEntries, {
    language: "ja",
    surfaceForm: "atsui",
    reading: "あつい",
  });

  assert.deepEqual(results.map((match) => match.entry.id), [
    "ja-hot-weather",
    "ja-hot-touch",
    "ja-thick",
  ]);
  assert.deepEqual(results.map((match) => match.entry.senses[0].englishGloss), [
    "hot weather",
    "hot to the touch",
    "thick",
  ]);
  assert.ok(results.every((match) => match.matchedBy === "reading"));
});

test("Japanese inflected surface resolves only with matching lemma and reading", () => {
  const results = lookupGlosses(japaneseEntries, {
    language: "ja",
    surfaceForm: "暑かった",
    lemma: "暑い",
    reading: "あつい",
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].entry.id, "ja-hot-weather");
  assert.equal(results[0].matchedBy, "lemma-reading");
});

test("exact surface lookup returns the selected Japanese spelling", () => {
  const results = lookupGlosses(japaneseEntries, {
    language: "ja",
    surfaceForm: "熱い",
  });

  assert.deepEqual(results.map((match) => match.entry.id), ["ja-hot-touch"]);
  assert.equal(results[0].matchedBy, "surface");
});

test("Korean inflected form resolves through lemma and part of speech", () => {
  const results = lookupGlosses(koreanEntries, {
    language: "ko",
    surfaceForm: "먹어요",
    lemma: "먹다",
    partOfSpeech: "verb",
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].entry.senses[0].englishGloss, "to eat");
  assert.equal(results[0].matchedBy, "lemma-pos");
});

test("Korean lemma lookup refuses a part-of-speech mismatch", () => {
  const results = lookupGlosses(koreanEntries, {
    language: "ko",
    surfaceForm: "먹어요",
    lemma: "먹다",
    partOfSpeech: "noun",
  });

  assert.deepEqual(results, []);
});

test("unknown words return no invented gloss", () => {
  assert.deepEqual(lookupGlosses([], {
    language: "ja",
    surfaceForm: "unlisted-word",
  }), []);
});

test("matches preserve the original dictionary source identifier", () => {
  const results = lookupGlosses(koreanEntries, {
    language: "ko",
    surfaceForm: "먹다",
  });

  assert.equal(results[0].entry.sourceId, "synthetic-ko");
});

test("surface lookup normalizes compatibility forms and surrounding whitespace", () => {
  const entries = [{
    id: "ja-normalized",
    sourceId: "synthetic-ja",
    language: "ja",
    surfaceForms: ["ＡＢＣ"],
    lemma: "ＡＢＣ",
    senses: [{ id: "s1", englishGloss: "synthetic test token" }],
    priority: 1,
  }];

  const results = lookupGlosses(entries, {
    language: "ja",
    surfaceForm: "  ABC  ",
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].matchedBy, "surface");
});
