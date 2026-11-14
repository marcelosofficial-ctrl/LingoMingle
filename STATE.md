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
T016 preflight complete, implementation NOT STARTED: SDK 58 recommends expo-file-system ~58.0.13 and expo-asset ~58.0.21. Bundle only a synthetic .db via expo-asset plugin; Asset.downloadAsync cache URI is temporary; SHA-256 must use File.digest("SHA-256"). Open under SQLite.defaultDatabaseDirectory, validate through T015, transfer to T014 repository. Root package-lock.json is absent and CI uses npm install; app has no synthetic DB asset/provider yet.
CI #82 on 46d7386 SUCCESS: typecheck/lint passed, 47/47 app tests and 10/10 importer tests passed on Node 22.13.1. Docs-only commits since then have no CI run.
Hard stop: no real NIKL processing, production pack, app bundle or store distribution. Legal/platform distribution remains HOLD.
Next: T016 implementation: settle root lockfile generation as a dedicated mechanical unit; add SDK 58 FileSystem/Asset dependencies; build synthetic DB asset; implement adapter and app lifecycle; run CI and native tests where available.
