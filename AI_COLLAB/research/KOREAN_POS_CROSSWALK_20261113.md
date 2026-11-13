# Korean POS crosswalk | 2026-11-13

## Source vocabularies

Kiwi uses a Sejong-derived tag set, with project-specific tags and regular/irregular suffix variants. Its published tag list includes NNG/NNP/NNB, NR/NP, VV/VA/VX, MM, MAG/MAJ, IC, J* particles, E* endings, X* affixes, VCP/VCN, punctuation and foreign/numeric tags. Since Kiwi v0.12, VV/VA/VX/XSA may carry -R or -I suffixes for regular/irregular conjugation.

NIKL Korean Basic Dictionary's API documents POS filter codes:
0 all; 1 noun; 2 pronoun; 3 numeral; 4 particle; 5 verb; 6 adjective; 7 determiner; 8 adverb; 9 interjection; 10 affix; 11 bound noun; 12 auxiliary verb; 13 auxiliary adjective; 14 ending; 15 no POS. Result records also expose a POS string. This means filter codes and returned POS strings are different representations and both need a deterministic adapter.

## Canonical scheme

Use versioned scheme ID lingomingle-pos-v1 with tags:
- noun, pronoun, numeral, particle, verb, adjective, determiner, adverb, interjection, affix, bound-noun, auxiliary-verb, auxiliary-adjective, ending.

Mapping policy:
- Kiwi NNG and NNP both map to noun because NIKL does not distinguish common/proper nouns in its POS filter taxonomy. Preserve the original Kiwi tag in GlossPartOfSpeech.source.
- Kiwi NNB maps to bound-noun; NR to numeral; NP to pronoun; VV to verb; VA to adjective; MM to determiner; MAG/MAJ to adverb; IC to interjection; J* particle tags to particle; E* ending tags to ending; X* affix tags to affix.
- Kiwi -R / -I variants map using the base tag but preserve the full original source tag.
- Kiwi VX is unresolved because the single auxiliary-predicate tag cannot distinguish NIKL auxiliary verb vs auxiliary adjective. VCP/VCN copula tags have no matching NIKL POS category. Punctuation, foreign scripts, numbers, unknown and project-specific tags stay unresolved.
- NIKL codes 1–14 and corresponding Korean labels map to the canonical tags. Codes 0 and 15 are not lexical POS categories and stay unresolved.
- Unresolved POS must not be guessed. The glossary's Korean lemma/POS matcher requires a canonical POS on both the dictionary entry and analyzer token. Exact surface matches remain available without morphology.

## Implementation

src/features/glossary/korean-pos.mjs implements a pure deterministic mapper. It accepts only kiwi-sejong-v1 and nikl-basic-v1, returns null for unknown/ambiguous tags, and returns canonical scheme/tag plus original source scheme/tag when mapped. The KoreanTokenAnalysis.partOfSpeech field is optional so an unresolved analyzer tag cannot be forced into a false match.

tests/korean-pos.test.mjs uses synthetic POS tags only. It covers common/proper/bound nouns, irregular suffix variants, verbs/adjectives, particles/endings/affixes, NIKL codes and Korean labels, ambiguous auxiliary/copula tags, unknown tags, source-tag preservation, cross-source canonical matching and unresolved fallback. No dictionary entries or corpus examples are included.

## Primary references

- Kiwi POS tag list and suffix behavior: https://github.com/bab2min/Kiwi
- Kiwi POS enum: https://github.com/bab2min/Kiwi/blob/main/include/kiwi/Types.h
- NIKL POS code and response fields: https://krdict.korean.go.kr/eng/openApi/openApiInfo
