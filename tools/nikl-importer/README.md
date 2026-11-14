# Isolated NIKL importer prototype

**Synthetic-only. Do not run this package against the NIKL archive.** Every invocation must supply an explicit allowlist of `fixture-NN.json` members; the importer refuses the real snapshot's member names.

This is a Node 22.13 build-time proof of ZIP member streaming into token-based JSON parsing and the existing record normalizer. It writes only synthetic JSONL and a synthetic manifest. It is not part of the Expo app and must never be bundled into app runtime.

## Runtime dependency/licence inventory

| Package | Exact version | SPDX | Runtime dependencies | Node |
|---|---:|---|---|---|
| `@zip.js/zip.js` | 2.25.0 | BSD-3-Clause | none | >=18 |
| `stream-json` | 3.9.0 | BSD-3-Clause | `stream-chain` 4.4.2 | actively maintained Node; no explicit engines field |
| `stream-chain` | 4.4.2 | BSD-3-Clause | none | Node streams |

The package lock pins all three runtime packages. zip.js 2.25.0 metadata was checked at its exact tag. stream-json 3.9.0 is ESM-only and its README says actively maintained Node releases; its package metadata does not declare a minimum Node engine. CI's Node 22.13 run is the compatibility proof.

## Security boundary

- zip.js reads a seekable Blob through `fs.openAsBlob`; it does not buffer the entire ZIP or expanded member.
- ZIP metadata is allowlisted and bounded. Encrypted, symlink, directory, unsupported compression, duplicate, unexpected, unsafe and oversized members fail closed.
- CRC-32 is checked on decompressed bytes; per-member and aggregate actual-byte limits also apply.
- stream-json uses parser depth and packed-value limits. Input chunks are split before parsing, streamed string/key/number tokens are bounded, and a cumulative token guard rejects an oversized lexical record before `streamArray` assembles it. **Upstream explicitly says stream-json is not designed for hostile JSON.** This prototype therefore only accepts locally generated synthetic fixtures. A real archive requires a separate source-trust/hostile-input validation review and explicit legal approval.
- The parser output is normalized by the existing T010 adapter. Any rejected record aborts the entire run. Temporary output is removed on failure; successful output is atomically renamed.
- CRC-32 detects accidental corruption, not malicious replacement or authenticity.

No NIKL source entries, translations, examples, archive or derived records belong in this package or its tests.
