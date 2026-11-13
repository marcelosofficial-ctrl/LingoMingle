# NIKL import specification preview | 2026-11-13

Status: PUBLIC-SOURCE PREVIEW ONLY. No official export was attached. This is not an export-schema declaration and does not authorize production import.

## Decision

- **CONDITIONAL GO** for acquiring and inspecting an official NIKL Korean Basic Dictionary snapshot.
- **NO-GO YET** for importing, bundling or distributing a NIKL-derived database. The actual export, file-specific notices, field coverage and store-packaging implications remain unverified.
- Preferred source is the official full-download JSON or XML snapshot. The official panel currently displays upload date 2026-10 and Excel/XML/JSON options. The page text does not expose button URLs, byte size or access conditions.
- The custom export is a fallback, not equivalent evidence of the full snapshot. It lets the requester choose headword/sense granularity, XML/JSON, English translation and fields, then emails a download route. Its required fields include usage examples. If used, examples must be discarded before any persistent v1 dataset is written; never copy them into fixtures, logs or this repository.

## Evidence boundaries

The official Open API documentation is useful as a **reference schema only**. It requires an authentication key and documents XML response fields including:
- entry: `target_code`, `word`, `sup_no`, `word_grade`, `pos`;
- sense: `sense_order`, `definition`;
- translation: `trans_lang`, `trans_word`, `trans_dfn`.

The API sample shows Korean POS labels as strings and English translation fields. Its content API describes `target_code` as a unique identifier. This does not prove the full-download JSON/XML uses the same names, nesting, completeness, IDs or encoding. Do not implement against the API sample as if it were the bulk export.

## Provisional source-to-GlossEntry mapping

All paths below are **candidate mappings to validate against the actual snapshot**:

| NIKL concept / API reference field | GlossEntry target | Rule |
|---|---|---|
| `target_code` + `sup_no` | `id` | Stable source key candidate: `nikl:<target_code>:<sup_no>`; verify uniqueness and stability in export |
| `word` | `lemma`, `surfaceForms[0]` | Preserve exact Korean spelling; normalize only in a separate lookup key |
| `pos` | `partOfSpeech` | Feed actual Korean label to `nikl-basic-pos-api-v1`; unknown labels stay unresolved |
| `sense_order` | `senses[].id` | Candidate sense key `nikl:<target_code>:<sup_no>:<sense_order>`; verify no duplicates/missing order |
| English `trans_word` | future `englishHeadword` field | Preserve separately; current GlossEntry type has no dedicated field, so do not overload Korean surface forms or sense gloss |
| English `trans_dfn` | `senses[].englishGloss` | Only when language marker explicitly identifies English; missing translation remains missing, never machine-filled |
| `word_grade` | `learnerLevel` | Preserve source value; map display levels only after observing full value set |
| conjugation data | not in v1 | Retain only if later analyzer acceptance proves it necessary and rights/scope are reviewed |
| pronunciation, media, examples, images/video/audio | excluded | Drop before producing the v1 database; never include in fixtures or app assets |

A future additive model change may add `englishHeadword?: string` to GlossEntry. Do not make that change until the export confirms this field is consistently available and product UI needs it.

## Import and normalization design

1. Keep the original official export outside Git. Record exact filename, byte count, SHA-256, retrieval timestamp, official download page, displayed upload date, format, and any embedded notice/readme.
2. Identify actual format (plain JSON/XML or archive), encoding, root/container, schema version if present, record counts, duplicate IDs, missing fields and malformed records. Never infer schema from file extension.
3. Parse as a streaming/iterative import where feasible. Enforce explicit byte, depth, record-count and string-length limits. Reject malformed XML/JSON and invalid Unicode; do not silently repair source text.
4. Build a report before transformation: total entries/senses, distinct POS labels, translation language coverage, missing/empty translations, duplicate candidate IDs, repeated headwords, homonym counts, learner-level values and optional-field frequencies.
5. Verify candidate IDs against repeated records. Use source IDs, not row order or array index. If stable sense IDs are absent, use a deterministic composite key only after collision testing.
6. Normalize Unicode to NFC for stored display text. Preserve raw source value for audit if normalization changes code points. Keep a separate normalized lookup key; never replace display spelling.
7. Map only observed POS labels using the versioned crosswalk. Record unmapped labels and counts; unresolved POS cannot satisfy lemma/POS matching. Never infer aliases from numeric search-filter codes.
8. Select English translations only by explicit language tag. Preserve `trans_word` and `trans_dfn` separately. Do not concatenate all languages or collapse multiple senses.
9. Drop examples, multimedia references/payloads, pronunciation audio, images and video. Exclude conjugation and pronunciation from v1 unless separately approved. Ensure temporary parse objects, logs and error reports do not leak excluded text.
10. Emit a separate NIKL-derived data pack plus manifest. Do not merge its contents into proprietary source code or a mixed-license table without a clear source boundary.

## Synthetic acceptance gates

- Stable key and sense key collision checks, including duplicate and missing source IDs.
- Exact headword preservation under NFC and display-vs-lookup separation.
- Multiple senses and homonyms remain distinct.
- English language filtering; missing English remains absent.
- Unknown POS labels remain unresolved; numeric filter values rejected.
- Learner-level values preserved without invented mappings.
- Excluded fields absent from output and diagnostics.
- Deterministic output for the same source file and importer version.
- Import summary reconciles input, accepted, rejected, duplicate and excluded record counts.
- Tests use synthetic records only, never NIKL entries, definitions, translations or examples.

## Attribution and versioning draft

Provisional attribution string, subject to checking any notice inside the downloaded snapshot:

> Source: National Institute of Korean Language (NIKL), Korean Basic Dictionary (한국어기초사전), https://krdict.korean.go.kr. Licensed under Creative Commons Attribution-ShareAlike 2.0 Korea (CC BY-SA 2.0 KR), https://creativecommons.org/licenses/by-sa/2.0/kr/. LingoMingle modifications: selected-field extraction, Unicode normalization, POS crosswalk, filtering and database formatting. No endorsement by NIKL is implied.

Manifest must include source title/owner, source URL, exact snapshot upload date, retrieval timestamp, filename, SHA-256, source format, importer version, licence identifier and URL, attribution string, modification description, excluded fields, entry/sense counts and data-pack version (e.g. `nikl-kbd-2026-10+<content-hash-prefix>`). Do not claim a monthly or automatic update cadence. Re-check the official download panel before each data release and record the exact snapshot selected.

## Rights and distribution gate

The NIKL site policy says site materials are generally CC BY-SA 2.0 KR unless separately marked; commercial use is permitted with attribution and share-alike for adaptations. Multimedia permissions are individually set. The Creative Commons deed additionally requires appropriate credit, a licence link, change indication, and no additional legal/technological restrictions on reuse.

Keep the derived database as an independently identifiable share-alike data pack, with its own licence/attribution/changes manifest and a user-accessible copy of the data. **This separation is a packaging control, not a legal conclusion.** Before App Store/Play Store release, obtain a qualified review of how the data pack is bundled, platform terms, technical restrictions and the CC BY-SA 2.0 KR no-additional-restrictions condition. A separate folder alone does not resolve compatibility.

## Sources

- NIKL full-download panel: https://krdict.korean.go.kr/download/downloadPopup (upload date 2026-10; full Excel/XML/JSON)
- NIKL custom export form: https://krdict.korean.go.kr/kor/dicSearch/searchDetailActCategory (fields, English option, examples required, email link delivery)
- NIKL copyright policy: https://krdict.korean.go.kr/eng/kboardPolicy/copyRightTermsInfo
- NIKL Open API schema: https://krdict.korean.go.kr/eng/openApi/openApiInfo (authentication key, sample response fields; not the bulk-export schema)
- CC BY-SA 2.0 KR deed: https://creativecommons.org/licenses/by-sa/2.0/kr/
- Creative Commons FAQ on effective technological measures: https://creativecommons.org/faq/

## Blocker

User must attach the official full JSON or XML file obtained from the NIKL full-download panel. Until then, schema, actual record counts, export IDs, English coverage, file size, file-specific notices and import readiness remain UNKNOWN.
