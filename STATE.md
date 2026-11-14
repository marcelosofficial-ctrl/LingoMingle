# STATE
Updated: 2026-11-14
Repo: marcelosofficial-ctrl/LingoMingle; branch: lingomingle-foundation-2026-11-10; default main; private. LingoMingle- is a duplicate, not canonical.
Stack: Expo 58.0.24; Router 58.0.31; SQLite 58.0.16; React 19.3.0; RN 0.88.1; Reanimated 4.7.1; TS 6.0.3; ESLint 10.14.0.
Product: hiragana MVP, katakana extension, Hangul starter, Song Study later. Local-first; G1 blocks online copyrighted lyric lookup. No paid services/store fees approved.
T002-T008 complete: SDK foundation, keyboard research, gloss/analyzer/POS contracts, Kiwi feasibility and Korean POS crosswalk.
T009-T011 complete: inspected user-attached NIKL snapshot, built normalizer, reviewed parser/tool and CC BY-SA/platform rights. Production import/distribution HOLD.
T012 complete (synthetic only): isolated Node ZIP/JSON stream tool; stream-json is not designed for hostile JSON.
T013 complete (synthetic only): Node 22.13.1 node:sqlite builder, schema v1, deterministic verified output.
T014 complete (synthetic only): read-only Expo SQLite repository; validates app ID/schema/tables, query_only, maps GlossEntry and lookup semantics.
T015 complete (synthetic only): hash-gated staged provisioning coordinator. Existing valid hash/schema reused; bad source hash rejected before destination deletion; stage checked before move; final hash/schema checked before returning connection. Expo File move atomicity undocumented, so crash-recoverable gating, not claimed atomic rename. Expo adapter/native device tests not integrated/run.
CI #78 on c11cdda failed lint because Buffer was undefined in the repository test; T015 explicitly imports node:buffer. T015 CI pending.
Hard stop: no real NIKL processing, production pack, app bundle or store distribution. Legal/platform distribution remains HOLD.
Next: T016 integrate coordinator with SDK 58 Expo FileSystem/SQLite in app-private DB directory; pin compatible FileSystem patch and test native iOS/Android. Open gates: source/parser trust; qualified rights review; root package lock/transitive SPDX audit; Japanese tokenizer/data licence; Kiwi memory/latency; native keyboard; libhangul LGPL; C00/C01 verbatim source extraction; Expo SQLite patch alignment.
