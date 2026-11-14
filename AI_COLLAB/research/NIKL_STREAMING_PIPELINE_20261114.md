# NIKL Streaming Pipeline Review (2026-11-14)

Status: T011 research complete. **Conditional technical GO for an isolated build-time importer.** No dependency was adopted, no archive uploaded, and no NIKL records imported.

## Input boundary

The user-supplied 2026-10-19 archive is 84,498,237 bytes compressed and 1,016,275,365 bytes expanded across 11 JSON members. T009 found 51,555 word entries and 49,869 entries with complete English coverage (69,431 senses). Selected text totals about 5.70 MiB before database/index overhead. This is a lower bound, not a final SQLite size. See [snapshot inspection](NIKL_SNAPSHOT_INSPECTION_20261114.md) and [normalizer spike](NIKL_NORMALIZER_SPIKE_20261114.md). The raw archive remains outside Git.

## ZIP reader comparison

| Candidate | Current version and Node support | SPDX/dependencies | Assessment |
|---|---|---|---|
| `@zip.js/zip.js` 2.25.0 | npm reports 2.25.0 latest, published 14 hours before this review. Upstream manifest at 2.24.0 declares Node >=18; verify 2.25.0 manifest before pinning. Supports random-access readers, ZIP64 and entry streams. | BSD-3-Clause; npm reports zero runtime dependencies. | **Preferred prototype candidate.** Very new release. CRC-32 check is opt-in, set `checkCrc32:true`. |
| `yauzl` 3.4.0 | Node >=12; async iterator and lazy-entry APIs; validates declared versus actual expanded size by default. | MIT; runtime dependency `pend ~1.2.0` (MIT, last published 12 years ago). | Small mature alternative, but upstream explicitly says it does **not** verify ZIP CRC-32. Would need an added streaming CRC check. |
| `fflate` 0.8.3 | Recent release; async unzip APIs support backpressure. | MIT; zero dependencies. | Lightweight, but zip.js benchmark notes fflate has no CRC-32 verification on read. Not preferred for this untrusted archive. |

Sources: [zip.js npm](https://www.npmjs.com/package/@zip.js/zip.js), [zip.js reader docs](https://github.com/gildas-lormeau/zip.js/blob/master/docs/classes/ZipReader.md), [zip.js releases](https://github.com/gildas-lormeau/zip.js/releases), [yauzl manifest and safety notes](https://github.com/thejoshwolfe/yauzl), [fflate npm](https://www.npmjs.com/package/fflate), [fflate releases](https://github.com/101arrowz/fflate/releases).

## JSON parser and runtime

Candidate: `stream-json` 3.9.0, BSD-3-Clause, ESM-only, actively maintained Node support, with `stream-chain` 4.4.2 (BSD-3-Clause) as its runtime pipeline substrate. Token parsing plus `pick`, `streamArray` and `streamValues` avoids turning a huge JSON member into one JavaScript string/object. Version 3.9.0 adds parser depth and packed-value limits. Node 22 is supported; its built-in `zlib.crc32()` (added in Node 22.2.0) is useful if yauzl is chosen.

Sources: [stream-json README/releases](https://github.com/uhop/stream-json), [stream-json lockfile](https://github.com/uhop/stream-json/blob/master/package-lock.json), [Node 22 zlib docs](https://nodejs.org/download/release/v22.17.0/docs/api/zlib.html).

**Recommended isolated prototype stack:** `@zip.js/zip.js` 2.25.0 + `stream-json` 3.9.0, exact lockfile pins and SPDX inventory. Do not add either to the Expo app runtime. Before adoption, verify zip.js 2.25.0's exact Node engine/API/CRC behavior and run synthetic corrupt-archive tests. T011 does not adopt dependencies.

## Bounded build-time pipeline

Do not parse the 1.016 GB source on a phone. Run a reproducible Node 22 build tool. Stream each approved JSON member directly from the ZIP reader to the JSON parser, one member at a time. Never use whole-entry `TextWriter`, `arrayBuffer()`, `Buffer.concat()` or `JSON.parse()` on a full member.

1. **Preflight:** hash the archive; validate ZIP structure; require exactly the 11 expected member names; reject duplicate/unexpected names, encryption, unsupported compression, unsafe paths, symlinks and overlapping entries. Enforce archive/member-count, compressed-size, declared-expanded-size, actual-expanded-byte and compression-ratio caps. Derive thresholds from measured source values plus a conservative ceiling.
2. **Integrity:** set zip.js `checkCrc32:true`. Its package docs warn that declared expanded sizes are not verified before reading and deflate can expand up to 1,032 times compressed size. Reject oversized declarations before reading and enforce a second hard cap on actual output bytes. Process one entry at a time. CRC is not cryptographic authentication.
3. **Parse/normalize:** stream the root `LexicalEntry` array; set parser depth/string limits; assemble at most one bounded record at a time. Drop examples, media, pronunciation/audio, conjugations, variants and non-word lexical units before output. Feed retained records to existing synthetic-tested `normalizeNiklEntry`. Unknown schema/entity, duplicate ID, malformed record or unresolved required field fails closed.
4. **Aggregate gate:** compare exact member names, source-ID uniqueness, input/output counts, complete-English coverage, sense counts, unresolved POS counts and rejection reasons against expected ranges. Any mismatch blocks publication.
5. **Deterministic output:** write UTF-8 canonical JSONL to a temporary directory with stable field order, NFC, normalized text, fixed newlines and stable member/record order. Manifest: source URL/title/date/SHA-256, importer/mapping versions, licence/attribution, transformation, counts, exclusions, output SHA-256. Keep generation timestamp separate from content hash.
6. **Database build:** create SQLite from validated JSONL in a fresh temporary file and one transaction. Add indexes after inserts. Run `integrity_check`, `foreign_key_check`, schema/version, row-count and representative lookup checks. Record SQLite version and DB hash. Byte-identical DB output across SQLite versions is UNKNOWN; canonical JSONL is the reproducibility authority.
7. **Publish/rollback:** after all checks, close handles and atomically rename the completed pack/database on the same filesystem. Keep previous generation until new one verifies. Cancellation/error deletes temp files and leaves active data untouched. Report progress by member/bytes/records, never source text.

zip.js can use a lazily read `fs.openAsBlob()` or custom random-access file reader; a plain non-seekable stream may be buffered entirely. The 11 central-directory entries are small, but source content must remain streamed.

## Build-time versus device

**Build-time: GO.** One-off source processing is reproducible and independent of phone RAM/storage. Emit a compact normalized pack and SQLite database only after rights clearance and explicit data-release approval.

**On-device 1 GB archive import: NO-GO.** It creates storage, decompression, parser, battery, cancellation and recovery burdens. If later approved, install only the filtered compact pack, verify its manifest/hash and swap a versioned data generation without touching user-owned SQLite tables. Final DB size and install footprint are UNKNOWN.

## GitHub Actions and source custody

Actions artifacts are workflow-generated and downloadable by repository readers, not a private one-person vault. GitHub documents default 90-day retention, private-repository retention up to 400 days, and artifact storage quotas of 500 MB (Free), 1 GB (Pro), 2 GB (Team), 50 GB (Enterprise Cloud). Workflow-dispatch input types are scalar (boolean, choice, number, environment, string), not binary file attachments.

Sources: [Actions limits](https://docs.github.com/en/actions/reference/limits), [artifact retention](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository), [artifact access](https://docs.github.com/en/rest/actions/artifacts), [workflow input types](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).

**Decision:** do not commit the archive, upload it as an artifact, attach it to a release or send it to any external service. Actions may run synthetic fixtures only. A real import needs a separately approved controlled intake path. Repo plan/remaining storage are UNKNOWN; 500 MB is only the documented Free quota, not a claim about this account.

## Gate

- **VERIFIED:** bounded build-time streaming is feasible; candidates are permissively licensed and Node-compatible.
- **INFERRED:** zip.js 2.25.0 + stream-json 3.9.0 is the best isolated prototype stack, pending exact-version checks and synthetic security tests.
- **UNKNOWN:** final DB size, real peak RSS/runtime, GitHub plan/quota and exact production packaging.
- **NO-GO:** phone-side 1 GB archive parsing; archive upload/commit; production import before rights clearance.
- **GO:** synthetic-only streaming prototype. No real NIKL text/archive in GitHub.
