import test from "node:test";
import assert from "node:assert/strict";

test("theme palette exposes required readable surface tokens", async () => {
  const { colors } = await import("../src/theme/tokens.ts");
  assert.ok(colors.canvas.startsWith("#"));
  assert.ok(colors.ink.startsWith("#"));
  assert.ok(colors.surface.startsWith("#"));
});