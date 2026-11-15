# CHECKPOINT

Unit: T016 bundled synthetic pack, Metro iOS/Android export, and app-root provider wiring — IMPLEMENTED; final reproducibility CI IN PROGRESS.

VERIFIED:
- CI #90 (43685764873) SUCCESS: root npm ci, typecheck, lint, app tests, importer npm ci/tests.
- Synthetic app generator added at tools/nikl-importer/scripts/build-synthetic-app-pack.mjs; it runs the committed synthetic-only importer and SQLite builder.
- CI #92 (43686317680) committed assets/glossary-synthetic-v1.db and its manifest as 937ae60. DB: 86,016 bytes; SQLite 3.47.2; schema v1; application ID 1280132940; 1 source / 1 entry / 1 surface form / 1 sense. SHA-256 a7730a6bad8a1d3942f50b539931dbb9f4f01fc069721df39f661e2ccbd0affe.
- Independent SQLite check: integrity_check=ok; foreign_key_check empty; user_version=1; all expected row counts match.
- metro.config.js registers .db asset extension; GlossaryProvider pins measured SHA; app/_layout.tsx wraps router in GlossaryProvider.
- CI #96 (43686683498) SUCCESS: root npm ci, typecheck, lint, app tests, Expo Metro iOS export, Expo Metro Android export, importer npm ci/tests, synthetic pack build, artifact upload and asset commit.
- CI #95's --platform all failure was web-only (react-native-web absent); no web target is in product scope. CI #96 proves both required mobile bundles.
- Artifact comparison found database hash stable but the builder manifest's archive-input hash varied. Commit 6d35741 projects the app manifest to stable fields; commit eacb4e4 adds a second generation and byte-for-byte DB/manifest compare.
- CI #98 (43686868728) for the reproducibility correction is QUEUED.

NEXT:
1. Verify CI #98: all checks, both mobile exports, importer tests, generated asset, and byte-for-byte reproducibility check.
2. If green, mark T016 code/CI acceptance complete. Native iOS/Android runtime tests remain NOT RUN.
3. If reproducibility check fails, inspect exact byte difference and make generator deterministic.

UNKNOWN / NOT DONE:
- CI #98 final conclusion pending.
- Native iOS/Android builds and Expo Go/device runtime validation NOT RUN.
- No real NIKL data, production pack, external upload, paid service, or store distribution. Legal/platform distribution remains HOLD.
