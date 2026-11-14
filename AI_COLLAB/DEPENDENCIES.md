# DEPENDENCIES
## Present in app package.json
- Expo SDK 58: expo 58.0.24, expo-router 58.0.31, expo-sqlite 58.0.16, expo-glass-effect 58.0.5, expo-status-bar 58.0.5, expo-constants 58.0.16, expo-linking 58.0.17.
- React Native 0.88.1 / React 19.3.0.
- Reanimated 4.7.1 + Worklets 0.13.0; Gesture Handler 3.3.0; Screens 4.30.1; Safe Area Context 5.11.1.
- TypeScript 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5 (direct pin and npm override), @types/react 19.3.0.
**License status:** Expo framework and Expo Router MIT verified from upstream package/repo metadata; React Native MIT verified. eslint-config-expo MIT verified. eslint-import-resolver-typescript 4.4.5 is ISC per upstream package metadata. Remaining package SPDX metadata and transitive dependency licences must be audited from the resolved package lock before release. No additional library is being copied into the repo.

## Evaluated, not yet adopted
- expo-file-system 58.0.13: MIT; SDK 58 versioned docs recommend ~58.0.13. Candidate T016 direct dependency for File.digest("SHA-256"), File.copy/move and app-private file staging. Not yet added.
- expo-asset 58.0.21: SDK 58 versioned docs recommend ~58.0.21. Candidate T016 direct dependency for Asset.fromModule and bundled SQLite .db fixture. Expo Asset config plugin lists .db as supported. Asset.downloadAsync writes to cache and is temporary only. Not yet added.
- WanaKana 5.3.1: MIT verified. Candidate for kana/romaji conversion only. Do not treat as tokenizer/dictionary or pronunciation evaluator.
- ts-fsrs 6.0.0: MIT; FSRS-7 default; requires Node >=24 and has breaking API changes. Not adopted. Evaluate Hermes compatibility and current v5.4.2 compatibility before selection.
- Kuromoji.js/fork: licence, Hermes compatibility, memory and dictionary size unknown.
- JMdict / JMdict_e: EDRDG CC BY-SA 4.0; commercial redistribution permitted with attribution, share-alike for adaptations, app Sources/About acknowledgement and regular update procedure. Candidate Japanese-English word gloss data; no entries adopted.
- KANJIDIC2: EDRDG CC BY-SA 4.0 for character data. SKIP is NOT CC BY-NC-SA: Jack Halpern's current page states CC BY-SA 4.0 and commercial use with attribution, but EDRDG's general licence page still says commercial apps need prior permission. Exclude SKIP pending written clarification. Character metadata only, not word glosses/tokenization.
- NIKL Korean Basic Dictionary: official site policy says unmarked site materials are CC BY-SA 2.0 KR; commercial text reuse is allowed with attribution/share-alike. Multimedia permissions are individually set. The user-attached 2026-10-19 full JSON archive passed ZIP integrity and all 11 JSON files parsed; raw archive remains outside Git. Production import/distribution HOLD pending qualified rights/platform review. No NIKL data pack or production database has been created.
- Sudachi tokenizer code: Apache-2.0. Current SudachiDict LEGAL says distribution files are Apache-2.0; small_lex includes UniDic material, matrix.def is UniDic under BSD-style notice terms, and core_lex/notcore_lex include NEologd with detailed provenance. Pin exact files and preserve notices. No dictionary adopted.
- Kiwi v0.24.1: Apache-2.0 from v0.24.0. NOTICE covers model archives; training corpora are not redistributed. Android AAR 13.9 MB, iOS XCFramework zip 46.4 MB, separate base model 88 MB. First Korean morphology proof candidate only; no package/model adopted.
- Mozc: BSD-3-Clause applies to code, not automatically dictionaries or dependencies. No engine/data adopted.
- libhangul: LGPL-2.1-or-later; static distribution obligations and extension integration need qualified review. No library adopted.
- librime: BSD-3-Clause core; dependencies need separate audit. No library adopted.
- FusionIME: GPL-3.0. UX reference only; do not copy/link into proprietary app.
Every future adoption records exact version, SPDX licence, purpose, upstream URL, attribution, modifications and review date before import.

## Build-time-only tools
- zip.js 2.25.0, stream-json 3.9.0, stream-chain 4.4.2 are isolated in tools/nikl-importer. They are not app dependencies.
- Node 22.13.1 node:sqlite is used only by the private synthetic pack builder. Keep it out of Expo runtime.

## Lockfile policy gap
- No root package-lock.json is tracked. CI runs npm install, so transitive dependency resolution is not locked. The importer has its own package-lock.json. T016 must resolve and generate the root lockfile mechanically in a dedicated unit; do not hand-author package resolutions.
