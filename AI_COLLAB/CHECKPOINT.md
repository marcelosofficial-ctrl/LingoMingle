# CHECKPOINT
Unit: T006 offline glossary contract, analyzer safety, Korean spacing and POS namespace.
Status: COMPLETE and VERIFIED by GitHub CI.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Latest code SHA: f6d38e573cf5ecccd297a91aa0af727b35b472bb. CI Run #46 (43400997300) completed SUCCESS: npm install, typecheck, lint and npm test all passed; TAP 15/15 passed, 0 failed, 0 skipped. Run #42 previously exposed a Korean internal-whitespace defect; it was fixed and the latest run confirms it.
Code files: src/features/glossary/types.ts, matching.mjs, matching.d.mts, index.ts, tests/glossary.test.mjs.
Contract: GlossSource records version/licence/attribution/provenance. GlossEntry carries language, surface forms, lemma, reading, POS namespace, senses and optional learner metadata. Japanese/Korean analyzer outputs must identify the exact queried token; Japanese lookup uses reading/lemma, Korean uses lemma + POS. POS compares explicit {scheme, tag}; no raw Kiwi/NIKL tag comparison. Korean morphology rejects internal whitespace; edge whitespace is trimmed. Exact surface matching can work without morphology. Unknown words return no invented gloss.
T004/T005 research recheck: AI_COLLAB/research/KEYBOARD_GLOSS_RESEARCH_RECHECK_20261113.md. NIKL official full dictionary download panel offers Excel/XML/JSON, last uploaded 2026-10; authentication conditions UNKNOWN. Kiwi v0.24.1 is best Korean morphology proof candidate but its base model archive is 87.97 MB; no adoption. Sudachi file-level licensing and format issues documented. KANJIDIC2 SKIP is not NC-SA; owner says CC BY-SA 4.0, while EDRDG page still says prior permission for commercial apps. Omit pending written clarification.
Commits: analyzer 15bad8b; Korean whitespace 7c5b5c8; POS namespace 28e6e27; fixture corrections f6d38e5; research/docs recheck commits 584426c, 69d70f0, 4555756, 94ceb5f.
Next: T007 Kiwi v0.24.1 Korean morphology feasibility spike (native Android/iOS and WASM), no dependency/model adoption. No user action.
