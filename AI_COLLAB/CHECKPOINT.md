# CHECKPOINT
Unit: T006 analyzer/lookup correctness and red-team research corrections.
Status: IMPLEMENTED; latest CI Run #44 pending/in progress.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Code commits: analyzer surface binding 15bad8b; Korean token whitespace guard 7c5b5c8; POS namespace contract 28e6e27.
Research/docs commits: research recheck cd9b0cf; index 31f0e06; dependency audit 78a42a2; state reconciliation 750a4ad; POS nuance 47728c5; decisions 5176b45.
Run #42 (43400504631) on 15bad8b: typecheck PASS, lint PASS, tests FAIL 13/14; internal Korean whitespace exposed a real analyzer-token validation defect. Guard added in 7c5b5c8. Run #43 was superseded while it remained at setup/npm install; final outcome not used. Run #44 (43400807296) targets 28e6e2766eb35acad6392d7144eac1ca76a6d2d5 and is currently in progress at setup-node; no final quality results yet.
Types: GlossPartOfSpeech is {scheme, tag}. Korean morphology and dictionary entry must use the same versioned POS namespace. Kiwi Sejong-derived tags cannot be compared directly with NIKL labels. Japanese analysis has optional POS. Analyzer surface must match query; Korean morphology refuses internal whitespace; edge whitespace is trimmed.
Research recheck: NIKL official full-dictionary download panel has Excel/XML/JSON updated 2026-10; login requirement UNKNOWN. Kiwi v0.24.1 Apache-2.0 offers Android AAR 13.86 MB, iOS XCFramework 46.44 MB and separate 87.97 MB model. Proof only; no adoption. Sudachi current file-level notices and V1 format change recorded.
Next: verify Run #44, then close T006 and queue T007: Kiwi v0.24.1 native/WASM feasibility proof plan. No user action.
