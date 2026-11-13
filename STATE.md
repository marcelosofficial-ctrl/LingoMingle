# STATE
Updated: 2026-11-13
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. Duplicate LingoMingle- is not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React 19.3.0; RN 0.88.1; Reanimated 4.7.1; TS 6.0.3; ESLint 10.14.0.
App: strict TS, Expo Router shell, NativeTabs (Songs, Alphabets, Review, You), system theme tokens, optional GlassEffect guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. SQLite local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002 COMPLETE: CI #36 passed install/typecheck/lint and 3/3 tests.
T003 COMPLETE: offline-first native keyboard research; iOS Custom Keyboard Extension + Android IME required. Glosses belong in candidate strip, not guaranteed insertion beneath text.
T004 COMPLETE: Mozc Android JNI engine-only target; iOS source not officially supported upstream. libhangul includes Romaja mode. Mozc raw dictionary+connection inputs ~92.4 MiB; data rights need closure. libhangul LGPL packaging review required. No native builds run.
T005 COMPLETE: JMdict English (CC BY-SA 4.0) + NIKL Korean Basic Dictionary (CC BY-SA 2.0 Korea) preferred gloss candidates; no data imported. NIKL full-dictionary panel lists Excel/XML/JSON, last upload 2026-10; no-login condition UNKNOWN. KANJIDIC2 SKIP excluded pending EDRDG/owner licence conflict clarification, not NC-SA.
T006 COMPLETE: typed provenance/gloss model, Japanese/Korean analyzer contracts, exact surface validation, Korean spacing guard and explicit POS scheme+tag. CI #46 on code SHA f6d38e573cf5ecccd297a91aa0af727b35b472bb passed install/typecheck/lint and 15/15 tests (0 fail/skipped).
T007 COMPLETE (source feasibility only): Kiwi v0.24.1 Apache-2.0; upstream Android AAR, iOS Swift/XCFramework, and WASM builds verified. AAR 13.86 MB, XCFramework zip 46.44 MB, separate model archive 87.97 MB. Expo native Worker unavailable by default; prefer native bindings. No integration/build in LingoMingle; extension RAM/size remains UNKNOWN.
T008 QUEUED: implement/test explicit Kiwi↔NIKL POS crosswalk using synthetic data, preserving unresolved ambiguous tags.
Open gates: permitted NIKL snapshot and licence packaging/update design; Japanese tokenizer exact file/licence closure; Kiwi model memory/latency proof; native keyboard builds; libhangul LGPL distribution design; package-lock SPDX audit; C00/C01 source extraction attachment-dependent.
