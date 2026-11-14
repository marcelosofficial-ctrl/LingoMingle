# CHECKPOINT
Unit: T013 SQLite pack builder implementation and normalized lookup schema pass CI #70; adding explicit SQLite runtime/size metrics and pinning CI Node patch version.
T009-T012 COMPLETE. T013 IMPLEMENTED / FINAL CI PENDING.
App inspection: no SQLite schema, migrations, glossary repository/query adapter or app DB calls exist yet. expo-sqlite 58.0.16 is in package only. Current contract is GlossEntry/GlossSense/GlossSource; in-memory lookup is matching.mjs.
Build-only choice: Node 22.13.1 node:sqlite DatabaseSync, no npm dependency. Experimental Stability 1.1 but unflagged since Node 22.13.0; build-only only. better-sqlite3 13.1.1 is MIT/Node >=22 with native addon/node-addon-api and unresolved clean-install node-gyp risk; sql.js 1.16.0 is MIT/zero deps but WASM/in-memory with full export.
T013 builder: tools/nikl-importer/src/sqlite-pack.mjs. Consumes only T012 synthetic JSONL plus verified fixture-only manifest. Normalized schema preserves source/entry/POS/reading/level/rank/priority/surface/sense/labels. Indexed keys exactly match matching.mjs normalization (NFKC, trim, lowercase) for surface, lemma/POS and reading. One transaction, indexes after inserts, schema version/application ID, integrity/foreign-key/count/lookup checks, deterministic DB hash/manifest, atomic rename, rollback/cancel cleanup.
CI #70 on d0d4537 passed app typecheck/lint, 35/35 app tests and 10/10 importer tests. Added explicit SQLite version 3.47.2, DB file size, application ID and NFKC surface alias metrics; CI workflow Node pinned to 22.13.1. Final CI pending.
No real NIKL data, app/user DB, app bundle, paid services or store distribution.
Next: inspect CI #71; then T013 research/report/docs and queue T014.
