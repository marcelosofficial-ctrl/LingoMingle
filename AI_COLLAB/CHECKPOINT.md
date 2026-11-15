# CHECKPOINT

Unit: T016 synthetic pack + provider integration + mobile Metro verification — DONE. T016 complete.

VERIFIED:
- CI #98 (43686868728) SUCCESS on eacb4e4: root npm ci, typecheck, lint, app tests, Expo Metro iOS + Android exports, importer npm ci/tests, synthetic pack generation, and byte-for-byte repeat-build comparison of DB + manifest.
- CI-generated asset committed at assets/glossary-synthetic-v1.db and assets/glossary-synthetic-v1.manifest.json (asset commit bc620031).
- DB: 86,016 bytes; SQLite 3.47.2; schema v1; application ID 1280132940; 1 source / 1 entry / 1 surface form / 1 sense. SHA-256 a7730a6bad8a1d3942f50b539931dbb9f4f01fc069721df39f661e2ccbd0affe.
- Independent SQLite check: integrity_check=ok; foreign_key_check empty; user_version=1; all expected counts match.
- metro.config.js registers .db; GlossaryProvider pins measured digest; app/_layout.tsx mounts provider.
- Root package-lock generated/committed by CI; React/React DOM peer alignment fixed. No peer bypass.

UNKNOWN / NOT DONE:
- Native iOS/Android builds and Expo Go/device runtime validation NOT RUN.
- No real NIKL data, production pack, external upload, paid service, or store distribution. Legal/platform distribution remains HOLD.

NEXT:
- T017 queued in NEXT_TASK.md: canonical 46-character basic hiragana dataset + tests, selectable accessible grid and character detail. Excludes voiced/small/katakana/audio for first slice.
- No user action required.
