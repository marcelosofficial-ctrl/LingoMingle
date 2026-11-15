# STATE
Updated: 2026-11-15
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; canonical repo (not LingoMingle-).
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React/React DOM 19.3.0; RN 0.88.1; TS 6.0.3.
Product: Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. Local-first. G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002-T008: SDK foundation, keyboard research, gloss/analyzer/POS contracts, Kiwi feasibility, Korean POS crosswalk. T009-T011: user-attached NIKL snapshot inspection, normalizer, parser/tool and CC BY-SA/platform rights review; production import/distribution HOLD.
T012-T015 complete: synthetic-only ZIP/JSON importer; synthetic SQLite builder; read-only Expo repository; hash-gated staging/provisioning. T015 red-team fix preserves a different valid schema-v1 pack and fails closed on conflict (20c60ef, cbb1226).
T016 DONE (code + CI; native runtime NOT RUN):
- Direct Expo Asset 58.0.21, FileSystem 58.0.13 and React DOM 19.3.0 pins; root package-lock generated/committed by CI (7e70d57).
- Synthetic-only app pack generator at tools/nikl-importer/scripts/build-synthetic-app-pack.mjs; committed DB + stable manifest at assets/glossary-synthetic-v1.db and assets/glossary-synthetic-v1.manifest.json (asset commit bc620031).
- DB 86,016 bytes; SQLite 3.47.2; schema v1; app ID 1280132940; counts 1 source / 1 entry / 1 surface / 1 sense; SHA-256 a7730a6bad8a1d3942f50b539931dbb9f4f01fc069721df39f661e2ccbd0affe. Independent SQLite verification: integrity_check ok; FK check empty; version and row counts match.
- metro.config.js registers .db; GlossaryProvider pins measured digest; app/_layout.tsx mounts provider.
- CI #99 (43686868728) SUCCESS: root npm ci, typecheck, lint, app tests, iOS and Android Metro exports, importer npm ci/tests, synthetic pack generation, and byte-for-byte repeat-build check of DB + manifest.
T017 DONE:
- Dependency-free typed 46-character basic hiragana dataset in src/features/kana/hiragana.ts, conventional gojūon order, stable IDs, Hepburn readings, row/column metadata; documents を=wo and ん=n.
- Alphabets tab now has accessible responsive selectable character grid and live detail panel, initially あ; uses existing theme tokens.
- tests/hiragana.test.mjs covers count, uniqueness, row order/sizes/metadata, key spellings and initial selection.
- CI #103 (43699655234) SUCCESS: root npm ci, typecheck, lint, tests, iOS/Android Metro exports, importer tests, synthetic pack generation and repeat-build reproducibility.
Native iOS/Android builds and Expo Go/device runtime validation NOT RUN. No real NIKL data, production pack, external upload, paid service, or store distribution. Legal/platform distribution remains HOLD.
Next: T018 — build a small local-only hiragana recognition practice loop using the tested dataset, with immediate feedback and no SRS/persisted mastery in the first iteration.
