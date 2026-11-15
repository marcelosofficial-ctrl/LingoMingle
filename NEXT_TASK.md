# NEXT_TASK
ID: T016
Goal: Integrate T015's hash-gated pack provisioning coordinator with exact SDK 58 Expo FileSystem and Expo SQLite APIs, using synthetic pack assets only.
Acceptance:
- Pin compatible expo-file-system 58.0.13 and expo-asset 58.0.21 directly. Although expo-asset is part of the SDK 58 package family, CI proved it is not installed by the root npm dependency graph merely because expo is installed. Both exact versions are direct dependencies; no broad SDK upgrades.
- Bundle a synthetic .db fixture and configure Metro's resolver.assetExts for .db. Resolve the Metro module id with Asset.fromModule(...).downloadAsync(); use localUri only as a temporary source because it lives in an OS-evictable cache. Hash with File.digest("SHA-256"), then copy to staging in SQLite.defaultDatabaseDirectory. Never open the cache URI as the application DB.
- Open staging only after the copy hash passes. Run T015 schema, integrity, FK, exact-column and count checks. Move to final only after staging passes, then hash and validate final before handing it to createGlossaryRepository. Never use SQLiteProvider assetSource as an integrity/replacement mechanism.
- Protect a different valid schema-v1 pack at the reserved filename: return a clear conflict and preserve its bytes. The v1 filename is immutable; a future content revision requires a new versioned filename/schema migration. Recover only corrupt/partial files that T015 can positively identify as invalid; fail closed on an unclassifiable I/O error.
- Wire a dedicated query-only connection into createGlossaryRepository; useNewConnection; close on initialization failure and app teardown including unmount races. Never share this immutable pack connection with user-data writes.
- Run typecheck/lint/unit CI; keep native Expo Go/device tests NOT RUN until actual iOS/Android output exists.
- Generate root package-lock.json mechanically through the exact Node 22.13.1/npm 10 CI toolchain, upload it as a short-retention artifact for review, then switch root CI to npm ci after the lock is committed. No manually authored lock data.
- No real NIKL data, production pack, external upload, paid service, account/API key or store distribution. Keep Node node:sqlite/importer packages out of app runtime.
Files allowed: NEXT_TASK.md, STATE.md, package.json, package-lock.json, metro.config.js, .github/workflows/ci.yml, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, app/**, assets/**, src/**, tests/**, AI_COLLAB/research/**.
Line budget <=350 changed lines per unit. Commit each completed unit and overwrite CHECKPOINT.md.
