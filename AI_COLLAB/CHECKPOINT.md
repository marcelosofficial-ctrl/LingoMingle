# CHECKPOINT
Unit: T013 SQLite pack builder schema/query-key refinement committed; CI retest pending.
T009-T012 COMPLETE. T013 IMPLEMENTED / CI RETEST PENDING.
App inspection: no SQLite schema, migrations, glossary repository/query adapter or app DB calls exist yet. expo-sqlite 58.0.16 is in package only. Current contract is GlossEntry/GlossSense/GlossSource; in-memory lookup is matching.mjs.
Build-only choice: Node 22.13.1 node:sqlite DatabaseSync, no npm dependency. Experimental Stability 1.1 but unflagged since Node 22.13.0; build-only only. better-sqlite3 13.1.1 is MIT/Node >=22 with native addon/node-addon-api and unresolved clean-install node-gyp risk; sql.js 1.16.0 is MIT/zero deps but WASM/in-memory with full export.
T013 builder: tools/nikl-importer/src/sqlite-pack.mjs. It consumes only T012 synthetic JSONL plus verified fixture-only manifest. Normalized schema preserves GlossSource, GlossEntry, POS and source POS, reading, learner level, frequency rank, priority, surface forms, senses, English equivalents/glosses, sense labels and domain labels. Indexed keys exactly match matching.mjs normalization (NFKC, trim, lowercase) for surface, lemma/POS and reading paths. One transaction, indexes after inserts, schema version 1, integrity/foreign-key/count/lookup checks, deterministic DB hash/manifest, atomic rename, rollback/cancel cleanup.
T013 tests: tools/nikl-importer/tests/sqlite-pack.test.mjs. CI #69 passed 10/10 importer tests; CI #68 failed only a reused test output directory. Fix applied; normalized-key coverage added after #69, new CI pending.
No real NIKL data, app/user DB, app bundle, paid services or store distribution.
Next: inspect CI #70; then T013 research/report/docs and queue T014.
