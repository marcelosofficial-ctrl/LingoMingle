const CANONICAL_SCHEME = "lingomingle-pos-v1";
const KIWI_TAGS = Object.freeze({
  NNG:"noun", NNP:"noun", NNB:"bound-noun", NR:"numeral", NP:"pronoun",
  VV:"verb", VA:"adjective", MM:"determiner", MAG:"adverb", MAJ:"adverb",
  IC:"interjection", JKS:"particle", JKC:"particle", JKG:"particle", JKO:"particle",
  JKB:"particle", JKV:"particle", JKQ:"particle", JX:"particle", JC:"particle",
  EP:"ending", EF:"ending", EC:"ending", ETN:"ending", ETM:"ending",
  XPN:"affix", XSN:"affix", XSV:"affix", XSA:"affix", XSM:"affix",
});
const NIKL_TAGS = Object.freeze({
  "명사":"noun", "대명사":"pronoun", "수사":"numeral", "조사":"particle",
  "동사":"verb", "형용사":"adjective", "관형사":"determiner", "부사":"adverb",
  "감탄사":"interjection", "접사":"affix", "의존 명사":"bound-noun",
  "보조 동사":"auxiliary-verb", "보조 형용사":"auxiliary-adjective", "어미":"ending",
});

/**
 * Map actual analyzer/dictionary POS labels into the shared LingoMingle
 * taxonomy. NIKL numeric values are search-filter codes, not result POS tags.
 * Unknown, ambiguous, or inherited object-property names return null.
 */
export function mapKoreanPos(source) {
  if (!source || typeof source.tag !== "string" || typeof source.scheme !== "string") return null;
  const rawTag = source.tag.normalize("NFKC").trim();
  if (!rawTag) return null;

  let canonicalTag;
  if (source.scheme === "kiwi-postag-v0.24.1") {
    const suffix = rawTag.match(/^([A-Z]+)-(?:R|I)$/u);
    if (suffix && !["VV", "VA", "VX", "XSA"].includes(suffix[1])) return null;
    const baseTag = suffix ? suffix[1] : rawTag;
    if (Object.hasOwn(KIWI_TAGS, baseTag)) canonicalTag = KIWI_TAGS[baseTag];
  } else if (source.scheme === "nikl-basic-pos-api-v1") {
    if (Object.hasOwn(NIKL_TAGS, rawTag)) canonicalTag = NIKL_TAGS[rawTag];
  } else {
    return null;
  }
  if (!canonicalTag) return null;
  return { scheme: CANONICAL_SCHEME, tag: canonicalTag, source: { scheme: source.scheme, tag: rawTag } };
}
