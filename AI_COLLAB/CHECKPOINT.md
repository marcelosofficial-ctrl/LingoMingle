# CHECKPOINT
Unit: T012 synthetic-only ZIP-to-JSON streaming importer; final fixture-only boundary and numeric-token hardening passes CI #66. Adding an explicit regression test that rejects NIKL member names before file access.
Status: T009 COMPLETE. T010 COMPLETE. T011 COMPLETE. T012 IMPLEMENTED / FINAL TEST PENDING.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T009 archive remains outside Git: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e. Never used by T012.
T010 normalizer: src/features/glossary/nikl-json.mjs and .d.mts; synthetic tests only.
T011 reports: AI_COLLAB/research/NIKL_STREAMING_PIPELINE_20261114.md and AI_COLLAB/research/NIKL_STORE_RIGHTS_REVIEW_20261114.md. Build-time technical GO only; production import/store distribution HOLD.
T012 code: tools/nikl-importer. Exact tool-only pins: zip.js 2.25.0 BSD-3-Clause, stream-json 3.9.0 BSD-3-Clause, stream-chain 4.4.2 BSD-3-Clause. No app runtime dependencies. Import entry point requires explicit fixture-NN.json allowlist and refuses NIKL archive member names. Bounded ZIP allowlist/metadata/actual expansion, CRC32, duplicate JSON keys, parser depth, bounded input chunks, packed string/key/number guard, cumulative record byte guard before assembly, T010 normalizer, deterministic JSONL/manifest, atomic publish and cleanup.
CI #64 on SHA 9b52057 passed app typecheck/lint, 35/35 app tests and 6/6 importer tests. CI #66 on SHA 9236490 passed the same app checks and 6/6 importer tests after synthetic allowlist and numeric-token hardening. Node v22.13.1 benchmark on #66: 1,500 records, 643,500 output bytes, 1,100.27 ms, whole-process peak RSS 133,936 KiB. Small fixture only, not a real-archive projection.
Final regression test now asserts real NIKL filenames and missing allowlists are rejected before the importer stats/opens a file. CI pending.
Security: stream-json upstream says it is not designed for hostile JSON. Prototype remains synthetic-only and is not authorized for actual NIKL archive.
Next: verify final CI, complete T012 report/state and queue T013.
No real source/archive, app bundling, production DB, external upload or paid service.
