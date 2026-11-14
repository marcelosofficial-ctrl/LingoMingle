# CHECKPOINT
Unit: T012 synthetic ZIP streaming hardening. CI #61 exposed ineffective maxPackedLength protection; input chunks are bounded and a packed-token guard now rejects overlong strings before record assembly. This unit adds a cumulative per-record token guard before streamArray materializes each record.
Status: T009 COMPLETE. T010 COMPLETE. T011 COMPLETE. T012 IMPLEMENTED / CI RETEST PENDING.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T009 archive remains outside Git: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e. Not used by T012.
T010 normalizer: src/features/glossary/nikl-json.mjs and .d.mts; synthetic tests only.
T011 reports: AI_COLLAB/research/NIKL_STREAMING_PIPELINE_20261114.md and AI_COLLAB/research/NIKL_STORE_RIGHTS_REVIEW_20261114.md. Build-time technical GO only; production import/store distribution HOLD.
T012 code: tools/nikl-importer. Exact tool-only pins: zip.js 2.25.0 BSD-3-Clause, stream-json 3.9.0 BSD-3-Clause, stream-chain 4.4.2 BSD-3-Clause. No app runtime dependencies. Synthetic fixtures only; ZIP allowlist/metadata/actual expansion caps, CRC32, duplicate JSON keys, parser depth, bounded input chunks, packed string/key guard, cumulative record byte guard before assembly, T010 normalizer, deterministic JSONL/manifest, atomic publish and cleanup.
CI #60 passed initial prototype. CI #61 failed one long-string assertion. CI #62 (chunk-splitting attempt) was cancelled when a newer commit landed. CI #63 on SHA 189075f is running packed-value token guard retest. Prior 1,500-record synthetic benchmark: Node v22.13.1, 643,500 output bytes, 334.56 ms, 129,496 KiB process peak RSS; whole process peak, not real-archive projection.
Security: stream-json upstream says it is not designed for hostile JSON. Prototype remains synthetic-only and is not authorized for actual NIKL archive.
Next: run CI on cumulative record guard, verify all test output, then finish T012 report/state and queue T013.
No real source/archive, app bundling, production DB, external upload or paid service.
