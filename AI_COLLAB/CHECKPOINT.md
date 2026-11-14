# CHECKPOINT

Unit: T016 SDK 58 FileSystem source/type verification COMPLETE. Integration NOT STARTED.

VERIFIED upstream SDK 58 source: expo-file-system 58.0.13, MIT, no runtime dependencies, peers expo/react-native. File accepts URI/File/Directory; digest supports exact "SHA-256"; copy/move accept File|Directory and overwrite defaults false. Wrap File objects to adapt T015's narrower interface. SQLite openDatabaseAsync(name, options?, directory?) ensures path exists; pass SQLite.defaultDatabaseDirectory and call only after T015 hash validation.

Important unresolved point: current NEXT_TASK says add only expo-file-system. Prior preflight suggested direct expo-asset, but that would broaden dependency scope. Resolve Metro asset-to-local-File URI without silently adding another direct dependency, or explicitly amend the task with evidence.

Environment blocker: local shell cannot resolve github.com; npm cannot generate/review a root package-lock. No package, lockfile or runtime code changes were made. Do not hand-author lock metadata.

Latest CI remains #82 SUCCESS on 46d7386 (typecheck/lint, 47 app tests, 10 importer tests). Docs-only commits after that did not trigger CI. Native iOS/Android NOT RUN.

Research: AI_COLLAB/research/T016_EXPO_ASSET_ADAPTER_PREFLIGHT_20261114.md (updated with exact SDK source verification).

Next: generate root lockfile mechanically on Node 22.13.1/npm 10; add exact expo-file-system patch; resolve asset URI path; implement synthetic pack adapter/provider and test. No real NIKL. No user action.
