# NEXT_TASK
ID: T018
Goal: Add the first focused hiragana retrieval-practice loop, building on the verified 46-character dataset and the Alphabets learning screen.

Acceptance:
- Let the learner start a short practice round from one basic hiragana row (five characters; the three-character Y row is also valid).
- Present one kana prompt and ask the learner to identify its romaji from a small set of choices; provide immediate correct/incorrect feedback and a clear next-question action.
- Keep question and choice generation deterministic under test, with no duplicate choices and exactly one correct answer.
- Use the canonical dataset as the only kana/romaji source; do not duplicate character records.
- Keep the first loop local and in-memory. No account, network, database writes, SRS scheduling, persisted mastery, audio, handwriting, mnemonics, or paid service.
- Accessible controls, clear selected/feedback states, existing theme tokens, responsive layout, no new runtime dependencies.
- Add Node tests for question construction, answer correctness, distractor uniqueness, row bounds and round progression.
- Run root typecheck, lint and tests in CI. Native iOS/Android runtime remains NOT RUN without device evidence.

Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/CHECKPOINT.md, src/features/kana/**, app/(tabs)/alphabets.tsx, tests/**.
Line budget <=350 changed lines per unit. Commit implementation and overwrite CHECKPOINT.md.
