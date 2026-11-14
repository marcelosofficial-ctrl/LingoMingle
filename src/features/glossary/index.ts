export type {
  GlossEntry,
  GlossLanguage,
  GlossLookupKey,
  GlossMatch,
  GlossMatchKind,
  GlossSense,
  GlossSource,
} from "./types";

export { lookupGlosses } from "./matching.mjs";
export { mapKoreanPos } from "./korean-pos.mjs";
export type { RawKoreanPos } from "./korean-pos.mjs";\nexport { createGlossaryRepository } from "./sqlite-repository.mjs";\nexport type { GlossaryRepository } from "./sqlite-repository.mjs";
