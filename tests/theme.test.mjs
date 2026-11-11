import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("theme palette defines readable canvas, ink, and surface tokens", async () => {
  const source = await readFile(new URL("../src/theme/tokens.ts", import.meta.url), "utf8");
  for (const token of ["canvas", "ink", "surface"]) {
    assert.match(source, new RegExp(token + ": \"#[0-9A-Fa-f]{6}\""));
  }
});

test("navigation exposes the four agreed top-level destinations", async () => {
  const source = await readFile(new URL("../app/(tabs)/_layout.tsx", import.meta.url), "utf8");
  assert.match(source, /NativeTabs/);
  for (const tab of ["Songs", "Alphabets", "Review", "You"]) {
    assert.ok(source.includes(`<NativeTabs.Trigger.Label>${tab}</NativeTabs.Trigger.Label>`));
  }
});

test("Liquid Glass helper gates native API behind iOS and runtime checks", async () => {
  const source = await readFile(new URL("../src/theme/glass.ts", import.meta.url), "utf8");
  assert.match(source, /Platform\.OS === "ios"/);
  assert.match(source, /isLiquidGlassAvailable\(\)/);
  assert.match(source, /isGlassEffectAPIAvailable\(\)/);
});