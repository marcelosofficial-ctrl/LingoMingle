# STATE
Updated: 2026-11-13
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. Duplicate LingoMingle- is not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React 19.3.0; RN 0.88.1; Reanimated 4.7.1; TS 6.0.3; ESLint 10.14.0.
App: strict TS, Expo Router shell, NativeTabs (Songs, Alphabets, Review, You), system theme tokens, optional GlassEffect guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. SQLite local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002 COMPLETE: CI Run #36 on code SHA a3bdf071f12c7d9992a96a501b5cf90905edd177 passed install/typecheck/lint and 3/3 tests.
T003 COMPLETE: offline-first native keyboard research. iOS Custom Keyboard Extension and Android IME required; gloss display is candidate-panel UX, not guaranteed insertion beneath text. No engine/data adopted.
T004 COMPLETE: Mozc Android JNI engine-only target; iOS source exists but upstream does not officially support iOS build. libhangul includes Romaja mode. Mozc raw dictionary+connection inputs ~92.4 MiB and data asset rights need closure. libhangul LGPL packaging review required. Native builds NOT RUN.
T005 COMPLETE: JMdict English (CC BY-SA 4.0) and NIKL Korean Basic Dictionary (CC BY-SA 2.0 Korea) are preferred gloss candidates; no data imported. NIKL official full dictionary panel currently lists Excel/XML/JSON, last upload 2026-10; exact no-login access UNKNOWN. See T005 research and research recheck.
T006 IMPLEMENTED: typed source/provenance model and deterministic lookup. Repaired language-specific analyzer contracts: Japanese reading/lemma and Korean lemma/POS results must match exact query token; added mismatch and Korean spacing tests. CI Run #42 on code SHA 15bad8b8306d724f3dc5a7098525645335a67942 is pending at npm install; no results yet.
Korean morphology candidate: Kiwi v0.24.1 Apache-2.0; Android AAR 13.86 MB, iOS XCFramework 46.44 MB, base model archive 87.97 MB. Strong prototype candidate, but runtime footprint/Hermes/extension compatibility UNKNOWN; no adoption.
Open gates: finish Run #42; obtain NIKL full snapshot with terms and permitted access; design share-alike packaging/update; Japanese tokenizer exact file/licence closure; Kiwi native/WASM device memory/latency proof; native keyboard builds; libhangul LGPL design; package-lock SPDX audit; C00/C01 source extraction attachment-dependent.
