# CHECKPOINT

Unit: T016 root lockfile generation + CI publication path — DONE. T016 overall remains IN PROGRESS.

VERIFIED:
- CI #87 (43684425346) SUCCESS: npm install on Node 22.13.1 / npm 10.9.2, root typecheck, lint, app tests, importer npm ci/tests, artifact upload.
- Downloaded artifact 14149339600. It contains package-lock.json (429,564 bytes; lockfileVersion 3). Inspected root pins and resolved package entries: Expo 58.0.24, expo-asset 58.0.21, expo-file-system 58.0.13, expo-sqlite 58.0.16; all match package.json. No manual lockfile edits.
- Commit 65de49f introduced the lockfile commit + root npm ci path.
- CI #88 (43684904514) generated/uploaded the lock, then its push failed non-fast-forward because commits landed after checkout. Logs confirmed exact cause; no npm ci or tests ran in #88.
- Commit 54c92a6 hardened the action: preserve generated lock in RUNNER_TEMP, fetch branch head, refuse if package.json changed, reset checkout to current remote head, restore generated lock, then commit/push. This avoids overwriting intervening docs commits.
- 5895d54 updates STATE with exact status and failure/recovery.
- CI #89 (43684992129) IN PROGRESS at checkpoint time. It is testing the hardened procedure. Do not claim lockfile committed or root npm ci passed until run output confirms.

Current blockers / UNKNOWN:
- package-lock.json is not yet confirmed in the branch; #89 may commit it.
- assets/glossary-synthetic-v1.db absent; provider SHA 29e3...e404 remains unverified placeholder.
- Metro .db assetExts and app-root GlossaryProvider wiring remain outstanding.
- Native iOS/Android NOT RUN; no real NIKL data, production pack, external upload, paid service, or store distribution.

Next: verify #89 lock commit and root npm ci; then build a deterministic synthetic-only SQLite asset through committed T013 builder, validate exact schema/row counts/integrity/FKs, use measured SHA, add Metro .db config and provider root wiring, and rerun CI.
