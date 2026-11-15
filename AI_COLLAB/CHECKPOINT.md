# CHECKPOINT

Unit: T016 provider compile-contract repair committed; verification pending.

Recovered completed work:
- 20c60ef + cbb1226: T015 red-team fix and regression test. Preserve a different but valid v1 pack; stage and validate replacement before inspecting final; avoid deleting previous final during conflict/error cleanup.
- 2bc38c9: Expo SDK 58 asset/FileSystem/SQLite source research and task scope/file allowlist corrections.
- 7e7a608: initial GlossaryProvider. CI failed; do not treat as usable yet.
- 34ab4b5: add direct expo-asset 58.0.21 + expo-file-system 58.0.13 dependencies, use actual Expo SQLiteDatabase in provisioning declaration, widen DB name allowlist, correct task statement that expo-asset is implicitly installed.

VERIFIED red-team findings: (1) indirect SDK-family package membership does not mean npm resolves an import without direct dependency; CI proved both imports missing. (2) provider was structurally incompatible with repository/provisioning types because declaration erased the actual SQLiteDatabase type. (3) provider references `assets/glossary-synthetic-v1.db` and SHA `29e3...e404`, but no committed asset/hash verification exists; this is a blocker, not an implemented fixture. (4) root package-lock absent, and CI has no artifact upload step yet.

CI: #43681794420 FAILED on 7e7a608 (missing modules + typing errors). #43683793814 / run #86 on 34ab4b5 IN_PROGRESS at checkpoint time. #43681525760 SUCCESS on cbb1226 (pre-provider). Native iOS/Android NOT RUN.

Next: confirm #86 typecheck/lint/test results; build a real deterministic synthetic DB matching the committed schema and update SHA; add Metro .db asset config and root CI lockfile artifact; review provider teardown and route wiring; commit generated root lock from CI artifact, then switch npm install to npm ci. No NIKL data, production pack, store release, paid service.
