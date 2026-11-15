# CHECKPOINT

Unit: T016 synthetic pack generation, verified digest, Metro asset registration, and app-root provider wiring — IMPLEMENTED; final CI verification IN PROGRESS.

VERIFIED:
- CI #90 (43685764873) SUCCESS: root npm ci, typecheck, lint, app tests, importer npm ci/tests.
- Added tools/nikl-importer/scripts/build-synthetic-app-pack.mjs. It builds an invented synthetic-only fixture through the committed importer and SQLite builder.
- CI #91 (43686203804) SUCCESS generated the synthetic pack artifact; CI #92 (43686317680) SUCCESS committed it as 937ae60.
- Committed assets/glossary-synthetic-v1.db (86,016 bytes) and its manifest. SQLite 3.47.2, schema v1, app ID 1280132940, 1 source / 1 entry / 1 surface form / 1 sense. Measured SHA-256: a7730a6bad8a1d3942f50b539931dbb9f4f01fc069721df39f661e2ccbd0affe.
- Independently verified the committed DB bytes against the CI manifest: integrity_check=ok, foreign_key_check empty, user_version=1, all six table row counts match.
- Added metro.config.js with .db in assetExts; updated GlossaryProvider to the measured SHA; wrapped app/_layout.tsx in GlossaryProvider.
- CI #95 (43686497376) on cd96fca: root npm ci, typecheck, lint, app tests completed SUCCESS. Expo Metro iOS+Android export currently IN PROGRESS; importer tests and asset regeneration/commit steps remain after it.

NEXT:
1. Verify CI #95 Expo export and remaining importer/build steps.
2. If green, mark T016 code/CI acceptance complete. Native iOS/Android runtime tests remain NOT RUN.
3. If export fails, fix the actual bundling issue and rerun.

UNKNOWN / NOT DONE:
- CI #95 final conclusion pending.
- Native iOS/Android builds and Expo Go/device runtime validation NOT RUN.
- No real NIKL data, production pack, external upload, paid service, or store distribution. Legal/platform distribution remains HOLD.
