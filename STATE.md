# STATE
Updated: 2026-11-14
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. LingoMingle- is a duplicate, not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React 19.3.0; RN 0.88.1; Reanimated 4.7.1; TS 6.0.3; ESLint 10.14.0.
Product: hiragana MVP, katakana extension, Hangul starter, Song Study later. Local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002-T008 complete: SDK foundation, keyboard research, gloss/analyzer/POS contracts, Kiwi feasibility and Korean POS crosswalk.
T009-T011 complete: inspected user-attached NIKL snapshot, built normalizer, reviewed parser/tool and CC BY-SA/platform rights. Production import/distribution HOLD.
T012 complete synthetic-only Node ZIP/JSON stream tool; T013 synthetic-only Node SQLite pack builder; T014 read-only Expo SQLite repository; T015 hash-gated staged pack provisioning with schema/column/FK/integrity/query_only validation and concurrent-call serialization.
T016: SDK 58 source verification complete, integration NOT STARTED. Expo FileSystem 58.0.13 is MIT, has no runtime dependencies, supports File.digest("SHA-256"), copy/move/delete and parentDirectory. Wrap File because copy/move accept File|Directory. SQLite openDatabaseAsync accepts explicit SQLite.defaultDatabaseDirectory and ensures path exists. Current NEXT_TASK permits only adding expo-file-system; bundled asset URI resolution remains unresolved without silently adding expo-asset.
Root package-lock.json absent; CI uses npm install. Local shell has no DNS/network to generate/review deterministic npm lock. No package/runtime code changed in T016.
CI #82 on 46d7386 SUCCESS: typecheck/lint, 47/47 app tests, 10/10 importer tests, Node 22.13.1. Later docs commits have no CI. Native iOS/Android NOT RUN.
Hard stop: no real NIKL processing, production pack, app bundle or store distribution. Legal/platform distribution remains HOLD.
Next: mechanically generate root lockfile with Node 22.13.1/npm 10; add exact expo-file-system patch; resolve asset URI; implement adapter/provider and tests; native verification.
