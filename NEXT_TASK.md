# NEXT_TASK
ID: T013
Goal: Evaluate and build a synthetic-only SQLite data-pack builder from T012's deterministic JSONL output, without touching the app database or importing real NIKL data.
Context: T009 snapshot inspection, T010 record normalizer, T011 streaming/licence research and T012 synthetic ZIP-to-JSON proof are complete. T012 lives only in tools/nikl-importer and is not approved for the actual archive because stream-json is not designed for hostile JSON. Store distribution remains HOLD. Inspect the current glossary schema and Expo SQLite access before choosing a build tool.
Acceptance:
- Read the current glossary types, SQLite schema/migrations, query path and app adapter; do not assume the T012 JSONL shape is already the final DB schema.
- Compare Node 22.13 built-in node:sqlite (experimental) with exact current better-sqlite3 and sql.js options: version, SPDX, Node support, transitive/native/WASM dependencies, CI/build constraints and suitability for build-time-only use.
- Select a build-only approach and exact-pin any new tool dependency. Do not add a DB generator to the Expo app runtime.
- Consume only synthetic fixture JSONL. Build a temporary SQLite pack in one transaction with stable row order, explicit schema version, uniqueness/foreign-key constraints and indexes created after bulk insertion where appropriate.
- Verify PRAGMA integrity_check, foreign_key_check, row counts, uniqueness, representative lookup behavior and a deterministic manifest/hash.
- Publish by same-filesystem atomic rename only after all checks pass. Test duplicate IDs, malformed JSONL, constraint rollback, interruption/cancellation, cleanup, existing-output refusal and repeatability.
- No actual NIKL archive, source text, real translations, production DB, app/user DB mutation, app bundle, store distribution, external upload, account/API key, paid service or spending.
Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, tools/nikl-importer/**, tests/**, AI_COLLAB/research/**.
Line budget <=350 changed lines. Commit the completed unit and overwrite CHECKPOINT.md.
