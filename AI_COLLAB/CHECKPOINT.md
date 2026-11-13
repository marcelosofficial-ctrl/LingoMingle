# CHECKPOINT
Unit: T006 analyzer contract and Korean spacing red-team repair.
Status: PATCHED after CI exposed a real defect; fresh CI pending.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Code commits: analyzer contract 15bad8b8306d724f3dc5a7098525645335a67942; Korean token whitespace guard 7c5b5c89f1ac01c8d186c111538d2326a35564af.
Run #42 (43400504631) on 15bad8b failed only npm test: 13/14 pass, one expected test showed that Korean lemma/POS matching accepted an analysis whose token surface contained internal whitespace. Typecheck and lint succeeded. Guard added so morphology matching refuses multi-token surfaces; exact dictionary phrase matches remain available. New CI must prove the fix.
Research: AI_COLLAB/research/KEYBOARD_GLOSS_RESEARCH_RECHECK_20261113.md. It corrects earlier NIKL export uncertainty and Sudachi licence generalization, and identifies Kiwi v0.24.1 as the strongest Korean analyzer proof candidate.
Files updated in this work unit: AI_COLLAB/INDEX.md, AI_COLLAB/DEPENDENCIES.md, STATE.md and research recheck shard. No dependencies/data adopted.
Next: inspect CI on 7c5b5c8; if green, close T006, set T007 Kiwi feasibility spike, refresh STATE and CHECKPOINT.
