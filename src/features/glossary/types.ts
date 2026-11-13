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
  englishGloss: string;
  labels?: readonly string[];
}

export interface GlossEntry {
  id: string;
  sourceId: string;
  language: GlossLanguage;
  surfaceForms: readonly string[];
  lemma: string;
  reading?: string;
  partOfSpeech?: string;
  senses: readonly GlossSense[];
  learnerLevel?: string;
  frequencyRank?: number;
  domainLabels?: readonly string[];
  /** Lower values sort earlier within the same lookup result. */
  priority: number;
}

export interface GlossLookupKey {
  language: GlossLanguage;
  /** Original text currently being explained, not an assumed translation. */
  surfaceForm: string;
  /** Canonical lemma and reading are supplied by a language-specific analyzer. */
  lemma?: string;
  reading?: string;
  partOfSpeech?: string;
}

export type GlossMatchKind = "surface" | "reading" | "lemma-reading" | "lemma-pos";

export interface GlossMatch {
  entry: GlossEntry;
  matchedBy: GlossMatchKind;
  matchedForm: string;
}
