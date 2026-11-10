# CHECKPOINT
Unit: Canonical repo migration + T002 Expo SDK 58 shell, research verification and CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Foundation: nine research shards, index, decisions, dependencies, risks, verify backlog migrated.
App: Expo Router shell with Songs, Alphabets, Review, You tabs; strict TS; theme tokens; Liquid Glass capability guard; Linux CI.
Research: SDK 58 official docs; Router/SQLite/Reanimated/GlassEffect compatibility; competitor teardown; WanaKana MIT; ts-fsrs v6 Node 24 constraint; Hangul articulatory shapes from Korean National Institute of Korean Language; mnemonic/retrieval evidence.
CI evidence: Run 7 (commit cc81c37) passed install and typecheck, then failed lint because ESM config imported a directory path. Fixed to explicit flat.js path and added package type=module. ESLint bumped to 9.39.5, latest 9.x patch, because Expo's config is not yet compatible with ESLint 10. Run 15 on commit c3b6d0a4 is in progress; earlier runs 1-6 failed during setup or dependency peer resolution. Do not claim green CI yet.
Open: confirm latest CI; add package-lock.json for reproducible installs; audit all resolved SPDX licences; extract C00/C01 verbatim into separate files; phone test glass and layout.
No paid services/store fees approved. Duplicate LingoMingle- untouched.
Next: inspect latest CI logs, fix actual errors; complete T002 before selecting T003.