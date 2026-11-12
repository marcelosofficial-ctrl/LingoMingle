# CHECKPOINT
Unit: T002 SDK 58 starter shell and CI compatibility.
Status: COMPLETE against stated T002 acceptance criteria.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Latest verified code commit: a3bdf071f12c7d9992a96a501b5cf90905edd177.
App: strict TypeScript, Expo Router shell, stable SDK 58 NativeTabs (Songs, Alphabets, Review, You), native SF Symbols/Material icons, theme tokens, Liquid Glass capability guard, Linux CI on push/PR.
Pinned stack: Expo 58.0.24, Router 58.0.31, SQLite 58.0.16, Constants 58.0.16, Linking 58.0.17, Status Bar 58.0.5, GlassEffect 58.0.5; React 19.3.0, RN 0.88.1, Reanimated 4.7.1 + Worklets 0.13.0; TS 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5.
Official docs verified: SDK58 native tabs stable; Router recommends ~58.0.31; SQLite ~58.0.16; SDK58 React19.3/RN0.88/Node22.13.x; Reanimated4.7.1; GlassEffect~58.0.5 with iOS26+ and graceful View fallback.
CI evidence:
- Run #33 on 7cc68679f2abb08425e9f377a6a68e2f08f955db: SUCCESS. Install/typecheck/lint; 3/3 unit tests passed.
- Run #34 on 81f5963b2be361b29c0f547e85e75fc26e6b1968: FAILED npm install due to Router requiring Constants ^58.0.16.
- Run #35 on eeabf5f507a81f825c91da883adb4ac28f83aadc: FAILED npm install due to Router requiring Linking ^58.0.17.
- Run #36 on a3bdf071f12c7d9992a96a501b5cf90905edd177: SUCCESS. Actual job output confirms npm install, npm run typecheck, npm run lint, npm test all completed successfully; TAP reports 3 tests, 3 pass, 0 fail, 0 skipped.
Open follow-up (not T002 blocker): package-lock reproducibility and complete transitive SPDX audit; iPhone/Android device smoke test; exact C00/C01 verbatim extraction remains dependent on original source attachment. No package-lock committed.
No paid services/store fees approved. G1 blocks online copyrighted lyric lookup. Duplicate LingoMingle- untouched.
