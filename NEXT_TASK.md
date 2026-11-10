# NEXT_TASK
ID: T002
Goal: Verify current Expo SDK and compatible starter stack, then create minimal TypeScript Expo shell with Linux CI.
Acceptance: verify official current Expo docs for Router/SQLite/Reanimated/glass; pin exact SDK/package versions; tabs Songs, Alphabets, Review, You; strict TypeScript, lint and unit-test scaffold; Linux Actions CI on push/PR; native-only features isolated behind platform/capability checks.
Files allowed: package.json/lockfile, app config, tsconfig, lint/test configs, app/**, src/theme/**, .github/workflows/ci.yml, STATE.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/INDEX.md.
Out of scope: lyric API, accounts/backend, paywall, cloud sync, native Apple build, copyrighted content.
Line budget <=350 changed lines. Verification: actual CI output for typecheck, lint and tests.