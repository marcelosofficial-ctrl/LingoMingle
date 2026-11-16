# CHECKPOINT
Status: IN PROGRESS — new full-work pass; recovery check underway
Branch: lingomingle-foundation-2026-11-10
Implementation: fb07fc800ebaed2e2b245f98155a7df3b65bdd8c adds 46 basic Katakana records, parity/exclusion tests, and accessible script switch preserving selected row/column. Hiragana practice remains intact and is not exposed for Katakana.
Verification: CI #114 (43841900879) SUCCESS on the implementation commit. Typecheck, lint, root tests, iOS/Android Metro exports, importer tests, and synthetic-pack reproducibility all completed successfully.
Research: Japan Agency for Cultural Affairs beginner guide lists basic Katakana and separately identifies voiced and combined forms. Source uses ヲ=o; project convention wo retained to match Hiragana を. No third-party artwork copied.
Ledger: STATE.md records T020 DONE and CI #114. NEXT_TASK.md now queues T021 with acceptance criteria for isolated Katakana recognition practice.
Next: T021 — Katakana recognition practice. Native iOS/Android device runtime remains NOT RUN.
