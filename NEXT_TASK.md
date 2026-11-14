# NEXT_TASK
ID: T014
Goal: Design and test the app-side read-only SQLite glossary repository against synthetic schema-v1 packs, without importing real NIKL data or bundling a production pack.
Context: T013 proved a build-only SQLite schema from the current GlossSource/GlossEntry/GlossSense contract. The app pins expo-sqlite 58.0.16 but has no database schema, migrations, repository or query adapter. Keep the pack builder isolated under tools/nikl-importer.
Acceptance:
- Read the versioned Expo SDK 58 SQLite docs and inspect current package/API compatibility before implementing.
- Define app migration/schema ownership, version checks and a read-only repository interface; do not silently create or mutate a user database during lookup.
- Map source, entry, surface, sense, POS, labels and numeric metadata back into GlossEntry without loss.
- Match matching.mjs semantics: NFKC/trim/lowercase surface keys, stable priority/ID order, Japanese reading/lemma analysis, Korean lemma plus exact POS namespace, and no false POS guesses.
- Use only synthetic SQLite packs created by T013. Test mapping, ordering, misses, duplicate candidates, close/error behavior and schema-version rejection.
- Keep node:sqlite out of app runtime and keep the pack builder/dependencies out of app package.json.
- No real NIKL data, production DB, app/user DB mutation, external upload, paid service, account/API key or store distribution.
Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, app/**, src/**, tests/**, AI_COLLAB/research/**.
Line budget <=350 changed lines. Commit completed unit and overwrite CHECKPOINT.md.
