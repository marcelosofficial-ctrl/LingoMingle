# CHECKPOINT
Unit: T015 synthetic-only SQLite pack provisioning coordinator COMPLETE.
Base: c11cddacafa576c11c8f82db331107d41601fa3c. CI #78 failed lint because Buffer was undefined in the existing repository test; T015 imports Buffer from node:buffer. T015 CI pending.
Files: src/features/glossary/provisioning.mjs, provisioning.d.mts, tests/glossary-provisioning.test.mjs, tests/glossary-sqlite-repository.test.mjs (Buffer lint fix), AI_COLLAB/research/NIKL_SQLITE_PROVISIONING_SPIKE_20261114.md.
Contract: reserved immutable filename lingomingle-glossary-v1.sqlite and same-directory staging. Reuse only matching SHA-256 plus SQLite integrity/FK/application ID/schema/table/count/query_only checks. Verify source hash before deleting an invalid reserved destination. Stage copy/hash/SQLite validation precedes move; final hash and SQLite validation precede returning connection. T014 repository handoff is covered by synthetic lookup.
Failure model: stale staging removed; interrupted copy/move partials cleaned; partial final left by process interruption is rejected by hash on next run. Expo File.move atomicity undocumented; no atomicity claim. Valid-hash/schema-invalid pack fails closed and is preserved.
SDK review: SQLiteProvider assetSource skips copy when destination exists and uses native copyTo (Android)/copyItem (iOS), not verified replacement. File.digest SHA-256/copy/move/delete are SDK 58 APIs. expo-file-system not yet a direct dependency.
No Expo Go/iOS/Android validation; no real NIKL data, production DB, app bundle, external upload or paid service.
Next: T016 integrate Expo FileSystem/SQLite adapter and native verification, synthetic pack only. User action: none.
