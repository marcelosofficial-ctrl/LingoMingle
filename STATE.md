# STATE
Updated: 2026-11-14
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. LingoMingle- is a duplicate, not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React 19.3.0; RN 0.88.1; Reanimated 4.7.1; TS 6.0.3; ESLint 10.14.0.
Product: hiragana MVP, katakana extension, Hangul starter, Song Study later. Local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002-T008 COMPLETE: SDK foundation/quality gates, keyboard research, typed gloss/analyzer/POS contracts, Kiwi v0.24.1 feasibility and versioned Korean POS crosswalk. No native keyboard or Kiwi runtime integration.
T009 COMPLETE: inspected user-attached NIKL 2026-10-19 ZIP (84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee804fc081c27788dadf3ceb66d34e). 11/11 JSON parse; 51,555 word entries; 49,869 complete-English entries. Technical GO only; no data imported.
T010 COMPLETE: dependency-free record normalizer, types and synthetic tests.
T011 COMPLETE: ZIP/JSON tool and official platform/licence review. Production import/distribution HOLD pending source-trust review and qualified counsel review of CC BY-SA 2.0 KR with Apple/Google terms.
T012 COMPLETE (synthetic only): isolated Node ZIP/JSON stream tool, tool-only pins zip.js 2.25.0, stream-json 3.9.0, stream-chain 4.4.2. Fixture filenames only; no actual NIKL data. stream-json is not designed for hostile JSON.
T013 COMPLETE (synthetic only): isolated Node 22.13.1 node:sqlite pack builder, schema v1, normalized indexes, transaction, integrity/FK/count/lookup checks, deterministic hash/manifest and atomic publish. No app DB mutation.
T014 COMPLETE (synthetic only): read-only Expo SQLite repository contract; validates app ID/schema v1/tables, enables PRAGMA query_only, maps GlossEntry metadata and mirrors matching semantics. Does not open/create/copy/migrate DB. SQLite handle must be pre-opened and dedicated.
CI #73 on b8864e1 SUCCESS (T013 docs). T014 CI pending.
Hard stop: no real NIKL processing, production pack, app bundle or store distribution. Legal/platform distribution remains HOLD.
Next: T015 safe provisioning/installation of an existing SQLite pack into app storage using SDK 58 APIs, synthetic fixtures only. Open gates: source/parser trust review; qualified rights review; root package lock/transitive SPDX audit; Japanese tokenizer/data licence; Kiwi memory/latency; native keyboard; libhangul LGPL; C00/C01 verbatim source extraction; Expo SQLite patch alignment (58.0.16 pinned, SDK docs now recommend ~58.0.17).
