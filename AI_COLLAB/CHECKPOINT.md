# CHECKPOINT
Unit: T006 completed; T007 Kiwi feasibility spike queued.
Status: T006 COMPLETE and VERIFIED. T007 is the next task.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Latest code SHA: f6d38e573cf5ecccd297a91aa0af727b35b472bb. CI Run #46 (43400997300) completed SUCCESS: npm install, typecheck, lint and npm test; TAP 15/15 passed, 0 failed, 0 skipped. Later commits are documentation-only.
Code files: src/features/glossary/types.ts, matching.mjs, matching.d.mts, index.ts, tests/glossary.test.mjs.
Contract: GlossSource records version/licence/attribution/provenance. GlossEntry carries language, surface forms, lemma, reading, POS namespace, senses and optional learner metadata. Japanese/Korean analyzer outputs must identify the exact queried token; Japanese lookup uses reading/lemma, Korean uses lemma + POS. POS compares explicit {scheme, tag}; raw Kiwi/NIKL tags must be mapped to one versioned LingoMingle scheme. Korean morphology rejects internal whitespace; edge whitespace is trimmed. Exact surface matching can work without morphology. Unknown words return no invented gloss.
Research corrections: NIKL official full-dictionary panel offers Excel/XML/JSON updated 2026-10; login condition UNKNOWN. Kiwi v0.24.1 Apache-2.0 has Android AAR 13.86 MB, iOS XCFramework 46.44 MB, and separate 87.97 MB base model; proof candidate only. Sudachi file-level notices and V1 format change documented. KANJIDIC2 SKIP is not NC-SA; owner says CC BY-SA 4.0, but EDRDG page still says prior permission for commercial apps; omit pending written clarification.
Commits: code POS fixture correction f6d38e5; research/licence corrections 584426c, 69d70f0, 4555756, 94ceb5f, cd94abcd; T006 close af7e292; T007 queue 6d71492; state fa9eff9.
Next: T007 Kiwi v0.24.1 Android/iOS/WASM integration and model feasibility. No user action.
