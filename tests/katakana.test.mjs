import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function readCharacters(path) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const entries = [...source.matchAll(/\{ id: "([^"]+)", kana: "([^"]+)", romaji: "([^"]+)", row: "([^"]+)", rowIndex: (\d+), columnIndex: (\d+) \}/g)];
  return entries.map((match) => ({
    id: match[1], kana: match[2], romaji: match[3], row: match[4],
    rowIndex: Number(match[5]), columnIndex: Number(match[6])
  }));
}

const hiragana = await readCharacters("../src/features/kana/hiragana.ts");
const katakana = await readCharacters("../src/features/kana/katakana.ts");
const expectedRows = [
  ["vowels", "アイウエオ"], ["k", "カキクケコ"], ["s", "サシスセソ"],
  ["t", "タチツテト"], ["n", "ナニヌネノ"], ["h", "ハヒフヘホ"],
  ["m", "マミムメモ"], ["y", "ヤユヨ"], ["r", "ラリルレロ"],
  ["w", "ワヲ"], ["nasal", "ン"]
];

test("basic katakana dataset contains exactly 46 unique stable entries", () => {
  assert.equal(katakana.length, 46);
  assert.equal(new Set(katakana.map((c) => c.id)).size, 46);
  assert.equal(new Set(katakana.map((c) => c.kana)).size, 46);
  assert.ok(katakana.every((c) => c.id.startsWith("katakana-")));
});

test("katakana rows follow basic gojuon order and preserve canonical positions", () => {
  for (const [rowIndex, [row, expectedKana]] of expectedRows.entries()) {
    const entries = katakana.filter((c) => c.row === row);
    assert.equal(entries.map((c) => c.kana).join(""), expectedKana);
    entries.forEach((c, columnIndex) => {
      assert.equal(c.rowIndex, rowIndex);
      assert.equal(c.columnIndex, columnIndex);
    });
  }
});

test("every katakana entry has a hiragana counterpart with matching row, position and romaji", () => {
  assert.equal(hiragana.length, 46);
  for (const character of hiragana) {
    const counterpart = katakana.find((c) => c.rowIndex === character.rowIndex && c.columnIndex === character.columnIndex);
    assert.ok(counterpart, "counterpart for " + character.kana);
    assert.equal(counterpart.row, character.row);
    assert.equal(counterpart.romaji, character.romaji);
  }
});

test("project romanization keeps ヲ as wo and ン as n", () => {
  assert.equal(katakana.find((c) => c.kana === "ヲ")?.romaji, "wo");
  assert.equal(katakana.find((c) => c.kana === "ン")?.romaji, "n");
});

test("extended, voiced and small katakana remain outside the basic dataset", () => {
  const symbols = new Set(katakana.map((c) => c.kana));
  for (const kana of ["ガ", "ザ", "ダ", "バ", "パ", "ァ", "ィ", "ゥ", "ェ", "ォ", "ッ", "ー", "キャ", "ファ", "ヴ"]) {
    assert.equal(symbols.has(kana), false, kana + " must remain outside the base set");
  }
});

test("katakana positions are unique and every basic entry is one code point", () => {
  assert.equal(new Set(katakana.map((c) => c.rowIndex + ":" + c.columnIndex)).size, 46);
  assert.ok(katakana.every((c) => [...c.kana].length === 1));
});
