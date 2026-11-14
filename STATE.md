# STATE
Updated: 2026-11-14
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. Duplicate LingoMingle- is not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React 19.3.0; RN 0.88.1; Reanimated 4.7.1; TS 6.0.3; ESLint 10.14.0.
App: strict TS, Expo Router shell, NativeTabs (Songs, Alphabets, Review, You), system theme tokens, optional GlassEffect guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. SQLite local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002 COMPLETE: CI #36 passed install/typecheck/lint and 3/3 tests.
T003 COMPLETE: offline-first native keyboard research; iOS Custom Keyboard Extension + Android IME required. Glosses belong in candidate strip, not guaranteed insertion beneath text.
T004 COMPLETE: Mozc Android JNI engine-only target; iOS source not officially supported upstream. libhangul includes Romaja mode. Mozc raw dictionary+connection inputs ~92.4 MiB; data rights need closure. libhangul LGPL packaging review required. No native builds run.
T005 COMPLETE: JMdict English (CC BY-SA 4.0) + NIKL Korean Basic Dictionary (CC BY-SA 2.0 KR) preferred gloss candidates; no dataset adopted. KANJIDIC2 SKIP excluded pending licence clarification.
T006 COMPLETE: typed provenance/gloss model, Japanese/Korean analyzer contracts, exact surface validation, Korean spacing guard and explicit POS scheme+tag. CI #46 on code SHA f6d38e5 passed 15/15 tests.
T007 COMPLETE (source feasibility only): Kiwi v0.24.1 Apache-2.0; upstream Android AAR, iOS Swift/XCFramework and WASM verified. No integration/build in LingoMingle; extension RAM/size UNKNOWN.
T008 COMPLETE: versioned Kiwi/NIKL POS crosswalk. Ambiguous VX/copula and non-lexical tags unresolved; NIKL filter codes rejected. CI #51 on code SHA 0cc2274 passed 27/27 tests.
T009 COMPLETE: inspected user-attached NIKL 2026-10-19 JSON ZIP (84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e). ZIP PASS; 11/11 JSON parse; no duplicate object keys. Actual schema/counts in AI_COLLAB/research/NIKL_SNAPSHOT_INSPECTION_20261114.md. 51,555 word entries with unique IDs; 49,869 entries/69,431 senses have complete English coverage. Technical GO for word-only filtered glossary; distribution HOLD pending qualified CC BY-SA 2.0 KR/platform review. No raw data/DB imported.
Model update: GlossSense.englishEquivalent is optional and distinct from englishGloss. Snapshot-observed 품사 없음 remains unresolved. Latest code change is c84267e + tests 7c99faf; CI pending.
Open gates: NIKL share-alike/store review and importer; JMdict packaging; Japanese tokenizer exact file/licence closure; Kiwi model memory/latency; native keyboard builds; libhangul LGPL distribution design; package-lock SPDX audit; C00/C01 source extraction attachment-dependent.
