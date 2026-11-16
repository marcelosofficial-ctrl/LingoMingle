# STATE
Updated: 2026-11-16
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; canonical repo (not LingoMingle-).
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React/RN 19.3.0/0.88.1; TypeScript 6.0.3.
Product: local-first. Japanese hiragana MVP, katakana extension, Hangul starter, Song Study later. G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002–T011: SDK/keyboard/NLP research; NIKL snapshot, normalizer, streaming importer and rights review. Real-corpus production import/distribution HOLD pending corpus-specific authorization.
T012–T015 DONE: synthetic-only importer/SQLite builder, read-only Expo repository, hash-gated staging/provisioning; T015 conflict fix fails closed and preserves other valid schema-v1 packs.
T016 DONE: SDK 58 asset/filesystem pins, synthetic SQLite app pack and manifest, Metro DB registration and glossary provider. CI #99 SUCCESS; synthetic DB integrity/FK checks and repeat-build reproducibility verified.
T017 DONE: typed 46-character Hiragana dataset and accessible chart/detail view. CI #103 SUCCESS.
T018 DONE: deterministic row-scoped quiz with same-row distractors, feedback and in-memory progression. CI #109 SUCCESS (58 root tests; 10 importer tests; typecheck/lint/iOS+Android Metro exports/reproducibility).
T019 DONE: in-memory score, missed-kana summary with canonical readings, retry-only prompt pool and fresh round on perfect result. Red-team fixes validate canonical glyph/readings/row/position and boolean results. CI #112 (43840445604) SUCCESS on cc8a04d: typecheck, lint, root tests, iOS/Android Metro exports, importer tests and synthetic pack reproducibility.
Release gates: native iOS/Android builds and device runtime NOT RUN. NIKL real-data use/distribution HOLD. No store submission, accounts or paid build services approved.
Next: T020 — add the 46 basic Katakana records and a switchable accessible script chart; preserve Hiragana practice.
