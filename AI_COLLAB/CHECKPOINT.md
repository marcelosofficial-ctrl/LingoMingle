# CHECKPOINT
Unit: T006 source-agnostic offline glossary contract and synthetic tests.
Status: IMPLEMENTED; latest GitHub CI Run #41 is still in progress, so T006 is not yet verified/closed.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Files: `src/features/glossary/types.ts` defines source provenance/licence/version, language, surface forms, lemma, reading, POS, senses, optional learner level/frequency/domain metadata and match result. `matching.mjs` implements deterministic offline lookup; `matching.d.mts` provides TypeScript signatures; `index.ts` exports the typed module API. `tests/glossary.test.mjs` has eight synthetic cases.
Behavior: exact surface matches first; Japanese reading can return all homonyms, while lemma matches require reading; Korean inflected-form matches require lemma + POS. Unknown words return no invented gloss. Source IDs and optional learner metadata remain attached. Transliteration, morphology, sentence translation, context ranking, network, persistence and third-party data are intentionally not implemented.
Commits: core implementation d17495086b12bbb524eee3421aa3aa7d20f7dbf8; NFKC test b14da0a2d19f0c301117bda1188f35af08208031; module export 4b0358bdcae5677b70aec95f4fcb8344f6cbd3c4; optional learner metadata fbed6fe35bc9c569055cb390a353955956099264; metadata preservation test 9b00bc400fe4fa5e90f1e7bee163a168b4297f3d.
CI: Run #41 (43336915849) targets latest code SHA 9b00bc400fe4fa5e90f1e7bee163a168b4297f3d. Job is in progress at `npm install --no-audit --no-fund`; typecheck, lint and tests have not started. Earlier runs #37–40 were cancelled by newer pushes. Do not report a pass until Run #41 completes.
T004: Android Mozc JNI engine only; no Android UI. iOS engine source exists but upstream does not officially support iOS builds. libhangul built-in Romaja mode exists. Native builds NOT RUN. See AI_COLLAB/research/KEYBOARD_ENGINE_SOURCE_BUILD_SPIKE_20261113.md.
T005: JMdict and NIKL Korean Basic Dictionary are best gloss candidates but no data imported; share-alike, update and export gates remain. See AI_COLLAB/research/KEYBOARD_GLOSS_DATA_RESEARCH_20261113.md.
Next: inspect Run #41, repair any typecheck/lint/test failures, then close T006 and queue the next task. No user action needed.
