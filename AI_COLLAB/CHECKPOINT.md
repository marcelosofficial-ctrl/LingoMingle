# CHECKPOINT
Unit: T002 Expo SDK 58 shell, native tabs, dependency and CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Foundation: nine research shards, index, decisions, dependencies, risks, verify backlog migrated; technical and competitor research docs added.
App: Expo Router shell with four destinations. Navigation uses stable SDK 58 NativeTabs with native SF Symbols/Material icons and labels. Strict TypeScript, theme tokens, Liquid Glass runtime guard, Linux CI.
Research: SDK 58 official docs; Router/SQLite/Reanimated/GlassEffect compatibility; KanaSRS/KanaDojo/Kanji Dojo/Kanjii review; WanaKana MIT; ts-fsrs v6 Node 24 constraint; Hangul articulatory shapes from Korean National Institute of Korean Language; mnemonic/retrieval evidence.
CI evidence:
- Run 26: npm install and typecheck passed; lint failed with TypeError: Unexpected array. Corrected Expo flat-config composition by spreading the exported array.
- Run 31 (5e194d7): npm install passed; typecheck passed; lint failed with `TypeError: contextOrFilename.getFilename is not a function` from bundled eslint-plugin-react 7.37.x; tests skipped. This disproves the earlier assumption that the Expo peer range alone established ESLint 10 runtime compatibility.
- Root cause verified against ESLint 10 migration docs: context.getFilename() was removed; eslint-plugin-react 7.37.x calls it during automatic React-version detection. Added explicit `settings.react.version: "19.3"` to avoid that detector. Commit: 5036e0fe6c1fabebb236a21e22329a370f5978be.
- Run 32 for 5036e0f is currently in progress. At checkpoint: checkout passed; setup-node in progress; install/typecheck/lint/tests pending. Do not claim success.
Open: verify Run 32; if lint still fails, identify remaining incompatible react rules and choose a supported lint stack rather than masking all React lint. Decide package-lock strategy; audit transitive SPDX licences; extract C00/C01 verbatim; device smoke test. No paid services/store fees approved. Duplicate LingoMingle- untouched.
Next: finish T002 only after actual CI output confirms typecheck, lint and unit tests; then update NEXT_TASK to the next single task.
