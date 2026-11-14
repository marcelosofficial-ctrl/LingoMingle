# DEPENDENCIES
## Present in app package.json
- Expo SDK 58: expo 58.0.24, expo-router 58.0.31, expo-sqlite 58.0.16, expo-glass-effect 58.0.5, expo-status-bar 58.0.5, expo-constants 58.0.16, expo-linking 58.0.17.
- React Native 0.88.1 / React 19.3.0.
- Reanimated 4.7.1 + Worklets 0.13.0; Gesture Handler 3.3.0; Screens 4.30.1; Safe Area Context 5.11.1.
- TypeScript 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5 (direct pin and npm override), @types/react 19.3.0.
**License status:** Expo framework and Expo Router MIT verified from upstream package/repo metadata; React Native MIT verified. eslint-config-expo MIT verified. eslint-import-resolver-typescript 4.4.5 is ISC per upstream package metadata. Remaining package SPDX metadata and transitive dependency licences must be audited from the resolved package lock before release. No additional library is being copied into the repo.
## Evaluated, not yet adopted
- WanaKana 5.3.1: MIT verified. Candidate for kana/romaji conversion only. Do not treat as tokenizer/dictionary or pronunciation evaluator.
- ts-fsrs 6.0.0: MIT; FSRS-7 default; requires Node >=24 and has breaking API changes. Not adopted. Evaluate Hermes compatibility and current v5.4.2 compatibility before selection.
- Kuromoji.js/fork: licence, Hermes compatibility, memory and dictionary size unknown.
- JMdict / JMdict_e: EDRDG CC BY-SA 4.0; commercial redistribution permitted with attribution, share-alike for adaptations, app Sources/About acknowledgement and regular update procedure. Candidate Japanese-English word gloss data; no entries adopted.
- KANJIDIC2: EDRDG CC BY-SA 4.0 for character data. SKIP is NOT CC BY-NC-SA: Jack Halpern's current page states CC BY-SA 4.0 and commercial use with attribution, but EDRDG's general licence page still says commercial apps need prior permission. Exclude SKIP pending written clarification of this conflict. Character metadata only, not word glosses/tokenization.
- NIKL Korean Basic Dictionary: official site policy says unmarked site materials are CC BY-SA 2.0 KR; commercial text reuse is allowed with attribution/share-alike. Multimedia permissions are individually set. The user-attached 2026-10-19 full JSON archive (84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e) passed ZIP integrity and all 11 JSON files parsed; raw archive remains outside Git. Actual schema and counts are documented in AI_COLLAB/research/NIKL_SNAPSHOT_INSPECTION_20261114.md. It contains 51,555 word entries with unique IDs; 49,869 have English translations for every sense (69,431 senses). V1 candidate is word-only and complete-translation-only. Fourteen POS labels map; 품사 없음 remains unresolved. Exclude examples, pronunciation/audio, conjugations, multimedia, idioms, phrases, proverbs and grammar expressions. Selected text requires decoding 1,646 HTML entities and trimming/NFC normalization. Technical GO for a compact offline word glossary; NO production import until qualified review confirms CC BY-SA 2.0 KR share-alike/no-additional-restrictions compatibility with App Store/Play Store distribution. No NIKL data pack or production database has been created.
- Sudachi tokenizer code: Apache-2.0. Current SudachiDict LEGAL says distribution files are Apache-2.0; small_lex includes UniDic material, matrix.def is UniDic under BSD-style notice terms, and core_lex/notcore_lex include NEologd with detailed Hatena/postal/station/name/web provenance. Pin exact files and preserve LEGAL/LICENSE notices. Current SudachiDict README warns that v202610 changes binary format to V1, incompatible with older V0 engines. No dictionary adopted.
- KOReader Korean-English Wiktionary-derived dictionary: CC BY-SA 4.0, 37,337 entries / 3.4 MB, but only 44.5% top-10k coverage; small benchmark candidate, not selected.
- Kiwi v0.24.1 (tag commit 724d00718f527bac3f8aef2f6ae3b6523b2aae74, 2026-10-19; upstream main commit 6f7e5b8 observed 2026-11-12): Apache-2.0 from v0.24.0. NOTICE explicitly covers model archives; training corpora (Sejong/NIKL) are not redistributed. Preserve NOTICE and audit components: Eigen MPL-2.0 (EIGEN_MPL2_ONLY), cpuinfo BSD-2-Clause, mimalloc MIT, nlohmann JSON MIT, cpp-btree/streamvbyte Apache-2.0. Release assets: Android AAR 13,858,682 bytes; iOS XCFramework zip 46,441,378 bytes; separate base model archive 87,967,233 bytes. Upstream v0.24.1 release workflow #71 and Swift workflow #46 both succeeded; latest main Ubuntu/Windows/macOS/WASM runs succeeded. Android AAR is arm64-v8a + x86_64, minSdk21; iOS Swift manifest lives under bindings/swift, not repo root; WASM uses Emscripten and sync build() can block JS. Expo native Worker is unavailable by default, so prefer native module/AAR/Swift integration for app and direct native calls in keyboard extensions. First Korean morphology proof candidate only; no package/model adopted. Runtime memory, Hermes integration, keyboard-extension compatibility remain unverified.
- JMdict/KANJIDIC2/KanjiVG: CC BY-SA-family candidates; attribution/share-alike obligations need review.
- Tatoeba licences vary per record; never assume one licence for all.
- KanaDojo AGPL-3.0, Kanji Dojo GPL-3.0-or-later, Nihonoari GPL-3.0 and KanaSRS source-available: reference only; no code/assets adopted.
Every future adoption records exact version, SPDX licence, purpose, upstream URL, attribution, modifications and review date before import.
## SDK 58 patch alignment (2026-11-12)
- Updated `expo-router` to 58.0.31 and `expo-sqlite` to 58.0.16 after checking the SDK 58 versioned Expo docs. These are exact package pins, not ranges. The docs now recommend `~58.0.31` and `~58.0.16` respectively; the chosen exact pins resolve to those recommended patch releases.
- Run #36 verified the updated Router/SQLite/Constants/Linking/Expo patch set; see the checkpoint for exact quality-step evidence.

- Router 58.0.31 requires `expo-constants ^58.0.16`; updated the exact pin to 58.0.16 after Run #34 exposed an npm peer conflict against 58.0.15. Expo 58.0.24 accepts the 58.0.16 within its `~58.0.15` range. Run #35 must verify the resolved tree.

- Router 58.0.31 also requires `expo-linking ^58.0.17`; aligned Expo, Linking and Status Bar to 58.0.24, 58.0.17 and 58.0.5 respectively, matching the SDK 58 template dependency set. Run #36 verifies the complete set.

## Keyboard engine candidates (evaluated, not adopted; 2026-11-13)
- Mozc: BSD-3-Clause applies to Mozc-authored code, not automatically to dictionaries or third-party dependencies. Its OSS dictionary README identifies IPAdic/ICOT notices and Okinawa Dictionary public-domain terms. Its generated dataset also includes the external Japanese Usage Dictionary and manual domain vocabulary; not every asset has been cleared. No engine/data adopted. Android has a JNI shared-library target for four ABIs; iOS engine source exists but upstream explicitly says iOS builds are not officially supported. See AI_COLLAB/research/KEYBOARD_ENGINE_SOURCE_BUILD_SPIKE_20261113.md.
- Mozc build dependencies: Bazel/Bazelisk, Android NDK r29, Abseil, protobuf and target-specific modules. The current `src` tree does not contain the referenced `src/third_party` directory; external Bazel modules and their resolved licences require target-level SPDX audit.
- libhangul: LGPL-2.1-or-later. Exposes preedit/commit/backspace composition and a built-in Romaja keyboard mode (`ro`). Static distribution requires application object/relink materials; dynamic distribution still requires library source/notices and a compliant replaceability mechanism. iOS signing/App Store implications need qualified review. No library adopted.
- librime: BSD-3-Clause core; runtime dependencies require separate SPDX review. Considered broad/heavy for first MVP.
- Fcitx5 Android: LGPL-2.1 framework reference; bundled plugins/engines have separate licences. Study integration, do not import wholesale.
- FusionIME: GPL-3.0. UX/integration reference only; do not copy/link into proprietary app.
No keyboard engine, dictionary or dataset has been adopted or bundled. Native builds/device tests are NOT RUN; see T004 source/build spike for exact evidence and remaining gates.

## NIKL build-time prototype dependencies (tool-only, not app runtime; 2026-11-14)
- `@zip.js/zip.js` 2.25.0: BSD-3-Clause; exact upstream tag manifest confirms Node >=18 and zero runtime dependencies. CRC-32 verification is opt-in and enabled in the prototype.
- `stream-json` 3.9.0: BSD-3-Clause, ESM, no explicit engines field; its one runtime dependency is `stream-chain` 4.4.2.
- `stream-chain` 4.4.2: BSD-3-Clause, zero runtime dependencies.
- Exact pins are isolated in `tools/nikl-importer/package.json` and package-lock.json. CI #67 verified the synthetic-only package on Node 22.13.1 (35/35 app tests and 7/7 importer tests). None is present in app package.json or the Expo runtime.
- Security boundary: upstream stream-json says it is not designed for hostile JSON. The importer requires fixture-NN.json names and must not process the actual NIKL archive. See AI_COLLAB/research/NIKL_STREAMING_SPIKE_20261114.md.
- Alternatives evaluated but not adopted: `yauzl` 3.4.0 (MIT; Node >=12; `pend` 1.2.0 MIT) and `fflate` 0.8.3 (MIT). Neither supplies the same explicit CRC-32 read verification path used by this prototype.


## T013 SQLite pack engine (private build-tool only; 2026-11-14)
- Selected built-in Node 22.13.1 node:sqlite / DatabaseSync. No npm package, native addon or WASM dependency. Node's SQLite module is Stability 1.1 (Active development), unflagged since 22.13.0; keep it isolated to the pinned build tool and re-test before any Node upgrade. Node 22.13.1 embeds SQLite 3.47.2.
- better-sqlite3 13.1.1: MIT, Node >=22, native Node-API addon and node-addon-api ^8.0.0 (MIT), platform prebuilds/native-build fallback. Issue #1516 documents clean-install node-gyp/Python failure for 13.0.3; 13.1.1 clean Windows install was not independently verified, so it remains unselected.
- sql.js 1.16.0: MIT, zero runtime npm dependencies, Emscripten/WebAssembly, in-memory database and full typed-array export. This creates a database-sized memory copy at export; not selected for the file-backed builder.
- CI #72 on 9041890 verified Node 22.13.1 / SQLite 3.47.2 and 10/10 isolated importer tests. No SQLite dependency or pack-builder code is added to app package.json. See NIKL_SQLITE_PACK_SPIKE_20261114.md.
- No real NIKL data or production database generated; store distribution remains HOLD pending qualified legal review.
