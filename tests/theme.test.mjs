import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("theme palette defines readable canvas, ink, and surface tokens", async () => {
  const source = await readFile(new URL("../src/theme/tokens.ts", import.meta.url), "utf8");
  for (const token of ["canvas", "ink", "surface"]) {
    assert.match(source, new RegExp(token + ": \"#[0-9A-Fa-f]{6}\""));
  }
});