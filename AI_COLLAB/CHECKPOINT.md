# CHECKPOINT
Status: DONE — T017
Branch: lingomingle-foundation-2026-11-10
Implementation head: 09cb370bc926135c7302057fd9ec1bef792c0435
Task: canonical 46-character basic hiragana dataset, accessible responsive selection grid, character detail panel, and regression tests.
Files: src/features/kana/hiragana.ts; app/(tabs)/alphabets.tsx; tests/hiragana.test.mjs.
Commits: bee65d1 dataset; cc498a0 tests; b5db6c7 grid; 09cb370 TypeScript fallback fix.
CI #103 (43699655234): SUCCESS. Root npm ci, typecheck, lint, app tests, iOS/Android Metro exports, importer install/tests, synthetic pack build and reproducibility all succeeded.
T017 acceptance met. Native iOS/Android builds and Expo Go/device runtime validation NOT RUN. No audio, handwriting, mnemonics, DB changes, external data, paid services or Song Study changes.
Next: T018 — local-only hiragana recognition practice loop with immediate feedback; no SRS or persisted mastery.
