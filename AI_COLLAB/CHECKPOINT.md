# CHECKPOINT
Unit: T014 read-only Expo SQLite glossary repository COMPLETE (synthetic-only).
Branch head before this unit: b8864e109d1857b8ef8df1963e72021d68f597c4. T013 latest CI #73 succeeded on that head. T014 CI pending.
Files: src/features/glossary/sqlite-repository.mjs, sqlite-repository.d.mts, glossary index export, tests/glossary-sqlite-repository.test.mjs, AI_COLLAB/research/NIKL_SQLITE_REPOSITORY_SPIKE_20261114.md.
Contract: repository accepts a dedicated already-open SQLiteDatabase; does not open/create/copy/migrate. Verifies application_id 0x4c4d474c, user_version 1 and six required tables, enables/verifies PRAGMA query_only=ON, and exposes lookup + idempotent close only. Caller owns cleanup if factory validation fails.
Mapping: all GlossEntry fields, including source POS provenance, English equivalent/gloss, labels, learner level, frequency rank and domain labels. Lookup preserves NFKC/trim/lowercase, Japanese reading/optional lemma/POS, Korean exact lemma/POS namespace, exact-surface precedence and priority/ID ordering.
Tests build a real SQLite schema-v1 pack from invented JSONL via T013's builder and query it through a Node read-only SQLite adapter implementing Expo's async method shape. Native Expo Go/iOS/Android validation NOT RUN.
SDK docs: openDatabaseAsync/getFirstAsync/getAllAsync/execAsync/closeAsync available; no SQLiteOpenOptions readOnly flag. expo-sqlite 58.0.16 remains pinned; SDK 58 docs recommend ~58.0.17, patch alignment deferred.
No real NIKL data, production DB, app bundle, external upload or paid service.
Next: T015 safe provisioning of an existing pack into app-private storage, synthetic fixtures only. User action: none.
