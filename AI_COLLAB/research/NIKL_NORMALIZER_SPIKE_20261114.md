# NIKL record normalizer spike | 2026-11-14

Status: synthetic-only adapter implemented; full archive/ZIP streaming is deliberately out of scope.

## Files
- `src/features/glossary/nikl-json.mjs`: record normalizer and per-stream duplicate-ID guard.
- `src/features/glossary/nikl-json.d.mts`: discriminated accepted/skipped/rejected result contract.
- `tests/nikl-json.test.mjs`: synthetic fixtures only.
- `src/features/glossary/types.ts`: optional `GlossSense.englishEquivalent`, separate from `englishGloss`.

## Behavior
- Accept one parsed `LexicalEntry` object. Supports `feat` object/array, `Lemma` object/array, `Sense` object/array, `Equivalent` object/array and nested feature arrays.
- Include only `lexicalUnit=단어`. Require a numeric-string entry ID, exactly one non-empty writtenForm, required POS/level metadata, at least one sense, numeric sense IDs and unique sense order.
- Require exactly one English Equivalent per sense. If any sense lacks English, skip the entire entry to avoid partial sense inventories. Duplicate English equivalents and malformed required fields are rejected.
- Stable output IDs: `nikl-kbd:<entry-id>` and `nikl-kbd:<entry-id>:<sense-order>`. Source ID is `nikl-korean-basic-dictionary`.
- English Equivalent `lemma` becomes `englishEquivalent`; `definition` becomes `englishGloss`. Learner level is preserved verbatim. POS uses the versioned NIKL crosswalk; `품사 없음` and unknown labels remain unresolved, while exact surface lookup remains available.
- Output includes only the dictionary lemma as its first/sole surface form. It intentionally omits variants, readings, pronunciation, conjugations, examples, media, related forms and other source metadata.
- Recognized HTML entities (`amp`, `apos`, `gt`, `lt`, `nbsp`, `quot`, decimal and hexadecimal numeric references) are decoded. Tabs become ordinary spaces, outer whitespace is trimmed and strings are NFC-normalized. Internal ordinary spacing and punctuation are preserved. Unknown entities, invalid code points, disallowed control characters and unpaired surrogates fail closed.
- `createNiklEntryNormalizer()` tracks word-entry IDs across a caller-managed stream. Any duplicate is a hard rejection; the future pack builder must abort the whole build if one occurs. Non-word records do not reserve IDs because the full snapshot legitimately reuses IDs across lexical units.

## Acceptance and limitations
Synthetic tests cover object/array shapes, multi-sense ordering, separate English equivalent/definition, HTML entity decoding, tabs/trim/NFC, incomplete English exclusion, non-word exclusion, unresolved POS, duplicate IDs/senses, unsafe entities, excluded-field absence and deterministic output.

This is a record-level transformation only. It does not parse the 84.5 MB ZIP or 1.016 GB expanded JSON, stream JSON tokens, write SQLite, calculate a release manifest or bundle data. No source dictionary content is included in code or tests. No dependency was added. Do not use this prototype to import or distribute real NIKL data until the separate streaming and licensing gates are completed.
