# CHECKPOINT
Unit: T013 SQLite pack builder implementation and synthetic acceptance tests committed; CI pending.
T009-T012 remain COMPLETE. T013 IN PROGRESS.
T013 inspected app data layer: no SQLite schema, migrations, glossary repository/query adapter or app database calls exist yet. expo-sqlite 58.0.16 is present in app package only. Current typed GlossEntry/GlossSense/GlossSource model is the schema source; in-memory lookup is src/features/glossary/matching.mjs.
Build-only choice: Node 22.13.1 node:sqlite DatabaseSync, no new npm dependency. It is experimental (Stability 1.1) but unflagged since Node 22.13.0; acceptable only for this private, pinned build tool. better-sqlite3 13.1.1 is MIT/Node >=22 with node-addon-api native dependency and unresolved clean-install node-gyp issues; sql.js 1.16.0 is MIT/zero deps but WASM/in-memory with whole-DB export.
T013 code: tools/nikl-importer/src/sqlite-pack.mjs and tests/sqlite-pack.test.mjs. Consumes only T012 synthetic JSONL plus its verified fixture-only manifest. Creates source/entry/surface/sense/label tables with FKs/uniqueness/checks, stable inserts in one transaction, indexes after bulk insert, schema version 1, integrity/foreign-key/count/lookup checks, DB hash/manifest and same-filesystem atomic rename. Failure/cancellation rolls back and removes temp output.
No real NIKL data, app/user DB, app bundle, paid services or store distribution.
Next: inspect CI #68 and fix any failures; then write T013 report, update state/dependencies/decision, and queue T014.
