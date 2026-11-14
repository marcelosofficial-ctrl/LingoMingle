# T011 recheck: streaming tool and store-rights boundaries | 2026-11-14

Status: T011 research complete. The recommendation is a build-time-only prototype, not permission to import or distribute the real snapshot.

## Exact package and runtime findings

- `@zip.js/zip.js` 2.25.0: exact upstream tag manifest identifies BSD-3-Clause, Node >=18 and no runtime dependencies. The API supports seekable Blob reading, strict ZIP metadata inspection, member streaming and explicit CRC-32 checking. CRC verification is opt-in and must remain enabled.
- `stream-json` 3.9.0: BSD-3-Clause, ESM package, no explicit `engines` field. Its sole runtime dependency is `stream-chain` 4.4.2, BSD-3-Clause with no runtime dependencies. Node 22.13.1 is the CI compatibility target.
- Important security qualification: upstream `stream-json` documentation explicitly says it is not designed for hostile JSON input. Depth, packed-token, duplicate-key and record-size guards improve bounded handling, but do not turn it into a hardened parser for adversarial files. T012 therefore remains synthetic-only. Do not run it against the user archive.
- Alternatives checked: `yauzl` 3.4.0 (MIT, Node >=12, `pend` 1.2.0 MIT) has no built-in CRC verification; `fflate` 0.8.3 (MIT, no runtime dependencies) also lacks CRC-32 read verification. Neither was selected.
- Exact package manifests: https://github.com/gildas-lormeau/zip.js/blob/v2.25.0/package.json ; https://github.com/uhop/stream-json/blob/master/package.json ; https://github.com/uhop/stream-chain/blob/master/package.json
- Parser security note: https://github.com/uhop/stream-json#readme

## Snapshot-derived resource envelope

The inspected archive remains outside Git. It is 84,498,237 compressed bytes and expands to 1,016,275,365 bytes across 11 members. The largest member is 100,098,567 bytes; the largest observed per-member expansion ratio is about 12.49:1. These are facts about this exact snapshot, not guarantees for future releases.

T012 prototype ceilings are 100 MB archive, 120 MB per member, 1.1 GB total expanded bytes, 40:1 compression ratio, 60,000 records and 11 members. The first four limits leave headroom over this snapshot. The 2 MB record, 1 MB packed-value, 64-level depth and 1 MB input-chunk limits are engineering ceilings, not measurements of maximum source-record dimensions. Re-measure them against any future approved snapshot before use.

The intended architecture is build-time only: seekable ZIP reader, one member at a time, token parser, one lexical record at a time, normalizer, deterministic JSONL, then a separate SQLite-pack step. Never parse the 1 GB expanded archive on a phone. The current prototype does not read the actual archive, create SQLite or bundle anything into Expo.

## Licence and platform recheck

NIKL's site policy states that unmarked dictionary text is generally CC BY-SA 2.0 KR, permits commercial reuse subject to attribution and ShareAlike for adaptations, and treats multimedia permissions individually. The selected v1 candidate excludes multimedia, examples, audio, pronunciation, conjugations and non-word lexical units.

The Korean legal code matters more than the deed summary for the unresolved platform question. It provides rights to reproduce, adapt and make a database, but requires licence/attribution notices, ShareAlike for adaptations, and prohibits additional restrictions or effective technological measures that restrict the licensed rights. A separate data folder and attribution manifest are useful controls, but do not themselves settle the issue.

Apple's current Developer Program Agreement and Standard EULA govern app distribution and in-app content. FairPlay/DRM and the standard EULA's restrictions may conflict with rights that CC BY-SA recipients must retain. Google's Developer Distribution Agreement grants Google broad rights needed to operate, distribute, display and promote Play products. Whether the exact database pack, app EULA, DRM, platform terms and downstream user rights can coexist is a legal interpretation, not something this engineering spike can decide.

Primary sources:
- NIKL copyright policy: https://krdict.korean.go.kr/kor/kboardPolicy/copyRightTermsInfo
- CC BY-SA 2.0 KR legal code: https://creativecommons.org/licenses/by-sa/2.0/kr/legalcode.ko
- Apple Developer Program Agreement: https://developer.apple.com/support/terms/
- Apple Standard EULA: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
- Google Play Developer Distribution Agreement: https://play.google.com/about/developer-distribution-agreement.html

## Decision

Technical GO only for the synthetic build-time architecture. Real NIKL processing remains blocked on source-trust/parser review and explicit data-rights clearance. Store distribution remains HOLD until qualified counsel reviews the actual package, app EULA, FairPlay/DRM, Google Play terms, attribution, ShareAlike and downstream redistribution rights. This is not legal advice. No archive or derived data was uploaded to GitHub or CI artifacts.
