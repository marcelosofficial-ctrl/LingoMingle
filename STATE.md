# STATE
Updated: 2026-11-12
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private.
Canonical repo selected by user: exact name LingoMingle. Duplicate LingoMingle- exists; it is not canonical and must not receive further work.
Research: nine source shards plus TECH_RESEARCH_20261111.md and COMPETITOR_AND_LEARNING_REVIEW_20261111.md. Original source attachments remain authoritative for exact C00/C01 wording.
Stack pinned: Expo SDK 58; Expo 58.0.23, Router 58.0.30, SQLite 58.0.15, GlassEffect 58.0.5, constants 58.0.15, linking 58.0.16; React 19.3.0, React Native 0.88.1; Reanimated 4.7.1. Exact pins in package.json. TypeScript 6.0.3; ESLint 10.14.0 with eslint-config-expo 58.0.4.
App shell: strict TypeScript, Expo Router stable NativeTabs (Songs, Alphabets, Review, You), light/dark system-aware theme tokens, optional GlassEffect runtime guard.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later.
Data: SQLite local-first; no mandatory account/server; export/restore before cloud sync.
Legal: G1 blocks online copyrighted lyric lookup. Use BYO/original/PD/cleared content.
Cost: no spending approved. PWA/APK are no-store-fee paths; official store distribution has fees.
CI: Run 31 (5e194d7) passed npm install/typecheck, failed lint due eslint-plugin-react 7.37.x calling removed context.getFilename(); tests skipped. Added explicit React version setting in eslint.config.js; Run 32 on 5036e0f is pending. Run 26 install/typecheck passed but lint failed on earlier config shape and was fixed. No package-lock committed; reproducible npm ci remains an open gap.
