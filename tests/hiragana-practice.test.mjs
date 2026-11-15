import test from "node:test";
import assert from "node:assert/strict";
import {
  buildHiraganaQuestion,
  getNextHiraganaQuestionIndex,
  isCorrectHiraganaAnswer
} from "../src/features/kana/hiraganaPractice.ts";

test("questions are deterministic and contain one correct answer", () => {
  const first = buildHiraganaQuestion("k", 0);
  assert.deepEqual(buildHiraganaQuestion("k", 0), first);
  assert.equal(first.prompt.kana, "か");
  assert.equal(first.choices.length, 4);
  assert.equal(first.choices.filter((choice) => choice.romaji === first.correctRomaji).length, 1);
});

test("distractors are unique and remain within the selected row", () => {
  const question = buildHiraganaQuestion("s", 2);
  assert.equal(new Set(question.choices.map((choice) => choice.id)).size, question.choices.length);
  assert.ok(question.choices.every((choice) => choice.row === "s"));
  assert.ok(question.choices.length <= 4);
});

test("short Y row produces three distinct choices and cycles predictably", () => {
  const question = buildHiraganaQuestion("y", 4);
  assert.equal(question.prompt.kana, "ゆ");
  assert.deepEqual(question.choices.map((choice) => choice.kana), ["よ", "や", "ゆ"]);
  assert.equal(question.roundLength, 3);
});

test("answer checking distinguishes correct and incorrect romaji", () => {
  const question = buildHiraganaQuestion("t", 1);
  assert.equal(isCorrectHiraganaAnswer(question, "chi"), true);
  assert.equal(isCorrectHiraganaAnswer(question, "ti"), false);
});

test("round progression ends exactly at the selected row size", () => {
  assert.equal(getNextHiraganaQuestionIndex(0, 5), 1);
  assert.equal(getNextHiraganaQuestionIndex(3, 5), 4);
  assert.equal(getNextHiraganaQuestionIndex(4, 5), null);
  assert.equal(getNextHiraganaQuestionIndex(2, 3), null);
});

test("invalid rows and question indices fail closed", () => {
  assert.throws(() => buildHiraganaQuestion("nasal", 0), /at least two/);
  assert.throws(() => buildHiraganaQuestion("k", -1), /non-negative/);
  assert.throws(() => getNextHiraganaQuestionIndex(-1, 5), /valid/);
});
