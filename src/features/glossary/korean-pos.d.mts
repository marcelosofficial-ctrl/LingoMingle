import type { GlossPartOfSpeech } from "./types.js";
export interface RawKoreanPos {
  scheme: "kiwi-postag-v0.24.1" | "nikl-basic-pos-api-v1";
  /** Kiwi POSTag string or the NIKL result item's Korean POS label. */
  tag: string;
}
export function mapKoreanPos(source: RawKoreanPos): GlossPartOfSpeech | null;
