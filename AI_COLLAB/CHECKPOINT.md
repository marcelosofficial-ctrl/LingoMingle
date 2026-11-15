# CHECKPOINT

Unit: T015 provisioning red-team correction COMPLETE. T016 Expo app integration IN PROGRESS.

VERIFIED code correction: old provisioning could delete a different but valid schema-v1 pack after checking only the new asset hash; outer error cleanup could also delete the previous final file. The new sequence copies and validates staging first, validates any existing different-hash final, preserves a valid different-content v1 pack with glossary-pack-destination-valid-content-conflict, and deletes a final file on error only after this attempt has started publication. Added a regression test proving the old file remains byte-identical and SQLite-valid. Commits: 20c60ef (provisioning logic), cbb1226 (regression tests).

VERIFIED SDK 58 asset path: Expo 58.0.24 itself depends on expo-asset 58.0.21 (MIT). Asset.fromModule(require(...)).downloadAsync() resolves the Metro numeric asset id and returns a cache localUri; cache is OS-evictable, so use it only as a source. Copy to staging under SQLite.defaultDatabaseDirectory before opening the DB. Metro needs .db in resolver.assetExts.

Red-team findings still open: root lock absent and CI currently uses npm install; task file allowlist omitted required package/CI/Metro/asset paths; no app-lifetime provider exists. CI artifact upload will be added to capture the real npm-generated lock from Node 22.13.1/npm 10, rather than fabricate it. Native startup/asset packaging NOT RUN.

Current CI: #43681515697 (commit 20c60ef) IN_PROGRESS; #43681525760 (cbb1226) PENDING. Latest known successful baseline #82, 46d7386. No current test claim until those runs finish.

Next: add the synthetic-only .db fixture, verified Asset/FileSystem adapter and teardown-safe GlossaryProvider; add Metro config, direct expo-file-system 58.0.13 pin and lockfile CI artifact; then retrieve and commit the generated root package-lock separately. No NIKL data or store distribution.
