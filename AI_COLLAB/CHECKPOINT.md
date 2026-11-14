# CHECKPOINT
Unit: T015 synthetic-only SQLite pack provisioning coordinator COMPLETE.
Implementation head: 46d73869a3d84fe6ee7a3fbd31a8ea40a786e237. CI #82 SUCCESS: typecheck, lint, 47/47 app tests, 10/10 isolated importer tests; Node 22.13.1.
Files: src/features/glossary/provisioning.mjs, provisioning.d.mts, tests/glossary-provisioning.test.mjs, tests/glossary-sqlite-repository.test.mjs (Buffer lint fix), AI_COLLAB/research/NIKL_SQLITE_PROVISIONING_SPIKE_20261114.md.
Contract: reserved immutable filename lingomingle-glossary-v1.sqlite and same-directory staging. Reuse only matching SHA-256 plus SQLite integrity/FK/application ID/schema/table/exact-column/count/query_only checks. Verify source hash before deleting an invalid reserved destination. Stage copy/hash/SQLite validation precedes move; final hash and SQLite validation precede returning connection. T014 repository handoff is covered by synthetic lookup.
Concurrency: same-path/same-hash calls serialize and receive separate SQLite connections; differing hashes conflict. Interrupted copy/move partials and stale staging are cleaned. Android File.move tries atomic rename but may fall back to copy+delete; iOS uses FileManager.moveItem. No cross-platform atomicity/durability guarantee is claimed.
SDK review: SQLiteProvider assetSource skips import if destination exists. File.digest requires "SHA-256". File.copy/move/delete are SDK 58 APIs. expo-file-system 58.0.13 MIT is evaluated but not yet a direct dependency.
No Expo Go/iOS/Android validation; no real NIKL data, production DB, app bundle, external upload or paid service.
Next: T016 integrate Expo FileSystem/SQLite adapter and native verification, synthetic pack only. User action: none.
