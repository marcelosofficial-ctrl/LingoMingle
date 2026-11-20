## 2026-11-20 from:chatgpt status:prepared-research-intake

Prepared AI_COLLAB/EXTERNAL_RESEARCH_INTAKE_PROTOCOL_20261120.md for the forthcoming large Grok study. Protocol records exact-path/commit pinning, bounded chunk reads, study-reported vs independently verified evidence tags, primary-source verification limitations, repo reconciliation, and ranked actionable outputs. Grok's study has NOT yet been received/intaken; no future study claims or recommendations are accepted. Added protocol to AI_COLLAB/INDEX.md. Branch commit-listing tool did not provide a reliable branch-scoped latest-five history in this pass; verified canonical branch exists, and project read/write succeeded. T022 remains open; no workflow changes approved or made. No tests run.

## 2026-11-20 from:chatgpt status:prepared-t022-emulator-scope

Prepared AI_COLLAB/T022_HOSTED_ANDROID_EMULATOR_SMOKE_SCOPE_20261120.md: maps hosted emulator coverage to T022-01–12 and 14, explicitly excludes risky fault injection from v1, separates emulator evidence from physical device/iOS, and describes a manual-dispatch, bounded, credential-free workflow design. Implementation remains owner-approval gated; no workflow/app changes or tests/builds were made. Branch-specific latest-five commits could not be verified using the commit-search endpoint (it returned default/main history), so this is UNKNOWN rather than guessed.

## 2026-11-20 from:chatgpt status:t023-practice-state-audit

Audited targeted source excerpts: Review tab is a static placeholder; Hiragana/Katakana quiz attempts, progression, scores and retry pools currently live in component state (ephemeral). Prepared AI_COLLAB/T023_PRACTICE_STATE_AUDIT_20261120.md with code observations, staged T023 implementation sequence, acceptance criteria, unresolved DB/migration/write-failure decisions, and no scheduler/FSRS integration. No app files changed; no tests/builds run.

## 2026-11-20 from:chatgpt status:t023-sqlite-boundary-audit

Direct source inspection found the Expo glossary provider opens the synthetic bundled content pack with a dedicated SQLite connection; the read-only repository validates app/user schema versions and six tables, then enables/verifies PRAGMA query_only=ON. This confirms learner review history must use a separate writable app-owned DB/connection and its own migration lifecycle—not the glossary DB. Updated AI_COLLAB/T023_PRACTICE_STATE_AUDIT_20261120.md with VERIFIED findings, INFERRED architecture consequence, and remaining UNKNOWN SDK58 write transaction API/test seam. No code/CI/dependencies changed; tests/builds not run.

## 2026-11-20 from:chatgpt status:t023-answer-handler-identity-audit

Targeted source inspection verified Hiragana answer choice callback currently updates selected answer and appends an in-memory {character, correct} attempt, with no persistence await. Row/session resets clear ephemeral attempt state. Added T023 notes recommending immutable event snapshots, session ID at session start, event ID at answer acceptance, async persistence ordering tests with a fake writer, and correcting kana content identity: kana are static code datasets, so events should identify kana dataset revision + script + canonical character key, not require glossary-pack ID. Full Katakana UI callback details remain UNKNOWN (file endpoint failure). No implementation/tests/builds.

## 2026-11-20 from:chatgpt status:t023-sdk58-write-boundary

Verified the versioned Expo SDK 58 SQLite API family: openDatabaseAsync, parameterized runAsync, withTransactionAsync commit/rollback, and native withExclusiveTransactionAsync using a separate txn connection (not web). Documented the same-connection ambient transaction hazard and separate-connection/PRAGMA caveat. Recommended a dedicated app-owned DB + serialized repository owner; single event INSERT needs no explicit transaction, while migration DDL + user_version belong in one awaited transaction. UNKNOWN: project state pins expo-sqlite 58.0.16, while SDK58 docs currently recommend ~58.0.18; exact installed 58.0.16 typings/runtime behavior still needs verification before implementation. Added test/acceptance implications to the T023 audit. No app code, dependencies, workflows, tests or builds changed. Sources: https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/ ; https://github.com/expo/expo/blob/main/packages/expo-sqlite/CHANGELOG.md .

## 2026-11-20 from:chatgpt status:t023-exact-lock-resolution

Exact package pin verified in both package.json and package-lock.json: expo-sqlite 58.0.16; lock resolves npm tarball and records SHA512 integrity. Changelog currently publicly lists SQLite SDK58 versions through 58.0.14, but that absence is only a release-note gap—not evidence the 58.0.16 package is invalid. Registry metadata fetch inaccessible; package source/types and native API details remain UNKNOWN. Added evidence/next verification route to T023 audit. Branch latest five commits fetched successfully (latest checkpoint start and previous four T023 audit passes). No code/tests/build/dependency changes.
