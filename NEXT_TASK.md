# NEXT_TASK
ID: T019
Goal: Make the local hiragana practice loop more useful by showing a clear session result and allowing targeted retry of missed characters.

Acceptance:
- Track correct and incorrect answers only for the current in-memory round.
- At round completion, show score (correct / total) and a concise list of missed kana with their canonical romaji.
- Offer a retry round containing only missed characters; if none were missed, offer a fresh round instead.
- Reuse canonical HIRAGANA records and the existing question/answer logic; do not duplicate kana records.
- Keep result data in memory only. No account, network, database writes, SRS scheduling, persisted mastery, audio, handwriting, mnemonics, or paid service.
- Deterministic helper functions and Node tests for score calculation, missed-character ordering/uniqueness, retry selection, and perfect-round behavior.
- Accessible feedback and controls, existing theme tokens, responsive layout, no new runtime dependencies.
- Run root typecheck, lint and tests in CI. Native iOS/Android runtime remains NOT RUN without device evidence.

Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/CHECKPOINT.md, src/features/kana/**, app/(tabs)/alphabets.tsx, tests/**.
Line budget <=350 changed lines per unit. Commit implementation and overwrite CHECKPOINT.md.
