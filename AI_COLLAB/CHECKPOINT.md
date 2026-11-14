# CHECKPOINT
Unit: T012 synthetic ZIP-to-JSON streaming prototype passed CI; final synthetic-only boundary cleanup is being applied before task closure.
Status: T009 COMPLETE. T010 COMPLETE. T011 COMPLETE. T012 IMPLEMENTED / FINAL RETEST PENDING.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T009 archive remains outside Git: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e. It is not used by T012.
T010 normalizer: src/features/glossary/nikl-json.mjs and .d.mts; synthetic tests only.
T011 reports: AI_COLLAB/research/NIKL_STREAMING_PIPELINE_20261114.md and AI_COLLAB/research/NIKL_STORE_RIGHTS_REVIEW_20261114.md. Build-time technical GO only; production import/store distribution HOLD.
T012 code: tools/nikl-importer. Exact tool-only pins: zip.js 2.25.0 BSD-3-Clause, stream-json 3.9.0 BSD-3-Clause, stream-chain 4.4.2 BSD-3-Clause. No app runtime dependencies. Synthetic fixtures only; ZIP allowlist/metadata/actual expansion caps, CRC32, duplicate JSON keys, parser depth, bounded input chunks, packed string/key guard, cumulative record byte guard before assembly, T010 normalizer, deterministic JSONL/manifest, atomic publish and cleanup. The synthetic entry point now requires explicit fixture-NN.json names and refuses real NIKL archive member names.
CI #64 (run ID 43543798572) on SHA 9b520577945ea4205ff6235261f25afb5868b1d3 SUCCESS: root install/typecheck/lint, 35/35 app tests and 6/6 importer tests. Node v22.13.1 synthetic benchmark: 1,500 records, 643,500 output bytes, 965.41 ms, process peak RSS 135,732 KiB. RSS is whole test-process peak, not importer-only; fixture is not a real-archive projection.
Security: stream-json upstream says it is not designed for hostile JSON. Prototype remains synthetic-only and is not authorized for actual NIKL archive.
Next: verify final synthetic filename/numeric-token hardening CI, then complete T012 docs/state and queue T013.
No real source/archive, app bundling, production DB, external upload or paid service.
