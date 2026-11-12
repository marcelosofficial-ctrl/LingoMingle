# CHECKPOINT
Unit: T002 SDK 58 starter shell and CI compatibility.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Current branch head at checkpoint: a76de95024da0b1c9448108b45cd759c95d8d789.
App: strict TypeScript, Expo Router shell, stable SDK 58 NativeTabs (Songs, Alphabets, Review, You), native SF Symbols/Material icons, theme tokens, Liquid Glass capability guard, Linux CI.
Pinned stack: Expo 58.0.24, Router 58.0.31, SQLite 58.0.16, Constants 58.0.16, Linking 58.0.17, Status Bar 58.0.5, GlassEffect 58.0.5; React 19.3.0, RN 0.88.1, Reanimated 4.7.1 + Worklets 0.13.0; TS 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5.
Official docs verified: SDK58 native tabs stable; Router docs recommend ~58.0.31; SQLite ~58.0.16; React19.3/RN0.88/Node22.13.x; Reanimated4.7.1; GlassEffect ~58.0.5, iOS26+ and graceful View fallback.
CI:
- #33 on 7cc6867 SUCCESS: install/typecheck/lint and 3/3 unit tests passed.
- #34 on 81f5963 FAILED install: Router58.0.31 requires expo-constants ^58.0.16.
- #35 on eeabf5f FAILED install: Router58.0.31 requires expo-linking ^58.0.17.
- Updated Expo packages to SDK template patch set in a3bdf07; Run #36 must verify.
Open: no package-lock; transitive reproducibility/SPDX audit; device smoke test; C00/C01 exact extraction attachment-dependent. T002 remains open until #36 quality steps pass.
No paid services/store fees approved. G1 blocks online copyrighted lyric lookup. Duplicate LingoMingle- untouched.
