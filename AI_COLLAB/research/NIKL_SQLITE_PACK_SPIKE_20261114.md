# T013 SQLite pack builder spike (2026-11-14)

## Scope and app-layer inspection

Synthetic fixtures only. No real NIKL records, archive, translations, production database, app database or store bundle were used.

The app has no SQLite schema, migration files, glossary repository/query adapter or calls to expo-sqlite. Expo SQLite 58.0.16 is pinned in the app package but not yet used. The authoritative type contract is src/features/glossary/types.ts: GlossSource, GlossEntry and GlossSense, including POS namespace/source metadata, reading, learner level, numeric frequency rank/priority, surface forms, senses, English equivalent/definition, sense labels and domain labels. Existing query behavior is src/features/glossary/matching.mjs: NFKC, trim, lowercase; exact surface; Japanese reading/lemma analysis; Korean lemma plus exact POS namespace; stable priority then ID order.

## SQLite implementation

tools/nikl-importer/src/sqlite-pack.mjs is isolated from Expo runtime and accepts only T012 deterministic JSONL plus a synthetic-only manifest whose members are explicitly named fixture-NN.json. It validates input hashes, bounded sizes, source metadata and every normalized entry. Existing output paths, including dangling symlinks, are refused.

Schema v1 uses STRICT source, entry, surface-form, sense, sense-label and domain-label tables. Primary/unique/check constraints and foreign keys preserve the TypeScript contract. Original and normalized lookup keys are stored separately; normalized keys use the same NFKC/trim/lowercase rule as the in-memory matcher. Surface, lemma/POS, reading and source indexes are created after bulk insertion. Inserts run in one IMMEDIATE transaction with foreign keys enabled. The reader now checks per-record byte limits while assembling each line, uses fatal UTF-8 decoding and passes AbortSignal to the file stream. It does not wait until readline has already assembled an oversized line.

The builder writes to a temporary sibling directory, checks integrity, foreign keys, schema/application IDs, uniqueness, actual DB row counts and representative lookup ordering, hashes the DB and manifest, closes SQLite, then renames the completed directory on the same filesystem. Failure/cancellation rolls back and removes temporary output. A regression verifies duplicate surface candidates resolve by priority then ID, not by assuming the first JSONL row wins.

## Build engine comparison

| Option | Exact version / licence | Runtime/build properties | Decision |
|---|---|---|---|
| Node node:sqlite | Built into Node 22.13.1; no npm package/SPDX dependency | DatabaseSync, native SQLite bundled with Node, synchronous API. Unflagged from 22.13.0 but remains experimental, Stability 1.1 Active development. CI proves the selected Node runner works; no native addon compilation or WASM copy step. | **Selected** for private build-time tooling only. Not app runtime or public API. |
| better-sqlite3 | 13.1.1, MIT | Node >=22; native Node-API addon, node-addon-api dependency, platform prebuilds with native build-tool fallback. Native compiler/node-gyp and platform matrix add CI friction. | Evaluated, not adopted. |
| sql.js | 1.16.0, MIT | Zero runtime npm dependencies; SQLite compiled to WebAssembly with Emscripten. DB is in-memory and exported as a complete typed array, so peak memory includes the DB and exported copy. | Evaluated, not adopted. |

Node 22.13.0 removed the --experimental-sqlite flag requirement, but the API remains experimental. Current Node 22 documentation labels it Stability 1.1, Active development. The experimental warning is visible in CI. This is acceptable for a private reproducible pack builder, not an app-runtime dependency.

## Verification and CI history

- CI #69 on e481b5c: app typecheck/lint passed, app tests 35/35, importer tests 10/10.
- CI #70 on d0d4537: app typecheck/lint passed, app tests 35/35, importer tests 10/10. It verified normalized lookup columns and indexes.
- CI #71 on cc1e441: app quality checks and app tests passed; importer tests 9/10. The failure was a test SQL typo querying id from glossary_surface_form, whose key is entry_id. The production builder had created the synthetic DB and emitted metrics before this test assertion. Commit 9041890 corrects the assertion and adds bounded UTF-8 line reading, actual table row-count checks, cancellation-aware streaming and duplicate-surface priority ordering. CI #72 on 9041890: app typecheck/lint passed, app tests 35/35, importer tests 10/10.

The test suite covers deterministic repeated builds, normalized fields/indexes, SQLite integrity and foreign-key checks, schema/application IDs, row counts, lookup mapping/order, malformed/oversized JSONL, duplicate entry/sense IDs, SQL constraint rollback, cancellation, temporary cleanup and existing-output refusal.

CI #72's two-entry fixture emitted an 86,016-byte SQLite file in 460.94 ms with 76,368 KiB process peak RSS. This is a diagnostic micro-fixture, not a scale benchmark or a projection of the full source pack.

## Limits and release gates

- This is a synthetic-only build tool, not actual NIKL import approval. T012 stream-json is explicitly not designed for hostile JSON; the actual archive remains blocked.
- Node's built-in SQLite is experimental. Re-evaluate before Node upgrades and before using it outside this private build step.
- Directory rename is atomic only within the same filesystem; no power-loss durability guarantee is made. Existing output is never intentionally overwritten.
- No app schema/migration or runtime repository exists. T014 must define and test that adapter separately using synthetic packs.
- NIKL legal/platform distribution remains HOLD pending qualified counsel review of CC BY-SA 2.0 KR and Apple/Google distribution terms.

## Sources

- Node 22.13.0 release: https://nodejs.org/en/blog/release/v22.13.0
- Node SQLite API / Stability 1.1: https://nodejs.org/download/release/v22.23.0/docs/api/sqlite.html
- better-sqlite3 13.1.1 npm metadata: https://www.npmjs.com/package/better-sqlite3
- better-sqlite3 upstream package manifest: https://github.com/WiseLibs/better-sqlite3/blob/master/package.json
- sql.js 1.16.0 npm metadata and WASM description: https://www.npmjs.com/package/sql.js
- sql.js upstream package manifest: https://github.com/sql-js/sql.js/blob/master/package.json
