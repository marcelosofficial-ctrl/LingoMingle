

## 2026-11-20 from:chatgpt status:prepared-research-intake
Prepared AI_COLLAB/EXTERNAL_RESEARCH_INTAKE_PROTOCOL_20261120.md for the forthcoming large Grok study. Protocol records exact-path/commit pinning, bounded chunk reads, study-reported vs independently verified evidence tags, primary-source verification limitations, repo reconciliation, and ranked actionable outputs. Grok's study has NOT yet been received/intaken; no future study claims or recommendations are accepted. Added protocol to AI_COLLAB/INDEX.md. Branch commit-listing tool did not provide a reliable branch-scoped latest-five history in this pass; verified canonical branch exists, and project read/write succeeded. T022 remains open; no workflow changes approved or made. No tests run.


## 2026-11-20 from:chatgpt status:prepared-t022-emulator-scope
Prepared `AI_COLLAB/T022_HOSTED_ANDROID_EMULATOR_SMOKE_SCOPE_20261120.md`: maps hosted emulator coverage to T022-01–12 and 14, explicitly excludes risky fault injection from v1, separates emulator evidence from physical device/iOS, and describes a manual-dispatch, bounded, credential-free workflow design. Implementation remains owner-approval gated; no workflow/app changes or tests/builds were made. Branch-specific latest-five commits could not be verified using the commit-search endpoint (it returned default/main history), so this is UNKNOWN rather than guessed.


## 2026-11-20 from:chatgpt status:t023-practice-state-audit
Audited targeted source excerpts: Review tab is a static placeholder; Hiragana/Katakana quiz attempts, progression, scores and retry pools currently live in component state (ephemeral). Prepared `AI_COLLAB/T023_PRACTICE_STATE_AUDIT_20261120.md` with code observations, staged T023 implementation sequence, acceptance criteria, unresolved DB/migration/write-failure decisions, and no scheduler/FSRS integration. No app files changed; no tests/builds run.


## 2026-11-20 from:chatgpt status:t023-sqlite-boundary-audit
Direct source inspection found the Expo glossary provider opens the synthetic bundled content pack with a dedicated SQLite connection; the read-only repository validates app/user schema versions and six tables, then enables/verifies `PRAGMA query_only=ON`. This confirms learner review history must use a separate writable app-owned DB/connection and its own migration lifecycle—not the glossary DB. Updated `AI_COLLAB/T023_PRACTICE_STATE_AUDIT_20261120.md` with VERIFIED findings, INFERRED architecture consequence, and remaining UNKNOWN SDK58 write transaction API/test seam. No code/CI/dependencies changed; tests/builds not run.
