# CHECKPOINT
Unit: T002 SDK 58 starter shell and CI compatibility.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Current branch head at checkpoint: e50f31163b659c60a5fe322fea2bb95e8b355b45.
App: strict TypeScript, Expo Router shell, stable SDK 58 NativeTabs (Songs, Alphabets, Review, You), native SF Symbols/Material icons, theme tokens, Liquid Glass capability guard, Linux CI.
Pinned stack: Expo 58.0.23, Router 58.0.31, SQLite 58.0.16, Constants 58.0.16, GlassEffect 58.0.5; React 19.3.0, RN 0.88.1, Reanimated 4.7.1 + Worklets 0.13.0; TS 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5.
Official SDK58 docs checked 2026-11-12: Router native-tabs recommends ~58.0.31 and is stable from SDK58; SQLite recommends ~58.0.16; SDK58 maps RN0.88/React19.3 and Node22.13.x; Reanimated recommends 4.7.1; GlassEffect recommends ~58.0.5 and falls back to View off iOS26 / when unsupported.
CI evidence:
- Run #33, code SHA 7cc68679f2abb08425e9f377a6a68e2f08f955db: SUCCESS. Logs show npm install, typecheck, lint all exited 0; node:test 3 passed, 0 failed, 0 skipped.
- Run #34, code SHA 81f5963b2be361b29c0f547e85e75fc26e6b1968: FAILURE at npm install. Router 58.0.31 requires expo-constants ^58.0.16 while project still pinned 58.0.15. Updated constants to 58.0.16 in eeabf5f; run #35 must verify.
- Earlier failures #31/#32 are superseded by #33 success for the previous package set.
Open: no committed package-lock, so transitive dependency reproducibility and SPDX audit remain open; device smoke test remains open; exact C00/C01 verbatim extraction remains attachment-dependent. No claim these are complete.
Next: inspect Run #35; resolve only evidence-backed peer errors. If install/typecheck/lint/tests pass, close T002 and make lockfile + SPDX audit the next task.
No paid services/store fees approved. G1 blocks online copyrighted lyric lookup. Duplicate LingoMingle- untouched.
