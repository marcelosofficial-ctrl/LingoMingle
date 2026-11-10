# CHECKPOINT
Unit: Canonical repo migration + T002 Expo SDK 58 shell, research verification and CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Foundation: nine research shards, index, decisions, dependencies, risks, verify backlog migrated; competitor and technical research docs added.
App: Expo Router shell with Songs, Alphabets, Review, You tabs; strict TS; theme tokens; Liquid Glass capability guard; Linux CI.
Research: SDK 58 official docs; Router/SQLite/Reanimated/GlassEffect compatibility; KanaSRS/KanaDojo/Kanji Dojo/Kanjii review; WanaKana MIT; ts-fsrs v6 Node 24 constraint; Hangul articulatory shapes from Korean National Institute of Korean Language; mnemonic/retrieval evidence.
CI evidence: Run 7 (cc81c37) passed npm install and typecheck, then failed lint because ESM config imported a directory path. Fixed to explicit flat.js path and added package type=module. ESLint pinned to 9.39.5 because Expo's SDK 58 config currently depends on a React plugin incompatible with ESLint 10; ESLint 9 is EOL, so this is a temporary maintenance compromise. Runs 13-21 were triggered by sequential commits; concurrency cancellation has now been added to CI. Run 22 on b37123a is in progress. Do not claim green CI yet.
Open: confirm final corrected CI; add package-lock.json; audit all resolved SPDX licences; extract C00/C01 verbatim into separate files; phone test glass and layout.
No paid services/store fees approved. Duplicate LingoMingle- remains untouched because no archive/delete action is available here.
Next: inspect final CI logs, fix actual errors; complete T002 before selecting T003.