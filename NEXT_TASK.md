# NEXT_TASK
ID: T016
Goal: Integrate T015's hash-gated pack provisioning coordinator with exact SDK 58 Expo FileSystem and Expo SQLite APIs, using synthetic pack assets only.
Acceptance:
- Inspect current SDK 58 package versions, lockfile and FileSystem File/Paths types. Add only compatible expo-file-system patch with deterministic lockfile update; no broad dependency upgrades.
- Resolve a bundled synthetic pack asset, compute SHA-256 with File.digest, place staging/final files in SQLite.defaultDatabaseDirectory, and open only after T015 validation. Never use SQLiteProvider assetSource as an integrity/replacement mechanism.
- Wire the dedicated query-only connection into createGlossaryRepository; close on initialization failure and app teardown. Never share this immutable pack connection with user-data writes.
- Run typecheck/lint/unit CI and native Expo Go/device tests where available. If native runtime cannot be exercised, keep that gate NOT RUN.
- Test restart/recovery from stale staging and interrupted/partial reserved destination. Verify no valid pack is overwritten.
- No real NIKL data, production pack, external upload, paid service, account/API key or store distribution. Keep Node node:sqlite/importer packages out of app runtime.
Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, app/**, src/**, tests/**, AI_COLLAB/research/**.
Line budget <=350 changed lines. Commit completed unit and overwrite CHECKPOINT.md.
