# NEXT_TASK
ID: T016
Goal: Integrate T015's hash-gated pack provisioning coordinator with exact SDK 58 Expo FileSystem and Expo SQLite APIs, using synthetic pack assets only.

Preflight findings (verified 2026-11-14):
- SDK 58 recommends expo-file-system ~58.0.13 and expo-asset ~58.0.21.
- Bundle SQLite fixture as .db using expo-asset config plugin; resolve with Asset.fromModule(require(...)).downloadAsync(), then hash its localUri using File.digest("SHA-256"). Asset cache is temporary only.
- Open the installed file with SQLite.defaultDatabaseDirectory. Wrap Expo File instances to satisfy T015's narrower injected interface.
- Root package-lock.json is absent and CI currently runs npm install. Do not fabricate a lockfile; generate/commit it mechanically in a separate unit if adopted.
- No app asset, synthetic DB fixture, or glossary lifecycle/provider exists yet.

Acceptance:
- Inspect current SDK 58 package versions, lockfile and File/Paths types. Add only compatible FileSystem and Asset packages with deterministic lockfile update; no broad dependency upgrades.
- Generate a tiny synthetic-only schema-v1 .db fixture with invented Japanese/Korean text; verify its exact SHA-256. No real NIKL.
- Resolve bundled asset, hash with File.digest, stage/final under SQLite.defaultDatabaseDirectory, and open only after T015 validation. Never use SQLiteProvider assetSource as integrity/replacement mechanism.
- Wire the dedicated query-only connection into createGlossaryRepository; close on initialization failure and app teardown. Never share this immutable pack connection with user-data writes.
- Test restart/recovery from stale staging and interrupted/partial reserved destination. Verify no valid pack is overwritten.
- Run typecheck/lint/unit CI and native Expo Go/device tests where available. If native runtime cannot be exercised, keep that gate NOT RUN.
- No production pack, external upload, paid service, account/API key or store distribution. Keep Node node:sqlite/importer packages out of app runtime.

Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, app/**, src/**, tests/**, AI_COLLAB/research/**.
Line budget <=350 changed lines per implementation unit; generated lockfile is a separate mechanical unit. Commit completed unit and overwrite CHECKPOINT.md.
