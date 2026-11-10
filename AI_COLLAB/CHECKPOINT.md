# CHECKPOINT
Unit: Canonical repo migration + T002 Expo SDK 58 shell, research verification and CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Foundation: nine research shards, index, decisions, dependencies, risks, verify backlog migrated; technical and competitor research docs added.
App: Expo Router shell with Songs, Alphabets, Review, You tabs; strict TS; theme tokens; Liquid Glass capability guard; Linux CI.
Research: SDK 58 official docs; Router/SQLite/Reanimated/GlassEffect compatibility; KanaSRS/KanaDojo/Kanji Dojo/Kanjii review; WanaKana MIT; ts-fsrs v6 Node 24 constraint; Hangul articulatory shapes from Korean National Institute of Korean Language; mnemonic/retrieval evidence.
CI evidence: Run 7 (cc81c37) passed npm install and typecheck, then failed lint because ESM config imported a directory path. Fixed to explicit flat.js path and added package type=module. ESLint pinned to 9.39.5 because Expo's SDK 58 config currently depends on a React plugin incompatible with ESLint 10; ESLint 9 is EOL, so this is a temporary maintenance compromise. Run 25 (12c339e) was still in progress; latest app/workflow commit 053ab85 has run 26 queued. CI now cancels superseded branch runs and runs only for app/toolchain changes, not documentation-only commits. Do not claim green CI yet.
Open: confirm run 26; add package-lock.json; audit all resolved SPDX licences; extract C00/C01 verbatim into separate files; phone test glass and layout.
No paid services/store fees approved. Duplicate LingoMingle- remains untouched because no archive/delete action is available here.
Next: inspect run 26 logs, fix actual errors; complete T002 before selecting T003.