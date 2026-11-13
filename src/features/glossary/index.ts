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
