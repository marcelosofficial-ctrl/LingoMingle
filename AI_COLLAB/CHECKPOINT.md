# CHECKPOINT
Status: DONE — T019 implementation pass; CI acceptance pending
Branch: lingomingle-foundation-2026-11-10
Implementation commit: a9c91e7deb4c1d229a6d42c4e68238342dc553ee
Changes: deterministic in-memory round score; unique missed-kana summary in attempt order; retry pool restricted to missed characters; perfect rounds start a fresh full-row round. Existing canonical HIRAGANA records and question logic reused. UI displays score, missed kana with canonical romaji, and accessible retry/fresh-round controls.
Tests added: score totals; missed ordering and uniqueness; single/multiple missed retry; perfect-round fresh selection; retry question correctness. Existing practice tests retained.
CI #110 (43776049306) was IN_PROGRESS at checkpoint; typecheck, lint, tests, Metro exports and importer checks are NOT YET VERIFIED. Do not mark T019 accepted until CI succeeds.
Native iOS/Android builds and device runtime validation NOT RUN. No persistence, network, SRS, mastery, audio, handwriting, mnemonics, new dependencies, or paid services.
Next: verify CI #110. If it fails, inspect job logs, fix, and rerun. After success, update STATE.md and NEXT_TASK.md to close T019 and queue the next task.
