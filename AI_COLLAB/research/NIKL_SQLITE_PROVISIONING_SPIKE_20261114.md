# T015: synthetic SQLite pack provisioning (2026-11-14)

## SDK 58 findings

- Expo SQLite docs recommend ~58.0.17. SQLiteProvider.assetSource is supported on Android/iOS/macOS/tvOS/Web and imports a bundled DB into the SQLite directory.
- SDK source shows SQLiteProvider resolves Asset.fromModule(...).downloadAsync(), then calls native importAssetDatabaseAsync. forceOverwrite defaults false; when destination exists, both Android and iOS return without checking its contents. It is not an integrity validator.
- Native import uses Kotlin File.copyTo on Android and iOS FileManager.copyItem. No atomic-copy guarantee is documented. With forceOverwrite, iOS removes DB sidecars before copying. Do not use assetSource as a verified replacement mechanism.
- Expo FileSystem SDK 58 recommends ~58.0.13. File.digest("SHA-256"), File.copy, File.move, File.exists and File.delete support Android/iOS/tvOS. Docs do not promise atomicity for move/copy.
- Paths.cache can be evicted by the OS. The immutable pack belongs in SQLite's app-private defaultDatabaseDirectory, not cache or user Documents.
- expo-file-system is not yet a direct app dependency. The coordinator uses an injected File-shaped interface, no new runtime dependency. T016 will integrate the native adapter.

Sources:
- https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- https://github.com/expo/expo/blob/sdk-58/packages/expo-sqlite/src/hooks.tsx
- https://github.com/expo/expo/blob/sdk-58/packages/expo-sqlite/android/src/main/java/expo/modules/sqlite/SQLiteModule.kt
- https://github.com/expo/expo/blob/sdk-58/packages/expo-sqlite/ios/SQLiteModule.swift
- https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/

## Chosen provisioning contract

New src/features/glossary/provisioning.mjs is a platform-neutral coordinator. The app adapter supplies a bundled-asset File, destination/staging Files in SQLite.defaultDatabaseDirectory, and openDatabaseAsync(name).

- Reserved immutable destination: lingomingle-glossary-v1.sqlite; staging: .lingomingle-glossary-v1.sqlite.staging. User databases must never use these names.
- A matching destination SHA-256 is reused only after SQLite integrity, foreign-key, application ID, schema version, required tables, nonempty source/entry counts and query_only checks.
- A mismatched destination is removed only after the bundled source digest matches the expected SHA-256. This deletion is safe only because the filename is reserved for this immutable pack.
- Source copies to same-directory staging. Staging hash and SQLite checks complete before move. Final hash and SQLite checks complete before its connection is returned.
- File.move atomicity is UNKNOWN. No atomic rename claim is made. Readers must only open through this gate; hash rejects a partial final left by interruption and the next run rebuilds it. Stale staging is discarded.
- A valid-hash but schema-invalid pack is preserved and rejected. This signals a bad expected hash/build rather than silently replacing a supposedly trusted artifact.
- The returned connection is query-only and can be handed to T014 createGlossaryRepository.

## Synthetic tests and limits

Tests use T013's real SQLite builder, invented Japanese/Korean entries, Node's read-only SQLite handle and a filesystem adapter. Cases: first install/repository lookup, valid-existing reuse without reading/copying source, asset hash rejection before destination deletion, wrong schema, interrupted copy, interrupted move, stale-stage cleanup, corrupt reserved destination recovery and repeated provisioning, concurrent calls use separate connections, and foreign-key violations.

No Expo Go, iOS or Android runtime was run. No actual bundled asset, real NIKL text, production pack, app bundle or store distribution was created. Native move/copy crash behavior remains a device validation gate.
