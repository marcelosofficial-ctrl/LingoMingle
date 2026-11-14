# T012 synthetic ZIP-to-JSON streaming prototype | 2026-11-14

Status: COMPLETE for synthetic-only engineering proof. NOT approved for real NIKL archive processing, production SQLite generation or app distribution.

## Isolated package

- `tools/nikl-importer/package.json` and lockfile; no dependency added to the Expo app package or runtime.
- `@zip.js/zip.js` 2.25.0, BSD-3-Clause, Node >=18, zero runtime dependencies.
- `stream-json` 3.9.0, BSD-3-Clause, ESM; one runtime dependency `stream-chain` 4.4.2, BSD-3-Clause, zero runtime dependencies.
- CI uses Node 22.13. The exact package versions and SPDX identifiers are pinned in the tool package. See its README and DEPENDENCIES.md.

## Pipeline and controls

The prototype uses `fs.openAsBlob` and zip.js `BlobReader`/ `ZipReader` so the archive is read by ranges rather than buffering the expanded JSON member. It validates a strict synthetic fixture-name allowlist, duplicate/unexpected/unsafe paths, directories, encryption, symlinks, compression method, declared sizes and compression ratio. CRC-32 verification is explicitly enabled.

The parser receives bounded chunks and enforces depth, packed string/key/number lengths, duplicate JSON object-key detection, and a cumulative per-record token-byte budget before the record assembler. It streams one lexical record at a time into the T010 `normalizeNiklEntry` adapter. Rejected records abort the build; non-word and incomplete-English records are skipped according to the existing adapter. Output is deterministic JSONL plus a manifest containing archive/output hashes and counts. Output is built in a sibling temporary directory and renamed only after successful completion; failures/cancellation remove temporary output.

Default ceilings: 100 MB archive; 120 MB per member; 1.1 GB total expanded bytes; 40:1 compression ratio; 60,000 records; 2 MB record token budget; 1 MB packed value; depth 64; 1 MB incoming chunk. Snapshot metadata shows the 2026-10-19 archive is 84,498,237 compressed bytes, 1,016,275,365 expanded bytes, 11 members, largest member 100,098,567 bytes and largest member ratio about 12.49:1. Limits leave headroom for this snapshot only. The record/depth/packed-value ceilings have not been validated against real source records.

The entry point requires explicit `fixture-NN.json` names and refuses the actual NIKL member naming convention. Tests and benchmark data are invented synthetic fixtures only.

## Verification

CI run #67, SHA `5a2291dd` (Node v22.13.1):
- Root install, typecheck and lint: PASS.
- App tests: 35 passed, 0 failed, 0 skipped.
- Isolated importer tests: 7 passed, 0 failed.
- Tests cover deterministic multi-member output, incomplete-English skip, metadata/path/encryption/symlink/compression rejection, explicit refusal of NIKL member names before file access, CRC corruption and cleanup, malformed JSON, duplicate source IDs, size limits, cancellation, duplicate JSON keys, parser depth, packed string/number bounds and record token-size rejection.

Synthetic benchmark: 1,500 entries; 643,500-byte JSONL; 857.48 ms; process peak RSS 134,548 KiB. RSS is the entire Node test-process peak, including fixture generation and preceding tests, not importer-only memory. This small fixture is not a projection of real archive performance or device memory.

## Hard stop and limitations

Upstream explicitly says stream-json is not designed for hostile JSON input. The synthetic token/size guards are not a hostile-input security certification. The prototype must not be run against the user-provided NIKL archive. A future real-data path needs a separately reviewed source-trust gate or hardened parser, re-measured limits, qualified legal clearance and a separate SQLite-pack validation step.

No real NIKL records, translations, examples, ZIP archive, production database or app bundle were created or committed. No external upload, paid service or account was used. Store distribution remains HOLD under D020.
