# CHECKPOINT
Status: IN PROGRESS — recovering T021 CI and validating next gate
Branch: lingomingle-foundation-2026-11-10
Unit 1: Added isolated Katakana recognition-practice engine and screen with deterministic row-scoped prompts, canonical answer/input validation, score and missed-kana summary, missed-only retry, and fresh rounds. The screen remains mounted while hidden so Katakana practice state survives script switching. Fixed stale chart accessibility label so it follows the selected script.
Tests: Added Node coverage for determinism, row-scoped distractors, short Y row, answer checking, progression, invalid inputs, missed-answer deduplication, retry, forged glyph/reading/row/position metadata and boolean flags. CI pending; no test pass claimed.
Research: Official Anki guidance documents review-history-based FSRS optimization and retention/workload trade-offs; no persistence or scheduler added. Open-source kana projects show established separate-script quiz patterns; no code or assets copied.
Next: Verify CI for the T021 implementation commit; fix failures; then close T021 and queue T022. Native device runtime remains NOT RUN.
