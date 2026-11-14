export type GlossLanguage = "ja" | "ko";

export interface GlossSource {
  id: string;
  name: string;
  version: string;
  sourceUrl: string;
  licenseId: string;
  licenseUrl: string;
  attributionText: string;
  retrievedAt: string;
  shareAlikeRequired: boolean;
  modificationNotes: string;
}

export interface GlossSense {
  id: string;
  /** English definition/meaning for this sense. */
  englishGloss: string;
  /** English equivalent word or phrase for this sense, when the source provides one. */
  englishEquivalent?: string;
  labels?: readonly string[];
}

export interface GlossPartOfSpeech {
  /** Stable namespace for the tag set or an explicit crosswalk, not a display label. */
  scheme: string;
  tag: string;
  /** Original analyzer/dictionary tag, retained for audits and future remapping. */
  source?: { scheme: string; tag: string };
}

export interface GlossEntry {
  id: string;
  sourceId: string;
  language: GlossLanguage;
  surfaceForms: readonly string[];
  lemma: string;
  reading?: string;
  partOfSpeech?: GlossPartOfSpeech;
  senses: readonly GlossSense[];
  learnerLevel?: string;
  frequencyRank?: number;
  domainLabels?: readonly string[];
  /** Lower values sort earlier within the same lookup result. */
  priority: number;
}

export interface JapaneseTokenAnalysis {
  /** Must identify the exact token supplied as GlossLookupKey.surfaceForm. */
  surfaceForm: string;
  /** Kana reading supplied by a Japanese morphology/transliteration adapter. */
  reading: string;
  lemma?: string;
  partOfSpeech?: GlossPartOfSpeech;
}

export interface KoreanTokenAnalysis {
  /** Must identify the exact eojeol/token supplied as GlossLookupKey.surfaceForm. */
  surfaceForm: string;
  /** Dictionary form supplied by a Korean morphology adapter. */
  lemma: string;
  /** POS must be mapped into the same explicit scheme as the glossary entry. */
  partOfSpeech?: GlossPartOfSpeech;
}

export interface JapaneseMorphologyAdapter {
  analyzeToken(surfaceForm: string): JapaneseTokenAnalysis | null;
}

export interface KoreanMorphologyAdapter {
  analyzeToken(surfaceForm: string): KoreanTokenAnalysis | null;
}

export type GlossLookupKey =
  | {
      language: "ja";
      surfaceForm: string;
      analysis?: JapaneseTokenAnalysis;
    }
  | {
      language: "ko";
      surfaceForm: string;
      analysis?: KoreanTokenAnalysis;
    };

export type GlossMatchKind = "surface" | "reading" | "lemma-reading" | "lemma-pos";

export interface GlossMatch {
  entry: GlossEntry;
  matchedBy: GlossMatchKind;
  matchedForm: string;
}
