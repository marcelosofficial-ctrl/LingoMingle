# CHECKPOINT
Unit: T006 glossary analyzer, POS namespace and spacing contract.
Status: IMPLEMENTED; latest CI Run #46 queued.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Code commits: analyzer surface binding 15bad8b; Korean token whitespace guard 7c5b5c8; POS namespace contract 28e6e27; POS fixture corrections 865c360 and f6d38e5.
Run #42 (43400504631) on 15bad8b: typecheck PASS, lint PASS, tests FAIL 13/14; failure correctly exposed Korean internal-whitespace acceptance. Guard added in 7c5b5c8. Runs #43–45 were cancelled by subsequent pushes before useful full verification. Run #46 (43400997300) targets latest code SHA f6d38e573cf5ecccd297a91aa0af727b35b472bb and is queued; do not close T006 until it finishes.
Types: GlossPartOfSpeech is {scheme, tag}. Korean morphology and dictionary entries must use the same versioned POS namespace. Kiwi Sejong-derived tags cannot be compared directly with NIKL labels. Japanese analysis has optional POS. Analyzer surface must match query; Korean morphology refuses internal whitespace; edge whitespace is trimmed.
Research recheck: NIKL official full-dictionary panel has Excel/XML/JSON updated 2026-10; login requirement UNKNOWN. Kiwi v0.24.1 Apache-2.0 offers Android AAR 13.86 MB, iOS XCFramework 46.44 MB and separate 87.97 MB model. Proof only; no adoption. Current Sudachi file-level notices and V1 format change recorded.
Next: verify Run #46; then close T006 and queue T007 Kiwi v0.24.1 native/WASM feasibility proof. No user action.
