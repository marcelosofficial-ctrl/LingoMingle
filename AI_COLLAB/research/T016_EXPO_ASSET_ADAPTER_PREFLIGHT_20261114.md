# T016 Expo asset adapter preflight (2026-11-14)

Status: SDK/API contract researched; implementation not started. This is a bounded preflight, not T016 completion.

## Verified SDK 58 package and API facts

- Versioned SDK 58 FileSystem docs recommend expo-file-system ~58.0.13. The public API exports File, Directory, and Paths; File.digest("SHA-256") returns lowercase hexadecimal; copy, move, exists, delete, parentDirectory, name, and uri are available on iOS and Android. Source: https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/
- Versioned SDK 58 Asset docs recommend expo-asset ~58.0.21. Asset.fromModule(require(...)) resolves a Metro asset and downloadAsync() gives a localUri. The downloaded asset is placed in cache and is not guaranteed to persist across sessions. It is a temporary source only; copy it into SQLite's durable app-private directory before returning a connection. Source: https://docs.expo.dev/versions/v58.0.0/sdk/asset/
- The expo-asset config plugin explicitly supports SQLite database assets with the .db extension. Bundle the synthetic pack as .db, not .sqlite, and pass its Metro module ID to Asset.fromModule. The app-owned installed filename remains T015's .sqlite name. Source: https://docs.expo.dev/versions/v58.0.0/sdk/asset/
- Asset.hash is MD5, so it is not an acceptable substitute for T015's SHA-256. Compute SHA-256 over the downloaded local file with File.digest.
- Never use SQLiteProvider assetSource as the verified install or replacement path. T015's source review established that it skips an existing destination by default and does not validate the existing file.
- File.copy/move parameter types accept File or Directory, while T015's injected GlossaryPackFile interface has a narrower copy/move signature. The native adapter should wrap Expo File instances behind small structural objects, forwarding operations to native File objects. Do not cast the Expo File class directly to GlossaryPackFile.
- SQLite openDatabaseAsync accepts the filename and options; supply SQLite.defaultDatabaseDirectory explicitly. The resulting dedicated connection goes through provisionGlossaryPack, then createGlossaryRepository. On repository-construction failure, close the validated connection. On successful transfer, repository.close owns connection teardown.

## Repository constraints discovered

- Root package.json pins direct dependencies exactly, but there is no root package-lock.json or other root lockfile. CI currently runs npm install, not npm ci. The only lockfile is isolated under tools/nikl-importer. Adding runtime packages without deciding the root lockfile policy leaves transitive resolution non-reproducible.
- The app currently has no assets directory, no bundled SQLite pack, and no glossary lifecycle/provider in app/_layout.tsx. T016 must create a tiny synthetic-only schema-v1 SQLite pack and wire its module reference; no real NIKL data or generated production pack is permitted.
- A .db synthetic fixture should contain only invented Japanese/Korean strings and a clearly synthetic source record. Record its SHA-256 as a reviewed constant and test that the bundled bytes match it.
- The app is currently a skeleton. A root-level provider should initialise once, retain the repository for app lifetime, render children only after initialization (or expose an explicit unavailable state), and close on teardown. Avoid opening a second database connection or sharing the pack with user-data writes.

## Required implementation sequence

1. Resolve root lockfile policy. If adding package-lock.json, generate it from npm on Node 22.13.1 and commit it as a dedicated mechanical unit; do not hand-author or fabricate transitive resolutions. Preserve the <=350-line work-unit budget by separating generated lockfile work.
2. Add exact SDK-compatible direct dependencies: expo-file-system 58.0.13 and expo-asset 58.0.21, after lockfile policy is settled. Do not run broad Expo dependency upgrades.
3. Generate and commit the minimal synthetic .db pack using the existing T013 builder and synthetic manifest/JSONL inputs. No real NIKL archive/text.
4. Add expo-asset plugin config for the .db fixture; add a native adapter with wrappers around File instances and a single openDatabaseAsync call in SQLite.defaultDatabaseDirectory.
5. Add lifecycle/provider tests with injected adapters, plus startup cleanup tests for stale staging and interrupted reserved targets. Verify a valid existing pack is never overwritten.
6. Run CI. Native Expo Go/iOS/Android tests remain NOT RUN until actual device/runtime output is available.

## Gate status

- SDK 58 API/package recommendations: VERIFIED from versioned Expo docs.
- Native File.copy/move crash durability: UNKNOWN; T015 explicitly makes no atomicity guarantee.
- Actual bundled asset behavior on iOS/Android: NOT RUN.
- Root dependency lock reproducibility: BLOCKED pending root lockfile policy and generated lockfile.
- App provider wiring and lifecycle: NOT IMPLEMENTED.
- Real NIKL import, production pack and store distribution: HOLD as before.
