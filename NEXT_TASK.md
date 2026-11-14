# NEXT_TASK
ID: T010
Goal: Build a dependency-free, record-level NIKL JSON normalizer against the inspected 2026-10-19 bulk schema, using synthetic fixtures only.
Context: T009 is complete. Technical decision is GO for a word-only glossary with complete English sense coverage; production data import/distribution remains HOLD pending qualified CC BY-SA 2.0 KR/App Store/Play Store review. See AI_COLLAB/research/NIKL_SNAPSHOT_INSPECTION_20261114.md.
Scope:
- Add a pure function that accepts one parsed `LexicalEntry` record plus explicit source metadata and returns a typed GlossEntry or a structured skip/reject result.
- Normalize actual source shape variations: entry `feat` object/array; `Lemma` object/array; `Sense` object/array; nested `Equivalent` list and `feat` arrays.
- Include only `lexicalUnit=단어`. Require one non-empty `Lemma.writtenForm`, unique numeric-string entry ID, one or more senses, and exactly one English Equivalent per sense. Skip the entire entry if any sense lacks English, matching the 49,869-entry complete-coverage candidate.
- Stable keys: `nikl-kbd:<LexicalEntry.val>`; sense key `nikl-kbd:<entry-id>:<Sense.val>`. Preserve `vocabularyLevel` as the raw learnerLevel value.
- Map English Equivalent `lemma` to `GlossSense.englishEquivalent` and `definition` to `englishGloss`. Map POS only through `nikl-basic-pos-api-v1`; `품사 없음` and unknown labels remain unresolved.
- Normalize recognized HTML named/numeric entities, trim outer whitespace, and NFC-normalize display strings. Do not alter internal punctuation/spacing. Reject or report malformed entities and invalid strings deterministically.
- Ignore/drop examples, media, sound/audio, pronunciation, conjugation, variants, related forms and non-word lexical units before output. They must not leak into diagnostics.
- Keep source provenance and data-pack manifest concerns separate from the GlossEntry payload.
Tests (synthetic only): object/array singleton forms; multi-sense ordering; English equivalent vs definition; HTML entity and Unicode normalization; no/partial English exclusion; duplicate/missing IDs; unknown/no-POS behavior; non-word exclusion; ignored-field absence; deterministic output. No NIKL entry, translation, definition, example or media may be copied into fixtures.
Do not add dependencies, stream/parse the 1 GB ZIP, create a production database, import the real dataset, or bundle/distribute NIKL data. A future streaming ZIP reader requires separate dependency/licence review.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, src/features/glossary/**, tests/**, STATE.md.
Line budget <=350 changed lines. Run CI and report exact output. After T010, next gate is legal review and a separately scoped streaming/import proof; no production import before that gate.
