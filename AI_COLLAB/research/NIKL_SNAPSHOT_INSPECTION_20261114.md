# NIKL full snapshot inspection | 2026-11-14

Status: **T009 inspected; technical GO with licensing/distribution HOLD.** This report is based on the user-attached archive. No source entries, translations, examples or media are reproduced here. The archive is not committed.

## Source identity and integrity

- Uploaded file: `전체 내려받기_한국어기초사전_json_20261019.zip`
- Compressed bytes: 84,498,237
- Archive SHA-256: `c8f9ffbf7e9be1f1ec86fa29e4160a75eee8044fc081c27788dadf3ceb66d34e`
- Members: 11 JSON files; total uncompressed bytes 1,016,275,365 (about 1.016 GB).
- ZIP CRC/integrity check: PASS. All 11 members parsed as UTF-8 JSON. Duplicate JSON object keys: 0 across 6,484,068 objects.
- Embedded `GlobalInformation` label identifies the Korean Basic Dictionary provided by NIKL. Per-file `creationDate` values range from 2026/10/19 12:38:12 to 12:39:43; `languageCoding` is ISO 639-3.
- The official full-download page currently displays upload date 2026-10 and JSON/XML options: https://krdict.korean.go.kr/download/downloadPopup.
- **INFERRED provenance:** filename, embedded label/date and official page are consistent with the official October 19 full JSON export. The archive does not contain a receipt, download URL, checksum published by NIKL or licence/readme file, so the exact acquisition path and retrieval timestamp cannot be independently proven. Reviewed 2026-11-14.

## Actual bulk JSON structure

Root: `LexicalResource` → `GlobalInformation` and `Lexicon` → `LexicalEntry[]`.

- `GlobalInformation.feat`: label, creationDate, languageCoding.
- `LexicalEntry`: `att: "id"`, numeric-string `val`, `feat` metadata, `Lemma`, `Sense`, and optional `WordForm` / `RelatedForm`.
- `LexicalEntry.feat` can be an object or array of `{att,val}` objects. `Lemma` and `Sense` can each be a single object or an array. The importer must normalize both shapes.
- `Lemma.feat` includes `writtenForm` and may include `variant`.
- Entry metadata includes `lexicalUnit`, `partOfSpeech`, `homonym_number`, `vocabularyLevel`, semantic categories and optional annotations.
- Each `Sense` has local `val` sense order, a Korean `definition` feature, `Equivalent[]`, and optional `SenseExample`, `SenseRelation`, `Multimedia`.
- Each `Equivalent.feat[]` has `language`, `lemma`, and `definition`. English equivalents are present directly in the bulk JSON; no API call is needed.
- This is the actual export schema. It is not the API XML schema previously used as a reference.

## Counts and data quality

- 56,555 lexical-entry records across the archive; 53,671 distinct entry ID values. Split filenames encode 5,000 IDs for each of the first ten files and 3,671 for the last.
- Lexical units: 51,555 `단어` (word) entries, 2,227 `관용구` (idioms), 1,120 `구` (phrases), 996 `문법‧표현` (grammar/expression), 657 `속담` (proverbs).
- Non-word records can share an entry ID with a word record: 1,160 IDs span multiple lexical units, accounting for 2,884 repeated entry records. 2,116 non-word-only IDs exist. **Within the 51,555 word entries, all 51,555 entry IDs are present and unique.** Restrict v1 to `lexicalUnit=단어`; do not use the ID alone across all lexical units.
- Every word entry has exactly one non-empty `writtenForm`, at least one sense, a `partOfSpeech` field and a `vocabularyLevel` field. No missing word-entry IDs, lemmas, senses, POS fields or levels. Sense order values are present and unique within entries.
- Word entries contain 71,120 senses. 69,432 have English equivalents; 1,688 do not. 49,869 entries have English translations for every sense; 1,685 entries have no English translation, and one entry is only partially translated (one translated sense, three untranslated senses). For a complete-sense v1 pack, accept only the 49,869 fully translated entries and 69,431 senses.
- Every observed English Equivalent has non-empty `lemma` and `definition`. Map these separately: English `lemma` → `GlossSense.englishEquivalent`; English `definition` → `GlossSense.englishGloss`.
- Learner levels among word entries: 고급 36,294; 중급 8,820; 없음 3,940; 초급 2,501. Preserve raw values; do not invent a level for 없음.
- Distinct word POS labels: 15. Fourteen map through T008's existing NIKL crosswalk. The fifteenth, `품사 없음`, is explicitly unresolved and must remain so. The crosswalk must not treat numeric filter codes as record tags.
- 47,006 distinct written forms occur; repeated headwords are expected and must remain separate by source ID/homonym data, not deduplicated by spelling.
- Selected text fields for the complete-translation candidate set total about 5.70 MiB UTF-8 before JSON/SQLite structure and indexes. This is a text-payload estimate, not a built database size.

## Exclusions and normalization

- Exclude all examples (595,620 example objects across the archive), audio/pronunciation and sound URLs, conjugation forms, images, video and all multimedia. The archive contains 50,933 pronunciation records, 35,586 conjugation records, 74,025 sound URL fields, and 5,276 photo/video multimedia items. Never persist excluded values in fixtures, logs or error reports.
- `Lemma.variant` appears 2,103 times. Do not add variants to `surfaceForms` in v1; their semantics and matching policy need a separate decision.
- Selected English text contains 1,646 HTML entity occurrences (`&quot;`, `&apos;`). It also has outer whitespace in some values and one non-NFC English definition. The normalizer must decode recognized HTML entities, trim outer whitespace, normalize NFC, and preserve internal punctuation/spacing. Count and report each transformation; do not silently rewrite raw source files.
- Use only `writtenForm` as v1 lemma and sole initial surface form. Keep the original archive outside Git; record its hash and source metadata in the data-pack manifest.

## Proposed mapping and import decision

For word entries only:
- `id`: stable `nikl-kbd:<LexicalEntry.val>`; this value is unique across the word-entry subset.
- `sourceId`: `nikl-korean-basic-dictionary`; data-pack version separately identifies snapshot `20261019`.
- `lemma` and `surfaceForms[0]`: exact `Lemma.writtenForm`.
- `partOfSpeech`: `feat[partOfSpeech]` through `nikl-basic-pos-api-v1`; `품사 없음` remains null/unresolved.
- `learnerLevel`: exact `vocabularyLevel` source value.
- `senses[].id`: `nikl-kbd:<entry-id>:<Sense.val>`; `englishEquivalent` from English Equivalent `lemma`; `englishGloss` from English Equivalent `definition`.
- Exclude an entire entry if any sense lacks an English equivalent. This avoids silently publishing incomplete sense inventories and preserves the current required `englishGloss` contract.

**GO:** technically feasible to create a compact, offline Korean-English *word* glossary from the 49,869 complete entries. The source is far smaller after strict field selection than the 84.5 MB archive; final database size and device performance still require a later build/measurement.

**HOLD:** do not import, bundle or distribute yet. The archive contains no file-specific licence notice. NIKL's current site policy says unmarked site materials are CC BY-SA 2.0 KR, permits commercial reuse with attribution and requires share-alike for adaptations; multimedia permissions are individually set and excluded. CC BY-SA 2.0 KR also prohibits additional legal/technological restrictions. A separate data pack and attribution manifest are necessary controls but do not prove compatibility with App Store/Play Store packaging or platform DRM. Obtain qualified legal review of the actual distribution model before release.

Sources:
- NIKL full-download page: https://krdict.korean.go.kr/download/downloadPopup
- NIKL copyright policy: https://krdict.korean.go.kr/kor/kboardPolicy/copyRightTermsInfo
- NIKL Open API specification (reference only for API field semantics): https://krdict.korean.go.kr/eng/openApi/openApiInfo
- CC BY-SA 2.0 KR deed: https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en

No real dictionary data, definitions, translations, examples, media or generated database were committed. No production import was performed.
