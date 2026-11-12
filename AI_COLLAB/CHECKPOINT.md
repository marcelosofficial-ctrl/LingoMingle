# CHECKPOINT
Unit: T002 SDK 58 starter shell and CI compatibility.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Current branch head at checkpoint: b1529c2aefa55ddfe6ab76237d6c4bafdd8c75ef.
App: strict TypeScript, Expo Router shell, stable SDK 58 NativeTabs (Songs, Alphabets, Review, You), native SF Symbols/Material icons, theme tokens, Liquid Glass capability guard, Linux CI.
Pinned stack: Expo 58.0.23, Router 58.0.31, SQLite 58.0.16, GlassEffect 58.0.5; React 19.3.0, RN 0.88.1, Reanimated 4.7.1 + Worklets 0.13.0; TS 6.0.3, ESLint 10.14.0, eslint-config-expo 58.0.4, eslint-import-resolver-typescript 4.4.5.
Official SDK 58 docs checked 2026-11-12: Router native-tabs recommends ~58.0.31 and is stable from SDK58; SQLite recommends ~58.0.16 and persists across restarts; SDK58 maps RN0.88/React19.3 and Node22.13.x; Reanimated recommends 4.7.1; GlassEffect recommends ~58.0.5 and falls back to View off iOS26 / when unsupported.
CI evidence:
- Run #33, code SHA 7cc68679f2abb08425e9f377a6a68e2f08f955db: SUCCESS. Logs show npm install, typecheck, lint all exited 0; node:test 3 passed, 0 failed, 0 skipped.
- Run #34, code SHA 81f5963b2be361b29c0f547e85e75fc26e6b1968: IN_PROGRESS at checkpoint. This updates Router and SQLite to the current SDK58 recommended patch versions. Poll before closing T002.
- Earlier failures #31/#32 are superseded by #33 success.
Open: no committed package-lock, so transitive dependency reproducibility and SPDX audit remain open; iPhone/Android device smoke test remains open; exact C00/C01 verbatim source extraction remains attachment-dependent. Do not claim those complete.
Next: inspect Run #34. If all quality steps pass, close T002 and set next task to lockfile + SPDX audit, preserving device and source extraction as separate verification backlog. If failure, fix only evidence-backed issues and rerun.
No paid services/store fees approved. G1 still blocks online copyrighted lyric lookup. Duplicate LingoMingle- untouched.
