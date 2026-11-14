# CHECKPOINT
Unit: T012 synthetic ZIP-to-JSON streaming prototype hardening is in progress; CI exposed a parser fast-path nuance in maxPackedLength.
Status: T009 COMPLETE. T010 COMPLETE. T011 COMPLETE. T012 IMPLEMENTED / HARDENING RETEST PENDING.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T009 source archive remains outside Git: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e. It is not used by T012.
T010 record normalizer remains at src/features/glossary/nikl-json.mjs and .d.mts with synthetic tests.
T011 reports: AI_COLLAB/research/NIKL_STREAMING_PIPELINE_20261114.md and AI_COLLAB/research/NIKL_STORE_RIGHTS_REVIEW_20261114.md. Build-time technical GO only; production import/store distribution HOLD.
T012 code: tools/nikl-importer. zip.js 2.25.0 BSD-3-Clause (exact tag confirms Node >=18); stream-json 3.9.0 BSD-3-Clause; stream-chain 4.4.2 BSD-3-Clause. All exact tool-only pins, no app runtime deps. Synthetic-only fixtures; bounded ZIP metadata/actual expanded bytes and actual compression ratio; CRC32; duplicate JSON key guard; parser depth/string caps; T010 normalizer; deterministic JSONL/manifest; atomic publish and cleanup.
CI #60 (run ID 43543329087) on SHA 4d71b7462c44dbbfa33800dba17a14517dc0c90e SUCCESS: root install/typecheck/lint, 35/35 app tests and 5/5 importer tests. Node v22.13.1 benchmark: 1,500 records, 643,500 output bytes, 334.56 ms, process peak RSS 129,496 KiB. This is a small synthetic fixture; RSS is the whole test process peak, not importer-only or a real-archive projection.
CI #61 (run ID 43543518845) on SHA 18849f3a failed one importer test: stream-json maxPackedLength checks its between-chunk accumulator and a whole string within one input chunk bypasses that guard. The pipeline now caps input chunk size and splits chunks before parser input to make the configured packed-value bound effective. Retest pending.
Security caveat: stream-json upstream says it is not designed for hostile JSON. Prototype remains synthetic-only and is not authorized for actual NIKL archive.
Next: inspect CI #62, fix any failures, then complete T012 docs/state and queue T013.
No user action required. No real archive/data, app bundling, production SQLite pack, external upload or paid service.
