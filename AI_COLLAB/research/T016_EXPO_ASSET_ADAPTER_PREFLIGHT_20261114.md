# T016 SDK 58 asset and FileSystem integration research (2026-11-15)

Status: upstream package/API contracts VERIFIED. App integration NOT YET COMPLETE. No native behavior claimed.

## 1. Supported Metro module to local file path

VERIFIED: The exact Expo release commit for expo@58.0.24 is 1773068a2b7414a5579c1527e91158a011d89e1b. Its packages/expo/package.json identifies version 58.0.24, MIT, and lists expo-asset as a dependency. The sibling expo-asset package at the same commit is 58.0.21, MIT. SDK 58 docs also describe expo-asset as one of the packages brought in as a dependency of expo.

VERIFIED: SDK 58 Asset.fromModule(assetModule) accepts a string, number, or VirtualAssetModule. A Metro static require() returns the asset module identifier, so this is the supported bridge for a bundled .db asset. Asset.downloadAsync() resolves to an Asset with localUri containing a local file. That file is stored in the OS cache; Expo explicitly warns cache content is not guaranteed to persist between app sessions. Therefore localUri is a temporary read source only. Do not treat it as the database's durable home and do not open it as the app DB.

VERIFIED: The official Expo SQLite example uses SQLiteProvider for a regular mutable todo database, including app migrations. The SDK docs support assetSource for simple import, and Expo's SQLite skill says it imports only when the destination is absent by default; forceOverwrite is not a data migration strategy. That route is unsuitable for LingoMingle's hash-gated immutable pack. Keep T015's explicit digest and schema validation path.

## 2. File and SQLite contract

VERIFIED: SDK 58 FileSystem recommends ~58.0.13; exact source package version is 58.0.13, MIT, with peer dependencies expo/react-native and no runtime dependencies. File.digest supports SHA-256. File copy/move accept a File or Directory destination; T015's narrower interface therefore needs a wrapper that unwraps the wrapped destination. Relocation overwrite defaults false; the docs do not promise crash-atomic cross-platform movement.

VERIFIED: Expo 58.0.24's expo-sqlite package version at the release commit is 58.0.16, matching the project. SQLite.openDatabaseAsync(databaseName, options, directory) accepts defaultDatabaseDirectory as the third argument. SQLiteOpenOptions contains useNewConnection; use it for the glossary's dedicated immutable connection. Open only an existing staging/final name after digest validation, because openDatabaseAsync ensures the path exists before creating/opening a DB.

VERIFIED: SQLite's own docs state WAL sidecar files are part of persistent database state and must travel with the database file. The builder sets journal_mode=DELETE; retain that for the bundled immutable pack so the one-file hash represents its complete database state. SQLite PRAGMA integrity_check does not detect foreign-key violations; a separate foreign_key_check is necessary and already present in T015.

## 3. Metro and native packaging

VERIFIED: Expo's SDK 58 SQLite guidance and current Expo SQLite skill say to add db to Metro's resolver.assetExts if absent when bundling an app.db asset. Expo's Asset docs list SQLite .db among supported native asset types. The repo has no metro.config.js today, so T016 must add a default Expo Metro config plus db to assetExts and verify the native bundle contains the exact synthetic fixture. A successful JS CI run cannot prove iOS/Android asset packaging or runtime localUri behavior.

## 4. Red-team corrections to prior T015/T016 claims

1. T015 previously deleted a different-hash destination after verifying only the new source hash. A valid old schema-v1 pack could therefore be lost if staged validation failed. Its catch could also delete the old final on a conflict. The code now validates staging first, validates any existing different-hash final, rejects a different but valid v1 pack, and only cleans the final after this operation begins publication. Regression test added.
2. The earlier T016 note said expo-asset had to be excluded because task scope permitted only expo-file-system. That conclusion ignored the exact expo@58.0.24 package manifest: expo-asset 58.0.21 is already a dependency. Use its API without adding another direct version pin; the task now records this evidence.
3. NEXT_TASK's allowed-file list omitted package.json and package-lock.json even though acceptance required both, and omitted the Metro config / CI files required by the solution. The file allowlist is now corrected.
4. Root CI uses npm install and the repository has no root lockfile, so transitive dependencies are not reproducibly pinned. npm ci requires a committed consistent lock and never rewrites it. CI will temporarily expose the lock created by npm install on Node 22.13.1/npm 10 as a short-retention artifact, then the reviewed lock can be committed and CI moved to npm ci.
5. Expo FileSystem source/API verification is not native-runtime verification. Native iOS and Android asset resolution, file moves, teardown and crash recovery remain NOT RUN.

## 5. Competitor / OSS pattern and decision

The official expo/examples with-sqlite example demonstrates normal persistent SQLite CRUD and initialization/migrations with SQLiteProvider. It is a useful baseline for ordinary user databases, not a replacement integrity model for immutable bundled content. Expo's own SQLite agent skill recommends a stable provider and onInit for app databases; this app instead uses a dedicated wrapper/provider because asset hash verification and read-only repository ownership must happen before consumers can access the pack.

Decision: use Expo Asset to resolve only the static require() module id; FileSystem hashes and stages to SQLite.defaultDatabaseDirectory; T015 verifies before/after publication; SQLite opens a dedicated new connection; createGlossaryRepository enforces query_only; a root provider owns teardown. No SQLiteProvider.assetSource overwrite path, no cache-backed database, no direct expo-asset version pin, no real NIKL content.

## Source register (primary sources; opened/inspected 2026-11-15)

- Expo SDK 58 Asset docs: https://docs.expo.dev/versions/v58.0.0/sdk/asset/
- Expo SDK 58 FileSystem docs: https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/
- Expo SDK 58 SQLite docs: https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- Expo 58.0.24 release tag: https://github.com/expo/expo/releases/tag/expo@58.0.24
- Expo SQLite guidance / with-sqlite example: https://github.com/expo/examples/tree/master/with-sqlite
- Expo SQLite agent guidance: https://github.com/expo/expo/tree/main/packages/expo-sqlite/skills/expo-sqlite
- npm ci official documentation: https://docs.npmjs.com/cli/npm-ci/
- SQLite WAL persistence guidance: https://www.sqlite.org/wal.html
- SQLite PRAGMA integrity_check / foreign_key_check: https://www.sqlite.org/pragma.html

All source findings are limited to documented API and package metadata; iOS/Android execution is UNKNOWN/NOT RUN.
