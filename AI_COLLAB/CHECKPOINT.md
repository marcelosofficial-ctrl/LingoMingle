# CHECKPOINT
Unit: T008 Korean POS crosswalk adapter and synthetic tests.
Status: IMPLEMENTED; latest CI Run #48 pending.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T006 COMPLETE/VERIFIED: CI #46 on code SHA f6d38e573cf5ecccd297a91aa0af727b35b472bb passed install/typecheck/lint and 15/15 tests.
T007 COMPLETE as source-level research: AI_COLLAB/research/KEYBOARD_KIWI_FEASIBILITY_SPIKE_20261113.md. Upstream Kiwi v0.24.1 Android AAR, Swift/XCFramework, and WASM builds verified; no LingoMingle integration or model adoption. Model archive 87.97 MB; app/extension memory remains UNKNOWN.
T008 code: src/features/glossary/korean-pos.mjs maps Kiwi Sejong-derived and NIKL POS source tags into versioned lingomingle-pos-v1. It preserves raw source scheme/tag. Only unambiguous categories map; VX, VCP/VCN, punctuation, foreign/numeric and unknown tags return null. NIKL 0/15 remain unresolved. GlossPartOfSpeech.source stores provenance; KoreanTokenAnalysis.partOfSpeech is optional so unresolved tags cannot pass lemma matching.
Tests: tests/korean-pos.test.mjs covers mapping groups, irregular suffixes, NIKL codes + Korean labels, ambiguous/unmapped tags, source preservation, canonical cross-source match and unresolved fallback. Synthetic POS tags only; no dictionary entries.
T008 commits: mapper/types/tests 13fb790; public RawKoreanPos export 5877728; research shard fd11d1a; index eabc4f1.
CI: Run #48 (43401844138) targets latest code SHA 5877728caa2238c7cf803ca36c3e8210ed1b3f43; currently pending/in progress. Run #47 was superseded and has no final result. Do not close T008 until #48 finishes.
Next: verify #48; fix any failures; close T008 and queue T009 NIKL/JMdict snapshot acquisition and licensing/package audit.
