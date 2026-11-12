# CHECKPOINT
Unit: T002 Expo SDK 58 shell, native tabs, dependency and CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
App: strict TypeScript, Expo Router shell, stable SDK 58 NativeTabs (Songs, Alphabets, Review, You), native SF Symbols/Material icons, theme tokens, Liquid Glass capability guard, Linux CI.
Stack pins: Expo 58.0.23, Router 58.0.30, SQLite 58.0.15, GlassEffect 58.0.5; React 19.3.0, RN 0.88.1, Reanimated 4.7.1; TS 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4.
CI evidence:
- Run 26: install and typecheck passed; lint failed due earlier Expo flat-config array composition. Fixed by spreading array.
- Run 31 (5e194d7): install/typecheck passed; lint failed because eslint-plugin-react 7.37.x automatic React version detection called removed context.getFilename(); tests skipped.
- Repair 5036e0f pinned React version. Run 32 (43196350174) install/typecheck passed; lint progressed past prior React crash but failed import resolution: resolver reports invalid TypeScript resolver interface; expo-router/native-tabs unresolved. Tests skipped.
- Root cause: Expo eslint-config-expo 58.0.4 declares eslint-import-resolver-typescript ^3.6.3, which is old for current resolver behavior. Upstream resolver 4.x supports modern package exports. Added direct pin and npm override to 4.4.5 (ISC) in package.json, commit 7cc6867. Dependency ledger updated in f505576.
- Run 32 is a confirmed failure. New run triggered by 7cc6867; check status and logs. No test success claimed.
Open: confirm new CI; if lint succeeds, inspect tests. If unresolved, diagnose package exports/import resolution separately. Lockfile reproducibility and full transitive SPDX audit remain open. C00/C01 exact source extraction and device smoke test remain open. No paid services/store fees approved. Duplicate LingoMingle- untouched.
Next: T002 remains open until actual CI shows typecheck, lint and unit tests pass.
