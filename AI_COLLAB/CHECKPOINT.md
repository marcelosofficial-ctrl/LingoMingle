# CHECKPOINT
Unit: Canonical repo migration + T002 Expo SDK 58 shell and first CI repair.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Foundation: nine research shards, index, decisions, dependencies, risks, verify backlog migrated.
App: Expo Router shell with Songs, Alphabets, Review, You tabs; strict TS; theme tokens; Liquid Glass capability guard; Linux CI.
CI evidence: runs 1-5 failed before typecheck. Run 1: setup-node npm cache failed because no lockfile. Run 4: npm install ERESOLVE because expo-router 58.0.30 peer-required expo-constants ^58.0.15; corrected. Run 5: npm install ERESOLVE because expo-router peer-required expo-linking ^58.0.16; corrected. Run 7 on commit cc81c37df4cee1101ba6737adb83f82bf270e90f is in progress at checkpoint update. Do not claim tests passed.
Open: confirm npm install succeeds; resolve subsequent peer conflicts; run typecheck/lint/tests; generate/commit package-lock; extract C00/C01 verbatim; phone test glass and layout.
No paid services/store fees approved. Duplicate LingoMingle- untouched.
Next: inspect latest CI logs, fix actual errors; complete T002 before selecting T003.