# CHECKPOINT

Unit: T016 SDK 58 asset-adapter preflight COMPLETE. T016 implementation remains IN PROGRESS.

Branch head before this docs unit: 1dee10ab0cd11b42c0bd24007d9b1dd6c2ea74ed. CI #82 SUCCESS on code commit 46d73869a3d84fe6ee7a3fbd31a8ea40a786e237: typecheck, lint, 47/47 app tests, 10/10 importer tests. Docs-only commits since then did not trigger CI.

Verified: SDK 58 recommends expo-file-system ~58.0.13 and expo-asset ~58.0.21. Asset.fromModule + downloadAsync resolves a temporary cache file; Asset.hash is MD5, so SHA-256 must use File.digest("SHA-256"). Bundle the synthetic SQLite fixture as .db via expo-asset config plugin. Wrap Expo File instances to adapt File|Directory copy/move signatures to T015's narrower interface. Open in SQLite.defaultDatabaseDirectory, pass through T015 validation, then transfer to T014 repository.

Blockers: root package-lock.json is absent (CI currently uses npm install); app has no assets directory, synthetic DB fixture, or glossary provider/lifecycle. Do not claim T016 integrated. No real NIKL content.

Files: AI_COLLAB/research/T016_EXPO_ASSET_ADAPTER_PREFLIGHT_20261114.md, AI_COLLAB/INDEX.md, STATE.md, NEXT_TASK.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/CHECKPOINT.md.

Next: settle root lockfile generation as a separate mechanical unit, add exact SDK 58 dependencies, build the tiny synthetic .db asset, implement/test Expo adapter and root lifecycle, then run CI. Native iOS/Android remains NOT RUN until device output exists. No user action.
