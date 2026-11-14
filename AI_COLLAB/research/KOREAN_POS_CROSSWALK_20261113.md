# Korean POS crosswalk | 2026-11-14

## Primary source findings

**Kiwi v0.24.1:** the upstream README documents the Sejong-derived categories and Kiwi-specific additions. include/kiwi/Types.h at current upstream main defines the enum, including NNG/NNP/NNB, VV/VA/VX, MAG, NR/NP, MM/MAJ, IC, XPN/XSN/XSV/XSA/XSM/XR, VCP/VCN, punctuation, foreign/numeric, web and user tags. The README states that since 0.12.0, VV/VA/VX/XSA may carry -R (regular) or -I (irregular) suffixes. The pinned v0.24.1 enum uses the irregular flag internally; adapters accept the documented string suffix form only for tags whose base category is mapped.

**NIKL Korean Basic Dictionary:** its official API docs distinguish POS search-filter codes (0–15) from the returned result field pos, whose type is string. The API example shows the result field as a Korean POS label. The October 19, 2026 full JSON snapshot independently confirms actual lexical-entry POS values. The 51,555 `단어` records contain 15 distinct labels: 14 mapped categories plus `품사 없음`, which intentionally remains unresolved. Numeric values 0–15 are filter controls, not dictionary POS values, and are rejected by the lexical crosswalk.

Sources:
- Kiwi README/tag table: https://github.com/bab2min/Kiwi
- Kiwi enum: https://github.com/bab2min/Kiwi/blob/main/include/kiwi/Types.h
- NIKL English API specification: https://krdict.korean.go.kr/eng/openApi/openApiInfo
- NIKL official entry example for noun: https://krdict.korean.go.kr/eng/dicSearch/SearchView?ParaWordNo=23649
- NIKL official Korean entry for bound noun: https://krdict.korean.go.kr/kor/dicSearch/SearchView?ParaWordNo=64518
- NIKL official advanced search POS labels: https://krdict.korean.go.kr/eng/dicSearchDetail/searchDetailWords
- Snapshot profile and exact observed label counts: AI_COLLAB/research/NIKL_SNAPSHOT_INSPECTION_20261114.md

## Canonical scheme and mapping

Canonical namespace: lingomingle-pos-v1. Source namespaces are kiwi-postag-v0.24.1 and nikl-basic-pos-api-v1. The NIKL namespace version identifies this adapter's expected API label representation, not a versioned dictionary data release.

Canonical tags: noun, pronoun, numeral, particle, verb, adjective, determiner, adverb, interjection, affix, bound-noun, auxiliary-verb, auxiliary-adjective, ending.

- Kiwi NNG and NNP both map to noun because NIKL's taxonomy does not distinguish common/proper nouns. Raw tag remains attached as source provenance.
- NNB maps to bound-noun; NR to numeral; NP to pronoun; VV to verb; VA to adjective; MM to determiner; MAG/MAJ to adverb; IC to interjection.
- All J* particles map to particle; E* endings to ending; XPN/XSN/XSV/XSA/XSM affixes to affix. XR root has no NIKL POS counterpart and stays unresolved.
- Kiwi VX is unresolved because its auxiliary-predicate class cannot distinguish NIKL auxiliary verb from auxiliary adjective. VCP/VCN copula tags have no NIKL POS category. Punctuation, foreign, numeric, web, private and unknown tags stay unresolved.
- Kiwi -R/-I variants are accepted only for the documented VV/VA/VX/XSA bases. VX remains unresolved; VV/VA/XSA are reduced to their base tag for classification, while the exact original tag is preserved. Invalid suffixes on NNG, particles or XSM are rejected.
- NIKL result labels map only when they match the official Korean POS label. Numeric filter codes 0–15 are never accepted as lexical tags.
- The observed `품사 없음` label is not a POS category and maps to null. It may still support exact-surface lookup, but never Korean lemma/POS matching.
- Unknown or ambiguous values return null. Unresolved POS cannot satisfy Korean lemma/POS matching; exact surface matches remain available.

## Implementation and acceptance

src/features/glossary/korean-pos.mjs is a pure deterministic crosswalk. It validates source namespaces, uses own-property checks so JavaScript prototype names cannot become accidental POS categories, preserves raw tags, and returns null for unresolved tags.

tests/korean-pos.test.mjs uses synthetic labels/tags only. It covers all 14 mapped NIKL categories, the snapshot-observed `품사 없음` unresolved label, numeric filter-code rejection, common/proper/bound nouns, regular/irregular variants, particle/ending/affix families, auxiliary/copula ambiguity, XR and non-lexical Kiwi tags, unknown source namespaces, inherited-property names, canonical cross-source matching and unresolved fallback. No dictionary entries or corpus examples are included.

The crosswalk is a first-pass taxonomy adapter. The inspected snapshot introduced no new mappable alias; all observed labels are covered or deliberately unresolved. Do not infer aliases from numeric search-filter codes.
