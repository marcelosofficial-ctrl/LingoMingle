# CHECKPOINT
Unit: T006 source-agnostic offline glossary contract and synthetic tests.
Status: IMPLEMENTED; GitHub CI pending, so not yet marked verified.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Files: `src/features/glossary/types.ts` defines source provenance/licence/version, language, surface forms, lemma, reading, POS, senses and match result. `matching.mjs` implements deterministic offline lookup only; `matching.d.mts` provides TypeScript signatures. `tests/glossary.test.mjs` contains eight synthetic tests.
Behavior: exact surface matches first; Japanese reading can return all homonyms, while lemma matches require reading; Korean inflected-form matches require lemma + POS. No sentence translation, morphology, transliteration, context ranker, network, persistence or third-party data is included. Unknown words return no gloss. Source IDs remain attached to every result.
Commits: T006 implementation d17495086b12bbb524eee3421aa3aa7d20f7dbf8; added NFKC/whitespace test b14da0a2d19f0c301117bda1188f35af08208031.
CI: Run #37 (43336679336) on d17495086b12bbb524eee3421aa3aa7d20f7dbf8 was in progress at npm install; Run #38 (43336711890) on latest code SHA b14da0a2d19f0c301117bda1188f35af08208031 was pending. No typecheck/lint/test result yet.
T004 research: Android Mozc JNI engine only; no Android UI. iOS engine source exists but upstream does not officially support iOS builds. libhangul built-in Romaja mode exists. Native builds NOT RUN. See AI_COLLAB/research/KEYBOARD_ENGINE_SOURCE_BUILD_SPIKE_20261113.md.
T005 research: JMdict and NIKL Korean Basic Dictionary are best gloss candidates but no data imported; share-alike, update and export gates remain. See AI_COLLAB/research/KEYBOARD_GLOSS_DATA_RESEARCH_20261113.md.
Next: wait for Run #38, inspect all quality steps, fix failures, then checkpoint T006 and queue next task. No user action needed.
