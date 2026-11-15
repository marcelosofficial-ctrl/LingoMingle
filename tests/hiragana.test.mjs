import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/features/kana/hiragana.ts", import.meta.url), "utf8");
const characters = [...source.matchAll(/\{ id: "([^"]+)", kana: "([^"]+)", romaji: "([^"]+)", row: "([^"]+)", rowIndex: (\d+), columnIndex: (\d+) \}/g)]
  .map((match) => ({
    id: match[1],
    kana: match[2],
    romaji: match[3],
    row: match[4],
    rowIndex: Number(match[5]),
    columnIndex: Number(match[6])
  }));

const expectedRows = [
  ["vowels", 5, "あいうえお"],
  ["k", 5, "かきくけこ"],
  ["s", 5, "さしすせそ"],
  ["t", 5, "たちつてと"],
  ["n", 5, "なにぬねの"],
  ["h", 5, "はひふへほ"],
  ["m", 5, "まみむめも"],
  ["y", 3, "やゆよ"],
  ["r", 5, "らりるれろ"],
  ["w", 2, "わを"],
  ["nasal", 1, "ん"]
];

test("basic hiragana dataset contains exactly 46 unique stable entries", () => {
  assert.equal(characters.length, 46);
  assert.equal(new Set(characters.map((character) => character.id)).size, 46);
  assert.equal(new Set(characters.map((character) => character.kana)).size, 46);
  assert.ok(characters.every((character) => character.id.startsWith("hiragana-")));
});

test("basic hiragana rows follow conventional gojuon order and metadata", () => {
  const rowIds = [...source.matchAll(/\{ id: "([^"]+)", label: "[^"]+" \}/g)].map((match) => match[1]);
  assert.deepEqual(rowIds, expectedRows.map(([id]) => id));

  for (const [rowIndex, [row, expectedCount, expectedKana]] of expectedRows.entries()) {
    const entries = characters.filter((character) => character.row === row);
    assert.equal(entries.length, expectedCount, `row ${row} size`);
    assert.equal(entries.map((character) => character.kana).join(""), expectedKana);
    entries.forEach((character, columnIndex) => {
      assert.equal(character.rowIndex, rowIndex);
      assert.equal(character.columnIndex, columnIndex);
    });
  }
});

test("Hepburn spellings preserve the non-obvious basic kana readings", () => {
  const spellings = new Map(characters.map(({ kana, romaji }) => [kana, romaji]));
  for (const [kana, romaji] of [["し", "shi"], ["ち", "chi"], ["つ", "tsu"], ["ふ", "fu"], ["を", "wo"], ["ん", "n"]]) {
    assert.equal(spellings.get(kana), romaji);
  }
});

test("the initial learning selection あ is present and canonical", () => {
  assert.deepEqual(characters[0], {
    id: "hiragana-a",
    kana: "あ",
    romaji: "a",
    row: "vowels",
    rowIndex: 0,
    columnIndex: 0
  });
});
