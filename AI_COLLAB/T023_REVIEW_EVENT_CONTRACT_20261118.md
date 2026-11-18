# T023 — Local review-event contract

Date: 2026-11-18
Status: architecture proposal; not implemented.
Scope: define a durable, algorithm-neutral history model for future kana learning. This does not add a scheduler, dependency, sync service, analytics, or user tracking.

## 1. Ranked decisions

1. Persist an immutable answer event before advancing the session. This prevents a crash between feedback and progress update from silently losing a completed answer.
2. Separate correctness from learner recall grade. Existing quiz correctness is an objective answer check; FSRS grades encode subjective recall quality. They are not interchangeable.
3. Keep content identity separate from presentation text. A prompt can change wording, mnemonic, or distractors without changing the underlying kana identity.
4. Keep scheduler state as a rebuildable projection. Event history is the source of truth; scheduler memory and due dates can be recalculated from it.
5. Local-only and data-minimal by default. No account, device fingerprint, cloud sync, free-text answer capture, or analytics event stream is required.

## 2. Canonical event envelope

| Field | Type | Required | Meaning |
|---|---|---:|---|
| event_id | opaque UUID/string | yes | Stable unique ID generated before persistence; used for retry-safe insertion |
| schema_version | integer | yes | Event envelope version, initially 1 |
| item_key | stable string | yes | Canonical content identity, not glyph text |
| content_pack_id | string | yes | Pack identifier used when the item was presented |
| content_pack_version | string | yes | Exact pack version for reproducibility |
| script | enum | yes | hiragana, katakana, or later hangul |
| activity | enum | yes | recognition, recall, writing, or another explicitly defined activity |
| presented_at_ms | integer | yes | UTC Unix epoch milliseconds when prompt became visible |
| answered_at_ms | integer | yes | UTC Unix epoch milliseconds when learner submitted |
| outcome | enum | yes | correct, incorrect, skipped, or revealed |
| response_kind | enum | yes | choice, typed, self_assessed, timeout |
| response_item_key | string/null | no | Selected canonical option when response is a known option; never store arbitrary typed text by default |
| self_grade | enum/null | no | again, hard, good, easy; only when explicitly collected from learner |
| session_id | opaque UUID/string/null | no | Groups a bounded study session without identifying a person |
| sequence_in_session | integer/null | no | Stable order within a session |
| event_origin | enum | yes | user_action, system_timeout, migration |
| created_at_ms | integer | yes | Persistence creation time; distinct from answer time for recovery analysis |

Constraints:
- event_id is the primary key. A retried insert with the same ID must be idempotent; it must not create a second review.
- item_key references stable content identity. It must not be a display label, romanization, glyph, row/column position, or mutable mnemonic.
- presented_at_ms <= answered_at_ms <= created_at_ms for ordinary user submissions. Clock corrections can violate wall-clock monotonicity; preserve raw timestamps and record a clock-anomaly diagnostic rather than rewriting history.
- outcome and self_grade are separate. An incorrect response does not automatically become again; a correct response does not automatically become easy.
- response_item_key may be null for typed answers, skips, reveals and timeouts. Do not persist raw typed input unless a separate explicit product decision justifies it.
- Do not store IP, location, advertising identifiers, contact details, account IDs, device fingerprints, or audio recordings in review events.
- Do not put scheduler outputs in this immutable event envelope.

## 3. Event semantics and lifecycle

A single durable answer event represents one prompt presentation and one terminal learner response. A prompt shown but not answered does not become a completed review. If the app is backgrounded before submission, the prompt can be resumed or discarded without fabricating a grade.

Recommended write sequence:
1. Generate event_id when the answer action is accepted, not on each database retry.
2. Validate prompt/item identity and response against the active prompt definition.
3. Persist the event in a transaction.
4. Update derived session counters/progress projection in the same transaction.
5. Only after commit, show the next prompt or mark the answer as durably recorded.
6. If the UI retries after an uncertain commit, query by event_id; treat an existing matching row as success and reject a conflicting payload for that ID.

Use parameterized SQLite statements. Expo SDK 58 documents async prepared statements and withExclusiveTransactionAsync; all statements in that transaction must use its txn connection. Avoid unrelated concurrent writes on the same connection during a non-exclusive transaction because Expo documents that such queries can join the transaction unexpectedly. Check the exact SDK 58 API before implementation.

## 4. Suggested storage boundary (not SQL migration)

Keep content and learner history logically separate:
- content_items / bundled pack: immutable, versioned, read-only content records.
- review_events: append-only learner answer history.
- review_state: rebuildable per-item projection, not the source of truth.
- scheduler_state: optional algorithm-specific memory, versioned by scheduler/model/config.
- study_sessions: optional local grouping and progress, never a required identity table.

A future schema can enforce:
- PRIMARY KEY(event_id)
- index on (item_key, answered_at_ms)
- index on (session_id, sequence_in_session)
- CHECK(answered_at_ms >= presented_at_ms)
- CHECK(outcome IN (...))
- foreign-key validation against a stable local item-key registry, not a live mutable content row whose deletion would cascade away history.

Do not use ON DELETE CASCADE from content packs into review history. Retired content must remain resolvable through stable key and pack-version metadata. If a content item leaves the active pack, historical events must remain interpretable.

## 5. Derived state and scheduling boundary

review_state may hold counts and latest activity summaries, but every field must be reproducible by replaying events. A scheduler projection must record:
- scheduler package and exact package version, if any;
- algorithm/model version (distinct from package version);
- configuration and parameter version;
- state generation/replay timestamp;
- source history boundary or last processed event ID;
- explicit reset/migration boundary.

Do not mix FSRS state into the core event schema. If a scheduler is adopted later, persist the exact model version and enough source history to replay it. A model upgrade is a migration, not a silent reinterpretation of old state.

## 6. Competitor and open-source findings

### Anki review log
VERIFIED: Anki's official manual describes one log entry per review and exposes review time, card identity, rating, prior/new interval, time spent and review type. It also distinguishes manual rescheduling records from ordinary graded reviews. This validates retaining raw review history and distinguishing manual interventions. LingoMingle should not copy Anki's full internal schema: the initial product does not need ease factors, intervals, learning/relearning states or timer duration.
Source: https://github.com/ankitects/anki/blob/main/docs-site/manual/stats.mdx

### FSRS / ts-fsrs
VERIFIED: ts-fsrs 6.0.0 was published 2026-10-28, introduces FSRS-7 as the default scheduler model, and makes significant breaking API changes. It explicitly requires Node.js >=24. Current LingoMingle CI baseline recorded in STATE is Node 22.13.1, so its existing test runner does not satisfy the package's declared Node engine. The package's MIT licence is permissive with copyright/permission notice retention.
UNKNOWN: React Native/Hermes compatibility for v6, and whether the app can use it without Node-only dependencies. Do not adopt it until a separate real Hermes/native-runtime spike proves it.
Sources: https://open-spaced-repetition.github.io/ts-fsrs/updates/fsrs/6.0.0 ; https://github.com/open-spaced-repetition/ts-fsrs ; https://github.com/open-spaced-repetition/ts-fsrs/blob/main/LICENSE

### Retention and workload
VERIFIED: Anki's current manual says desired retention controls the recall probability targeted at review time; it defaults to 90%, higher retention shortens intervals and increases daily workload, and workload rises sharply near 100%. This is a scheduler configuration trade-off, not a universal LingoMingle target or an empirically validated setting for kana. Do not hard-code 90% as an app-wide learning promise.
Source: https://docs.ankiweb.net/manual/deck-options

### Expo SQLite
VERIFIED: Expo SDK 58 SQLite docs describe persistent local databases, prepared statements with bound parameters, async transactions, and withExclusiveTransactionAsync. The docs warn that unrelated operations on the same connection can unexpectedly join a normal async transaction; the exclusive transaction scopes operations through its supplied transaction connection. This affects future event-insert + progress-update atomicity.
Source: https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/

## 7. Red-team corrections

1. Do not infer grade from quiz correctness. Existing T018/T019/T021 practice flows validate a chosen answer and record correctness/progression in memory; they do not ask learners to rate recall quality. FSRS grades have distinct semantics. The event contract preserves both fields separately.
2. Do not persist only a mutable per-item score. It cannot reconstruct sequence, identify duplicate retries, or support future algorithm changes. Keep append-only event history and derive aggregates.
3. Do not assume ts-fsrs v6 works in Hermes because it is TypeScript. Its declared Node >=24 engine already conflicts with current Node 22 CI; Hermes compatibility and transitive imports are unverified. Keep it as a candidate only.
4. Do not assume Expo async transaction callbacks isolate unrelated queries. SDK 58 docs explicitly warn that other operations on the same connection can join withTransactionAsync; use the exclusive transaction API where supported and keep all writes on txn.
5. Do not erase history when content packs change. Store stable item identity and pack version; avoid cascading deletion of learning history.

## 8. Acceptance tests required before implementation can be called complete

1. Same event ID submitted twice creates exactly one event and one progress increment.
2. Same event ID with different payload fails closed and surfaces a diagnostic.
3. App process killed before transaction commit leaves neither event nor progress projection partially written.
4. App process killed after commit but before next prompt is displayed: reopening shows the event and does not record it again.
5. Incorrect outcome with self_grade null remains null; correct outcome with self_grade null remains null.
6. Skip, reveal and timeout are distinguishable from incorrect answers.
7. Events remain readable after a content pack version changes or an item leaves the active pack.
8. Projection rebuilt from events matches the incremental projection.
9. Timestamps are UTC epoch milliseconds and duration is derived only when both timestamps are valid; implausible clock ordering is not silently clamped.
10. No free-text response, personal identifier, location, or device fingerprint is persisted.
11. Transaction failure rolls back both event and projection changes.
12. Concurrent answer submissions cannot create duplicate events or reorder session sequence silently.
13. Database migration preserves all existing events and can roll back safely on failure.
14. A scheduler replay records package/model/config versions and reproduces deterministic output for a fixed history and fixed clock input.

## 9. Decisions and explicit non-decisions

- DECISION PROPOSAL: adopt an immutable, local-only, idempotent event envelope as the T023 target.
- DECISION PROPOSAL: correctness and subjective recall grade remain distinct fields.
- DECISION PROPOSAL: content pack identity/version is captured per event.
- NOT ADOPTED: FSRS, ts-fsrs, any third-party scheduler, optimizer, model weights or desired-retention default.
- NOT AUTHORIZED: implementation, schema migration, new dependency, telemetry, account/sync feature or change to existing T022 acceptance gates.
- NOT TESTED: documentation only; no app tests were run.

## 10. Next bounded spike

After owner/lead review, test scheduler compatibility in an isolated temporary harness without adding it to the app:
1. Pin Node 24 only in the disposable harness, leaving app Node 22.13.1 CI unchanged.
2. Inspect package exports and transitive imports for Node built-ins, WASM, filesystem, crypto and worker assumptions.
3. Bundle the smallest scheduler-only entry for Hermes using the exact Expo/RN toolchain; do not include optimizer/binding.
4. Run deterministic newCard, preview, review, replay and serialization tests on Hermes in an actual native development build or verified Hermes runtime.
5. Compare results with package test vectors and fixed UTC times.
6. Record bundle size, startup/compute time, memory and failure logs.
7. If any Node-specific API is required, stop and evaluate another maintained implementation or a narrow pure-TypeScript port only after licence and correctness review.

No production dependency is justified until this spike succeeds and the event contract is approved.
