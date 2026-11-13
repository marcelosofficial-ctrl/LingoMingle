# CHECKPOINT
Unit: T006 acceptance repair, explicit analyzer boundary and Korean spacing cases.
Status: CODE UPDATED; awaiting fresh CI.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Commit: 15bad8b8306d724f3dc5a7098525645335a67942.
Changed: `src/features/glossary/types.ts`, `matching.mjs`, `matching.d.mts`, `tests/glossary.test.mjs`.
Repair: replace loose optional top-level lemma/reading/POS fields with discriminated Japanese/Korean analyzer result contracts. Analyzer surface must match the exact queried token after NFKC + edge trimming before lemma/reading matching can run. Exact dictionary surface matching remains possible without morphology. Internal Korean whitespace is deliberately significant; only edge whitespace is trimmed. Added mismatched Japanese/Korean analyzer-input guards and Korean edge/internal-spacing tests.
T006 tests now have 11 glossary cases; CI also runs 3 existing theme/navigation/glass tests, for 14 total expected. This count is expected from current source, not yet CI-verified.
T004/T005 evidence shards remain indexed in AI_COLLAB/INDEX.md.
Next: inspect fresh CI for commit 15bad8b; if typecheck/lint/test pass, complete research recheck shard, update dependency/decision/next task/state, then checkpoint.
