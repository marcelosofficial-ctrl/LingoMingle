# CHECKPOINT
Unit: T013 synthetic SQLite pack builder and engine evaluation complete and verified.
T009-T013 COMPLETE (T013 synthetic-only; no real data import).
App inspection: expo-sqlite 58.0.16 is pinned but unused; no app DB schema, migrations, glossary repository or SQLite query adapter exists. Type contract is GlossSource/GlossEntry/GlossSense; current query is matching.mjs.
Engine: Node 22.13.1 built-in node:sqlite DatabaseSync selected; no npm dependency. Experimental Stability 1.1, private build-time only. better-sqlite3 13.1.1 MIT/native Node-API and sql.js 1.16.0 MIT/WASM evaluated, not adopted.
Builder: tools/nikl-importer/src/sqlite-pack.mjs; schema v1, STRICT tables, FKs/unique/check constraints, normalized lookup keys/indexes, one transaction, deterministic DB/manifest hashes, integrity/FK/count/lookup checks, sibling atomic rename, rollback/cancel cleanup. Synthetic-only manifest/member allowlist.
Hardening: bounded UTF-8 JSONL lines, cancellation-aware stream, dangling-symlink-safe output check, actual DB table row-count checks and duplicate-surface priority ordering.
CI #72 on 9041890: SUCCESS. App typecheck/lint passed; app tests 35/35; importer tests 10/10. CI #71 on cc1e441 failed 9/10 importer tests due a test query typo (id vs entry_id), corrected in 9041890.
Synthetic two-entry diagnostic: Node v22.13.1, SQLite 3.47.2, 86,016-byte DB, 460.94 ms, process peak RSS 76,368 KiB. Not a scale benchmark.
Report: AI_COLLAB/research/NIKL_SQLITE_PACK_SPIKE_20261114.md.
Next: T014 app-side read-only Expo SQLite repository/migration contract, synthetic packs only.
