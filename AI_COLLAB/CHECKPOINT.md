**CHECKPOINT STATUS: DONE** — pass closed (2026-11-20).

## Recovery and branch history
- Re-read root `BOOT.md` on main, branch `AI_COLLAB/BOOT.md`, `STATE.md`, `NEXT_TASK.md`, `INBOX_chatgpt.md`, and this checkpoint.
- Canonical branch verified: `lingomingle-foundation-2026-11-10`.
- Branch-scoped REST latest-five at pass start: `759490b51f41` (pass start), `56a5df20661a` (prior close), `2e706bc2834d` (answer-handler audit), `847d84d4d851` (identity clarification), `42af6ec793dd` (prior checkpoint start). No uncommitted state inferred.

## Work completed
- **VERIFIED:** Versioned Expo SDK 58 SQLite docs describe `openDatabaseAsync`, parameterized `runAsync`, transactional commit/rollback via `withTransactionAsync`, and native `withExclusiveTransactionAsync` using a separate `txn` connection (not web).
- **VERIFIED:** `withTransactionAsync` can include unrelated concurrent queries on the same connection; exclusive transactions isolate callback queries but use a separate connection, so PRAGMA/connection settings cannot be assumed to transfer.
- **INFERRED:** Single learner-answer event INSERT can be one atomic parameterized statement with a unique event ID; explicit transaction reserved for multi-statement migration/atomic projections. Use a dedicated app-owned DB and serialized repository owner, never the read-only glossary connection.
- **UNKNOWN:** project STATE pins expo-sqlite 58.0.16 while SDK58 docs currently recommend ~58.0.18. Exact installed patch typings/native behavior not checked; verify before implementation.
- Updated `AI_COLLAB/T023_PRACTICE_STATE_AUDIT_20261120.md` and `INBOX_chatgpt.md` with API findings, hazards, migration strategy, test matrix and source URLs.
- No app code, dependencies, workflows, tests, builds or device checks changed. T022 remains open; Grok study remains NOT RECEIVED.

## Commits
- Start checkpoint: `759490b51f418f4f155434dee7a79569a1fa9cf1`
- T023 SDK58 audit: `31b0f9475f87e6e371b9bb918bf6c9c457715aa5`
- Inbox: `890b691aead684e13ecf25fa2bc517392722a75c`
- Close checkpoint follows as final action.
