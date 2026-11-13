# STATE
Updated: 2026-11-13
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. Duplicate LingoMingle- is not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; Constants 58.0.16; Linking 58.0.17; Status Bar 58.0.5; GlassEffect 58.0.5; React 19.3.0; RN 0.88.1; Reanimated 4.7.1 + Worklets 0.13.0; TS 6.0.3; ESLint 10.14.0; eslint-config-expo 58.0.4; eslint-import-resolver-typescript 4.4.5.
App: strict TS, Expo Router shell, stable NativeTabs (Songs, Alphabets, Review, You), system theme tokens, optional GlassEffect capability guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. SQLite local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002 COMPLETE: CI Run #36 on code SHA a3bdf071f12c7d9992a96a501b5cf90905edd177 passed install, typecheck, lint and tests (3/3 pass, 0 failures/skips).
T003 research: feasibility review recommends offline-first native iOS keyboard extension + Android IME, Japanese Mozc candidate conversion, Korean libhangul composition plus a separate romanization parser, local glosses and explicit language mode. No engines/data adopted. iOS full-access and context limitations are material; see AI_COLLAB/research/KEYBOARD_TRANSLITERATION_FEASIBILITY_20261113.md.
Open gates: Mozc dictionary licensing; Mozc/libhangul native build and iOS extension feasibility; Korean romanization quality; package-lock + transitive SPDX audit; iPhone/Android device smoke test; exact C00/C01 source extraction remains attachment-dependent. No package-lock committed.
