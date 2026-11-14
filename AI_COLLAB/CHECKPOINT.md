# CHECKPOINT
Unit: T012 complete; synthetic-only streaming prototype, hardening, regression coverage and CI evidence reconciled.
Status: T009 COMPLETE. T010 COMPLETE. T011 COMPLETE. T012 COMPLETE (SYNTHETIC ONLY). T013 QUEUED.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Latest code commit: 5a2291dd (regression test rejects NIKL member names before opening archive). CI #67 run ID 43544249096 on this SHA SUCCESS: install, typecheck, lint; 35/35 app tests and 7/7 importer tests. Node v22.13.1.
T009 archive remains outside Git: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e. It is not used by T012.
T010 normalizer: src/features/glossary/nikl-json.mjs and .d.mts; synthetic tests only.
T011 reports: NIKL_STREAMING_PIPELINE_20261114.md, NIKL_STORE_RIGHTS_REVIEW_20261114.md, NIKL_T011_RECHECK_20261114.md. Build-time technical GO only; real import/source trust and store distribution HOLD.
T012 package: tools/nikl-importer. Exact tool-only deps zip.js 2.25.0 BSD-3-Clause, stream-json 3.9.0 BSD-3-Clause, stream-chain 4.4.2 BSD-3-Clause. No app runtime deps. Synthetic fixture-only ZIP/JSON streaming, ZIP metadata/CRC/size/ratio checks, duplicate JSON keys, parser depth/packed string-key-number caps, pre-assembly record token budget, T010 normalizer, deterministic JSONL/manifest, atomic publication and cleanup. Regression confirms real NIKL member names and missing allowlists are rejected before file access.
T012 benchmark: 1,500 synthetic records; 643,500 output bytes; 857.48 ms; process peak RSS 134,548 KiB. RSS is whole test-process peak, not importer-only; no real archive/device projection.
Critical limitation: upstream stream-json says it is not designed for hostile JSON. The prototype requires fixture-NN.json names and is not authorized for the actual NIKL archive. No real source text, ZIP, production SQLite or app bundle committed.
Next: T013 synthetic-only SQLite pack builder evaluation/prototype from JSONL; inspect app schema, compare Node node:sqlite vs better-sqlite3/sql.js, verify integrity/foreign keys and atomic publish. No real NIKL data.
No user action required. No spending, external upload or store distribution.
