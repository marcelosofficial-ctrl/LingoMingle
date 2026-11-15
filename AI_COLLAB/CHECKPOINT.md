# CHECKPOINT
Status: DONE — T018
Branch: lingomingle-foundation-2026-11-10
Implementation head: b13b8e1e27d958ae24090b30bf2980b957630d23
Task: deterministic local hiragana recognition-practice loop using canonical 46-character dataset.
Files: src/features/kana/hiraganaPractice.ts; app/(tabs)/alphabets.tsx; tests/hiragana-practice.test.mjs.
Behavior: choose an eligible row (at least three characters); kana prompt; 3–4 romaji choices with one correct answer; immediate feedback; next question and completion; all state in memory.
CI #109 (43701231807): SUCCESS. Root npm install/ci, typecheck, lint, 58 tests passed/0 failed, iOS + Android Metro exports, importer tests (10 passed/0 failed), synthetic pack generation and byte-for-byte rebuild verification.
Earlier CI failures were corrected: Node test runner cannot import .ts directly; test now transpiles actual TypeScript with installed TypeScript package. ESLint requires explicit node:buffer import.
Native iOS/Android builds and Expo Go/device runtime validation NOT RUN. No DB writes, network, SRS, mastery persistence, audio, handwriting, mnemonics, paid services, or real NIKL data.
Next: T019 — in-memory round score, missed-character list, and retry round.
