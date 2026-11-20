# T023 — current practice-state audit and implementation readiness

Date: 2026-11-20
Status: VERIFIED code-path audit; implementation proposal only
Scope: Review-tab placeholder, kana quiz attempt lifecycle, persistence seam. No scheduler or dependency.

## Verified code observations
- `app/(tabs)/review.tsx` currently renders only the Review heading and a static future-queue description. It has no queue, data source, actions or persistence.
- `app/(tabs)/alphabets.tsx` owns Hiragana practice state: selected row, started/completed flags, question index, selected answer, attempts array and retry characters. These are React component state.
- On start, the screen resets question index, answer, attempts and retry pool. Each answered prompt appends a `{character, correct}` attempt to the component-local attempts state. Completion builds a summary (correct/total/missed); retry-only pool and score are in-memory.
- The Katakana practice component independently holds row, start/completion state, index, answer, attempts and retry characters in local React state; it mirrors the same ephemeral lifecycle.
- Existing practice state is discarded when the component/session resets; no durable answer-event record is evident in these inspected code paths.
- This pass inspected targeted excerpts of the current branch source; not a full app audit. These observations do not prove there are no persistence utilities elsewhere.

## T023 sequence refined from code
1. **T023-A — event writer foundation (first implementation candidate):** Add a local append-only review-event table/schema with stable event IDs and explicit schema/content identity. Keep write in one SQLite transaction and idempotent insertion; no scheduler.
2. **T023-B — session boundary:** Integrate a single testable event-write function with the existing quiz answer handler, initially behind an internal seam. Keep UI outcome unchanged; don't store free-text or unnecessary device/session identifiers.
3. **T023-C — correctness/history query:** Read event counts/accuracy/missed item projection from events; make projection reproducible from history. Avoid adding due dates or “Review” queue logic until scheduler choice is separately approved.
4. **T023-D — recovery/acceptance:** test duplicate event retry, interrupted write, ordering/timestamps, pack/version identity, script separation, and rebuild projection. Verify data migration and storage failure UX before enabling persistence in UI.
5. **T023-E — FSRS compatibility spike remains separate:** Node reference and Hermes comparison only after explicit temporary dependency approval. Event schema should not lock into FSRS-specific grades or fields.

## Candidate acceptance criteria (not yet implemented)
- Answer events append once, with stable unique ID across retry.
- Event captures objective quiz correctness; no subjective recall grade inferred from correctness.
- Event identity binds canonical character key and content pack/version used for the prompt.
- Hiragana/Katakana are distinguished and retry/fresh-round semantics do not create phantom events.
- Event projections are deterministic and rebuildable from event rows.
- Duplicate write attempt is safe; DB write failure must not silently advance the UI as if persistence succeeded (UX choice needs explicit design).
- No network, telemetry, sync, user free text, scheduler, dependency, or rights-restricted corpus.

## Open decisions / unknowns
- Exact DB migration mechanism, table names, and transaction shape must be checked against existing SQLite provider/pack schema before writing code.
- Should practice block/hold on a persistence error, or show a recoverable warning while retaining the attempt in memory? Fail-safe default recommendation: don't claim an answer is saved; preserve local pending event and allow retry without duplicate insert, but exact UI must be designed.
- Event timestamps: use device-local clock with UTC-normalized storage; how to test timezone jumps and clock skew without adding platform-specific dependencies remains to define.
- No test/build/device output gathered in this audit.

## Suggested next unit
If owner approves moving beyond T022 documentation-only constraint, implement T023-A only: inspect existing schema/migration and repository seam; add event table + pure event builder/validator + idempotent insert tests. Do not integrate UI or choose/adopt FSRS in same unit. Otherwise keep this proposal and continue T022 acceptance prep.
