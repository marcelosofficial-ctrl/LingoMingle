# STATE
Updated: 2026-11-12
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. Duplicate LingoMingle- is not canonical.
Research: nine shards plus technical and competitor/learning reviews. Exact C00/C01 original wording remains source-attachment-only.
Stack: Expo SDK 58.0.23; Router 58.0.31; SQLite 58.0.16; Constants 58.0.16; GlassEffect 58.0.5; React 19.3.0; RN 0.88.1; Reanimated 4.7.1 + Worklets 0.13.0; TS 6.0.3; ESLint 10.14.0; eslint-config-expo 58.0.4; eslint-import-resolver-typescript 4.4.5.
App: strict TS, Expo Router shell, stable NativeTabs (Songs, Alphabets, Review, You), system theme tokens, optional GlassEffect capability guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. SQLite local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
CI: Run #33 on 7cc6867 passed install, typecheck, lint and 3/3 unit tests. Router/SQLite updated to current SDK58 recommendations in 81f5963; Run #34 failed at npm install because Router 58.0.31 needs Constants >=58.0.16. Constants pin updated to 58.0.16 in eeabf5f; Run #35 in progress. T002 remains open until #35 passes.
Open after T002: package-lock reproducibility + transitive SPDX audit; device smoke test; exact C00/C01 extraction depends on original attachment. No package-lock committed.
