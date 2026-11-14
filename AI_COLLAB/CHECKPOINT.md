# CHECKPOINT
Unit: T012 isolated synthetic-only ZIP-to-JSON streaming prototype implemented; CI verification pending.
Status: T009 COMPLETE. T010 COMPLETE. T011 COMPLETE. T012 IMPLEMENTED / CI PENDING.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T009 source archive remains outside Git: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e. It is not used by T012.
T010 record normalizer remains at src/features/glossary/nikl-json.mjs and .d.mts with synthetic tests.
T011 reports: AI_COLLAB/research/NIKL_STREAMING_PIPELINE_20261114.md and AI_COLLAB/research/NIKL_STORE_RIGHTS_REVIEW_20261114.md. Build-time technical GO only; production import/store distribution HOLD.
T012 code: tools/nikl-importer/package.json and package-lock.json; tools/nikl-importer/src/import.mjs; tools/nikl-importer/tests/import.test.mjs; tools/nikl-importer/README.md. Tool-only dependencies: zip.js 2.25.0 BSD-3-Clause, stream-json 3.9.0 BSD-3-Clause, stream-chain 4.4.2 BSD-3-Clause. None added to app runtime. Synthetic-only fixtures, bounded ZIP metadata/expanded bytes, CRC32, streaming JSON, T010 normalizer, deterministic JSONL/manifest, atomic publish and cleanup tests.
Security caveat: stream-json upstream says it is not designed for hostile JSON. The prototype is synthetic-only; it is not authorized for the actual NIKL archive.
CI run for this commit is pending. Previous code CI #58 on SHA 59ff61a88a122abb40c56cff0b3d81bc8bb12930 passed install/typecheck/lint and 35/35 tests. Do not treat that as T012 verification.
Next: inspect CI output; fix any failures; measure synthetic benchmark output; then complete T012 docs/state and queue the next task.
No user action required. No real archive/data, app bundling, production SQLite pack, external upload or paid service.
