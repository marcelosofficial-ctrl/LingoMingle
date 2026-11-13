const CANONICAL_SCHEME = "lingomingle-pos-v1";

const KIWI_TAGS = {
  NNG: "noun",
  NNP: "noun",
  NNB: "bound-noun",
  NR: "numeral",
  NP: "pronoun",
  VV: "verb",
  VA: "adjective",
  MM: "determiner",
  MAG: "adverb",
  MAJ: "adverb",
  IC: "interjection",
  JKS: "particle",
  JKC: "particle",
  JKG: "particle",
  JKO: "particle",
  JKB: "particle",
  JKV: "particle",
  JKQ: "particle",
  JX: "particle",
  JC: "particle",
  EP: "ending",
  EF: "ending",
  EC: "ending",
  ETN: "ending",
  ETM: "ending",
  XPN: "affix",
  XSN: "affix",
  XSV: "affix",
  XSA: "affix",
  XSM: "affix",
};

const NIKL_TAGS = {
  "1": "noun",
  "명사": "noun",
  "2": "pronoun",
  "대명사": "pronoun",
  "3": "numeral",
  "수사": "numeral",
  "4": "particle",
  "조사": "particle",
  "5": "verb",
  "동사": "verb",
  "6": "adjective",
  "형용사": "adjective",
  "7": "determiner",
  "관형사": "determiner",
  "8": "adverb",
  "부사": "adverb",
  "9": "interjection",
  "감탄사": "interjection",
  "10": "affix",
  "접사": "affix",
  "11": "bound-noun",
  "의존 명사": "bound-noun",
  "12": "auxiliary-verb",
  "보조 동사": "auxiliary-verb",
  "13": "auxiliary-adjective",
  "보조 형용사": "auxiliary-adjective",
  "14": "ending",
  "어미": "ending",
};

/**
 * Convert only unambiguous Kiwi/NIKL POS tags into the shared LingoMingle
 * taxonomy. Ambiguous and unsupported tags return null, never a guessed class.
 */
export function mapKoreanPos(source) {
  if (!source || typeof source.tag !== "string" || typeof source.scheme !== "string") {
    return null;
  }

  const rawTag = source.tag.normalize("NFKC").trim();
  if (!rawTag) return null;

  let canonicalTag;
  if (source.scheme === "kiwi-sejong-v1") {
    const baseTag = rawTag.replace(/-(?:R|I)$/u, "");
    canonicalTag = KIWI_TAGS[baseTag];
  } else if (source.scheme === "nikl-basic-v1") {
    canonicalTag = NIKL_TAGS[rawTag];
  } else {
    return null;
  }

  if (!canonicalTag) return null;
  return {
    scheme: CANONICAL_SCHEME,
    tag: canonicalTag,
    source: { scheme: source.scheme, tag: rawTag },
  };
}
