# STATE
Updated: 2026-11-12
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. Duplicate LingoMingle- is not canonical.
Research: nine shards plus technical and competitor/learning reviews. Exact C00/C01 original wording remains source-attachment-only.
Stack: Expo SDK 58 (Expo 58.0.23, Router 58.0.30, SQLite 58.0.15, GlassEffect 58.0.5), React 19.3.0, RN 0.88.1, Reanimated 4.7.1, TS 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5 override.
App: strict TS, stable NativeTabs (Songs, Alphabets, Review, You), system theme tokens, optional GlassEffect capability guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. SQLite local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
CI: Run 31 passed install/typecheck, failed lint on React plugin API. Run 32 after explicit React version passed install/typecheck, failed lint on TypeScript import resolver interface and expo-router/native-tabs resolution; tests skipped. Resolver 4.4.5 direct pin + npm override committed; new CI must verify. No package-lock; npm ci reproducibility open.
