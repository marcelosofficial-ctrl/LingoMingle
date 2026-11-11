# CHECKPOINT
Unit: T002 Expo SDK 58 shell, native tabs, dependency and CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Foundation: nine research shards, index, decisions, dependencies, risks, verify backlog migrated; technical and competitor research docs added.
App: Expo Router shell with four destinations. Navigation now uses stable SDK 58 NativeTabs with native SF Symbols/Material icons and labels. Strict TypeScript, theme tokens, Liquid Glass runtime guard, Linux CI.
Research: SDK 58 official docs; Router/SQLite/Reanimated/GlassEffect compatibility; KanaSRS/KanaDojo/Kanji Dojo/Kanjii review; WanaKana MIT; ts-fsrs v6 Node 24 constraint; Hangul articulatory shapes from Korean National Institute of Korean Language; mnemonic/retrieval evidence.
CI evidence: Run 26 on 053ab85 passed npm install and typecheck; lint failed with TypeError: Unexpected array. Root cause: eslint-config-expo/flat.js exports an array, which must be spread into the flat config. Fixed in eslint.config.js. ESLint 9.39.5 was EOL, so upgraded to 10.14.0; upstream eslint-config-expo 58.0.4 declares peer eslint >=8.10. Run 31 on app commit 5e194d7 is in progress, but no step results beyond setup have been observed yet. Run 30 (ESLint 10 package change) was cancelled by the newer run. Do not claim lint/tests passed.
Open: confirm Run 31 install/typecheck/lint/tests; decide whether to generate package-lock.json after successful resolution; audit transitive SPDX licences; extract C00/C01 verbatim; device smoke test. No paid services/store fees approved. Duplicate LingoMingle- untouched.
Next: finish T002 based on Run 31 output; then update NEXT_TASK to SQLite schema only when acceptance is met.