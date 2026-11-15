# CHECKPOINT

Unit: T016 synthetic pack generation, digest pinning, Metro asset registration, and app-root provider wiring — IMPLEMENTED; mobile Metro verification IN PROGRESS.

VERIFIED:
- CI #90 (43685764873) SUCCESS: root npm ci, typecheck, lint, app tests, importer npm ci/tests.
- Added tools/nikl-importer/scripts/build-synthetic-app-pack.mjs; it creates an invented synthetic-only fixture through the committed importer and SQLite builder.
- CI #92 (43686317680) SUCCESS committed assets/glossary-synthetic-v1.db + manifest as 937ae60.
- DB: 86,016 bytes; SQLite 3.47.2; schema v1; application ID 1280132940; 1 source / 1 entry / 1 surface form / 1 sense. Measured SHA-256 a7730a6bad8a1d3942f50b539931dbb9f4f01fc069721df39f661e2ccbd0affe.
- Independent sqlite3 verification: integrity_check=ok; foreign_key_check empty; user_version=1; all expected table counts match.
- metro.config.js registers .db in assetExts; GlossaryProvider uses measured SHA; app/_layout.tsx wraps app router in GlossaryProvider.
- CI #95 (43686497376) passed npm ci, typecheck, lint, app tests but its Expo `--platform all` smoke step failed only because it included web and react-native-web is not installed. No evidence of iOS/Android or .db failure.
- Commit 53c3f88 changes export verification to separate iOS and Android targets. CI #96 (43686683498) is IN PROGRESS.

NEXT:
1. Verify both iOS and Android Expo exports in CI #96 and remaining importer/build steps.
2. If green, mark T016 code/CI acceptance complete; native runtime tests remain NOT RUN.
3. If either platform export fails, fix the exact platform/bundling cause.

UNKNOWN / NOT DONE:
- CI #96 final conclusion pending.
- Native iOS/Android builds and Expo Go/device runtime validation NOT RUN.
- No real NIKL data, production pack, external upload, paid service, or store distribution. Legal/platform distribution remains HOLD.
