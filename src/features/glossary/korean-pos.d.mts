import type { GlossPartOfSpeech } from "./types.js";

export interface RawKoreanPos {
  scheme: "kiwi-sejong-v1" | "nikl-basic-v1";
  tag: string;
}

export function mapKoreanPos(source: RawKoreanPos): GlossPartOfSpeech | null;
