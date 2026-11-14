# NIKL Streaming Pipeline and Store-Rights Review (2026-11-14)

Status: T011 research complete. **Technical architecture: conditional GO for an isolated build-time importer. Store distribution: HOLD.** No dependency was adopted, no archive was uploaded, and no NIKL records were imported.

## 1. Verified input boundary

The user-supplied 2026-10-19 archive is 84,498,237 bytes compressed and 1,016,275,365 bytes expanded across 11 JSON members. T009 found 51,555 word entries and 49,869 entries with complete English coverage (69,431 senses). The selected text fields total about 5.70 MiB before database/index overhead. This is a lower bound, not a final SQLite size. See [snapshot inspection](NIKL_SNAPSHOT_INSPECTION_20261114.md) and [normalizer spike](NIKL_NORMALIZER_SPIKE_20261114.md). The raw archive remains outside Git.

## 2. ZIP reader comparison

| Candidate | Current package evidence | Node/runtime and API | Licence/dependencies | Assessment |
|---|---|---|---|---|
| `@zip.js/zip.js` 2.25.0 | npm reports 2.25.0 as latest, published 14 hours before this review; upstream describes large-file, Zip64 and stream support | Node support is documented; upstream package manifest at 2.24.0 declares Node >=18. Uses random-access readers and entry streams. CRC checking is opt-in, so set `checkCrc32: true`. | BSD-3-Clause; npm reports zero runtime dependencies | **Preferred prototype candidate**, but 2.25.0 is very new. Pin and re-check the exact published manifest/API before adoption. |
| `yauzl` 3.4.0 | Upstream README documents async iteration and lazy entry handling | Node >=12. `lazyEntries` / `eachEntry()` bounds concurrent entry handling; `validateEntrySizes` checks declared versus actual size. | MIT; runtime dependency `pend ~1.2.0` (MIT, last published 12 years ago) | Mature, small alternative. Critical gap: upstream explicitly says it does **not** verify ZIP CRC-32. Would need a streaming CRC check. |
| `fflate` 0.8.3 | npm current version; recent 0.8.3 release documents async unzip backpressure support | Pure-JS streaming unzip and async APIs; works in Node and browsers | MIT; zero dependencies | Small and fast, but zip.js benchmark notes fflate has no CRC-32 verification on read. Not preferred for this untrusted archive. |

Sources: [zip.js npm package](https://www.npmjs.com/package/@zip.js/zip.js), [zip.js reader docs](https://github.com/gildas-lormeau/zip.js/blob/master/docs/classes/ZipReader.md), [zip.js release history](https://github.com/gildas-lormeau/zip.js/releases), [yauzl manifest](https://github.com/thejoshwolfe/yauzl/blob/master/package.json), [yauzl safety/CRC notes](https://github.com/thejoshwolfe/yauzl), [fflate npm](https://www.npmjs.com/package/fflate), [fflate releases](https://github.com/101arrowz/fflate/releases).

## 3. JSON parser and runtime

Candidate: `stream-json` 3.9.0, BSD-3-Clause, ESM-only, actively maintained Node support, with `stream-chain` 4.4.2 (BSD-3-Clause) as its runtime pipeline substrate. It provides token parsing, `pick`, `streamArray` and `streamValues` so a large JSON file need not become one JavaScript string/object. Version 3.9.0 adds parser depth and packed-value limits. Node 22 is within its supported runtime family and also provides built-in `zlib.crc32()` (introduced in Node 22.2.0), useful if yauzl is selected instead.

Sources: [stream-json README and release history](https://github.com/uhop/stream-json), [stream-json lockfile showing stream-chain 4.4.2](https://github.com/uhop/stream-json/blob/master/package-lock.json), [Node 22.17 zlib docs](https://nodejs.org/download/release/v22.17.0/docs/api/zlib.html).

**Recommended tool-only stack for a later spike:** `@zip.js/zip.js` 2.25.0 + `stream-json` 3.9.0, with exact lockfile pins and an SPDX inventory. Do not add either to the Expo app runtime. The ZIP package was published very recently; before adoption verify its exact 2.25.0 Node engine, package contents, CRC behavior and release notes, then run synthetic corrupt-archive tests. No adoption occurs in T011.

## 4. Bounded build-time pipeline

Do not parse the 1.016 GB source on a phone. Run the importer as a reproducible, isolated Node 22 build tool. It should stream each approved JSON member directly from the ZIP reader into the JSON parser, one member at a time. Never call a whole-entry `TextWriter`, `arrayBuffer()`, `Buffer.concat()` or `JSON.parse()` on an entire member.

1. **Preflight:** hash the original archive; validate ZIP structure; require exactly the 11 expected member names; reject duplicate/unexpected names, encrypted entries, unsupported compression, unsafe paths, symlinks and ambiguous/overlapping entries. Enforce archive/member count, compressed-size, declared-expanded-size, actual-expanded-byte and compression-ratio caps. Derive thresholds from the inspected source plus a conservative ceiling, not from attacker-controlled metadata.
2. **Integrity:** enable zip.js CRC-32 verification explicitly. Its current package documentation warns that declared expanded sizes are not verified before reading and that deflate can expand up to 1,032 times compressed size. Therefore reject oversized declared entries before reading and enforce a second hard byte cap on the actual output stream. Use strict filename/archive checks and process one entry at a time. Do not assume CRC is a cryptographic signature.
3. **Parse/normalize:** stream the root `LexicalEntry` array; apply parser depth/string limits; assemble at most one bounded record at a time. Exclude examples, media, pronunciation/audio, conjugations, variants and non-word lexical units before output. Feed each retained record to the existing synthetic-tested `normalizeNiklEntry`. Unknown schema, HTML entity, POS mapping, duplicate ID or malformed record must fail closed rather than silently disappear.
4. **Aggregate gate:** compare exact member names, source ID uniqueness, input/output counts, complete-English coverage, sense counts, unresolved POS counts and all rejection reasons against a manifest of expected ranges. A mismatch blocks publication. Preserve source IDs and sort senses by source sense order.
5. **Deterministic output:** write UTF-8 canonical JSONL to a temporary directory, with stable field order, NFC, normalized text, fixed newline convention and stable input-member/record order. Include a manifest containing source URL/title, snapshot date, source ZIP SHA-256, importer and mapping versions, licence and attribution text, transformation description, counts, exclusions, output SHA-256 and generation timestamp separately. A deterministic content hash must not depend on the timestamp.
6. **Database build:** create the SQLite database from the validated JSONL in a fresh temporary file and one transaction. Create indexes after bulk inserts. Run `PRAGMA integrity_check`, `foreign_key_check`, schema/version checks, count checks and representative lookup tests. Record SQLite version and DB hash. Byte-for-byte DB reproducibility across SQLite versions is UNKNOWN; the canonical JSONL plus manifest is the reproducibility authority.
7. **Publish/rollback:** only after every check succeeds, close handles and atomically rename the completed pack/database on the same filesystem. Keep the previous generation until the new one is verified. Cancellation or any error deletes temporary files and leaves the active database untouched. Report progress by member/bytes/records, never by logging source text.

zip.js has an important documented caveat: it does not verify declared expanded sizes before reading. A streamed destination grows with actual bytes, but explicit preflight and actual-output caps are still mandatory. Its `checkCrc32` option is off by default, so it must be set explicitly. A custom Node file reader or Node's lazily-read `fs.openAsBlob()` avoids buffering the entire ZIP; do not pass a plain non-seekable stream that the library must buffer.

## 5. Build-time versus device

**Build-time: GO.** Source processing is one-off, reproducible and independent of mobile storage/RAM. The importer should emit a compact normalized pack and SQLite database; do not commit either until rights clearance and explicit data-release approval.

**On-device 1 GB archive import: NO-GO.** It adds large temporary storage, decompression, parser, battery, cancellation and recovery burdens to low-memory phones. If later approved, the app should only install the already-filtered compact pack, verify its manifest/hash, and swap a versioned data generation without touching user-owned SQLite tables. Final DB size and install-time footprint remain UNKNOWN until a real build is authorized.

## 6. GitHub Actions and source custody

GitHub Actions artifacts are generated by workflows and are downloadable by repository readers; they are not a private one-person vault. GitHub documents default 90-day retention, configurable private-repository retention up to 400 days, and storage quotas of 500 MB on Free, 1 GB on Pro, 2 GB on Team and 50 GB on Enterprise Cloud. The workflow-dispatch input types are scalar values (boolean, choice, number, environment, string), not a binary file attachment. Therefore a user-supplied 84.5 MB ZIP has no native safe file-input path through a normal manual dispatch.

Sources: [Actions storage limits](https://docs.github.com/en/actions/reference/limits), [artifact retention](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository), [artifact access](https://docs.github.com/en/rest/actions/artifacts), [workflow input types](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).

**Decision:** do not commit the archive, upload it as an Actions artifact, attach it to a release, or send it to any external service. GitHub Actions may run synthetic fixtures only. A future real import requires a separately approved, controlled source-intake path and explicit data-handling decision. Repository plan/remaining storage are UNKNOWN; the 500 MB figure is only the documented GitHub Free quota, not a claim about this account.

## 7. Store distribution and CC BY-SA 2.0 KR

**Verified licence text:** CC BY-SA 2.0 KR grants rights to reproduce, use in a database, distribute and transmit the work. Clause 1 says a collection/database is not itself a derivative work for this licence's definition; this does not remove the licence from the included works. Clause 4 requires the licence URI, prohibits additional conditions that restrict licence rights, prohibits conflicting technological protection measures, requires attribution, and requires derivative works to use the same or a compatible BY-SA licence. The NIKL policy separately says unmarked text materials use CC BY-SA 2.0 KR and multimedia may have individual terms; all multimedia remains excluded.

Source: [CC BY-SA 2.0 KR legal code](https://creativecommons.org/licenses/by-sa/2.0/kr/legalcode). NIKL policy and exact source attribution are recorded in [NIKL_FULL_EXPORT_AND_RIGHTS_20261113.md](NIKL_FULL_EXPORT_AND_RIGHTS_20261113.md).

**Verified Apple wording:** Apple's Developer Program Agreement defines FairPlay as the content-protection system applied to App Store-distributed Licensed Applications. It also requires licensing terms for an app and third-party code/FOSS to be consistent with and not conflict with Apple's digital-signing/content-protection aspects. Apple's Standard EULA applies to content/materials/services accessible from or purchased within an app; a custom EULA is possible but must meet Apple's minimum terms and not conflict with Apple Media Services usage rules. These terms create a real question about the rights of users to extract, copy and redistribute CC-licensed data from a FairPlay-protected app. They do not conclusively answer it.

Sources: [Apple Developer Program License Agreement, FairPlay definition and licence compatibility](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/), [Apple Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

**Verified Google wording:** Google Play DDA section 5.1 authorizes Google, on a non-exclusive, worldwide, royalty-free basis, to reproduce, perform, display, analyse and use the Product for Play operation/marketing, hosting/user access and platform improvement. Section 5.3 provides a user licence to use the Product; a separate EULA may be supplied, but the DDA supersedes a conflicting EULA. Whether those rights and terms conflict with, or can coexist with, the embedded CC BY-SA dataset licence is a legal interpretation, not settled by the DDA text alone.

Source: [Google Play Developer Distribution Agreement](https://play.google/intl/en-us/developer-distribution-agreement.html).

### Packaging options

| Option | Technical view | Rights status |
|---|---|---|
| Database embedded in app bundle | Easiest offline install | **HOLD**: FairPlay and default/custom EULA interaction must be reviewed. |
| Separate unencrypted CC BY-SA pack, independently downloadable/exportable and imported by the app | Best technical separation; pack can carry its own licence, attribution and manifest | **HOLD**: counsel must confirm app EULA does not restrict access to in-app content and that platform terms do not impose conflicting restrictions. |
| User-supplied archive/pack, processed locally | Avoids developer distributing the original source pack | **HOLD for product claims**: user's own copy does not automatically settle rights in transformed output or app behaviour; 1 GB input is poor mobile UX. |
| Web/PWA or non-store distribution | May avoid App Store FairPlay and store EULA constraints | **Not an automatic clearance**: licence attribution/share-alike/no-additional-restrictions still apply; hosting, regional law and distribution terms need review. |

### Questions for qualified counsel

1. Does the NIKL CC BY-SA 2.0 KR grant cover this selected word-only database, and which transformations create a derivative work versus a separate database/collection?
2. What exact attribution, licence URI, change notice and share-alike text must appear in-app, in the pack, in store metadata and in any export?
3. Does Apple's FairPlay protection of the app, its Standard EULA treatment of in-app content, or a proposed Custom EULA restrict a user's CC rights to extract, copy, modify or redistribute the dictionary data?
4. Can a separate unencrypted pack remain independently licensed when downloaded/imported by an App Store app? Does Apple's Developer Program Agreement require any additional clearance?
5. Do Google Play DDA §§5.1 and 5.3 grant Google/user rights that conflict with or can coexist with the NIKL licence? What must the app EULA explicitly carve out?
6. Must the pack itself be offered under CC BY-SA 2.0 KR, and can app code, app UI, database schema and user-created content remain under separate licences without restricting the NIKL material?
7. Are any entries, definitions, metadata or source records separately marked or third-party-owned despite the site-wide default policy?

## 8. Final gate

- **VERIFIED:** the source can be handled with a bounded build-time stream pipeline; current tool candidates have permissive licences and Node-compatible APIs.
- **INFERRED:** zip.js 2.25.0 + stream-json 3.9.0 is the best isolated prototype stack, subject to exact-version verification and synthetic security tests.
- **UNKNOWN:** final SQLite size, real importer peak RSS/runtime, GitHub plan/remaining quota, exact app packaging path, and whether the platform terms legally conflict with CC BY-SA 2.0 KR.
- **NO-GO:** phone-side parsing of the 1.016 GB archive; uploading/committing the archive; shipping a derived pack in either store before legal clearance.
- **GO:** next isolated synthetic-only streaming prototype. No real NIKL text or archive should enter GitHub.
