import type { GlossEntry, GlossLookupKey, GlossMatch } from "./types.js";

export function lookupGlosses(
  entries: readonly GlossEntry[],
  key: GlossLookupKey,
): GlossMatch[];
