# NEXT_TASK
ID: T012
Goal: Build an isolated, synthetic-only proof of the NIKL streaming importer architecture. Validate bounded ZIP reading, JSON token parsing, the existing record normalizer, deterministic JSONL and safe failure/cleanup. No real NIKL source data or production import.
Context: T009 snapshot inspection and T010 normalizer are complete. T011 recommends an isolated Node 22 build tool using `@zip.js/zip.js` 2.25.0 + `stream-json` 3.9.0, pending exact published-package metadata and synthetic security checks. Store distribution remains HOLD. See AI_COLLAB/research/NIKL_STREAMING_PIPELINE_20261114.md and NIKL_STORE_RIGHTS_REVIEW_20261114.md.
Acceptance:
- Create a separate `tools/nikl-importer` package; do not add ZIP/parser dependencies to app package.json or runtime bundle. Exact-pin versions and record all direct/transitive SPDX licences before install.
- Use invented synthetic JSON and synthetic ZIP fixtures only. Never copy NIKL text, entries, examples, source ZIP or derived records into GitHub.
- Stream one ZIP member and one bounded lexical record at a time. Never buffer a whole JSON member or use whole-entry TextWriter/arrayBuffer/JSON.parse.
- Test expected member whitelist, duplicate/unexpected entries, path traversal, unsupported/encrypted entries, CRC corruption, declared/actual size caps, malformed JSON, duplicate word IDs, incomplete English, cancellation and temp-file cleanup.
- Apply existing `normalizeNiklEntry`; preserve all T010 rejection/fail-closed semantics.
- Produce stable synthetic JSONL + manifest; repeated runs on the same fixture must yield identical content hashes. If SQLite is prototyped, verify integrity/foreign keys and atomic replacement without touching app/user DB.
- Measure Node version, peak RSS, elapsed time and output size on generated synthetic large fixtures; do not extrapolate those measurements as real NIKL performance.
- No real archive processing, production DB, app bundling, data distribution, external upload, account/API key, paid service or spending.
Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, tools/nikl-importer/**, tests/**, AI_COLLAB/research/**.
Line budget <=350 changed lines. Commit the completed unit and overwrite CHECKPOINT.md.
