# CHECKPOINT
Unit: T006 glossary correctness hardening and POS namespace contract.
Status: IMPLEMENTED; awaiting latest CI.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Commits: analyzer surface binding 15bad8b; Korean token whitespace guard 7c5b5c8; POS namespace model 28e6e27.
Run #42 (43400504631) on 15bad8b: typecheck PASS, lint PASS, tests FAIL 13/14. Test found Korean morphology accepted a token containing internal whitespace. Guard added in 7c5b5c89. Run #43 was superseded by the POS contract commit before its full result was available.
Current types: GlossPartOfSpeech carries a required scheme + tag. Korean morphology and dictionary entries must use the same normalized POS scheme; this prevents false negatives/positives when Kiwi Sejong tags (e.g. VV) are compared to NIKL dictionary POS labels. Exact surface matches still do not require analyzer POS. Japanese POS metadata is optional and checked only when both sides supply it.
Korean token morphology rejects internal whitespace; edge whitespace is trimmed. Analyzer surface must match the exact queried token before morphology matching.
Research recheck: AI_COLLAB/research/KEYBOARD_GLOSS_RESEARCH_RECHECK_20261113.md. NIKL official full-dictionary panel has Excel/XML/JSON updated 2026-10; exact download auth unknown. Kiwi v0.24.1 has native Android/iOS artifacts and 87.97 MB separate model; proof only, no adoption. Current Sudachi file-level licence nuance recorded.
Next: inspect latest CI on 28e6e27; repair any failures; only then close T006 and queue T007 Kiwi native/WASM feasibility proof.
