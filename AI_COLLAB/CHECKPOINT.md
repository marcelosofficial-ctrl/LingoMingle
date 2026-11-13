# CHECKPOINT
Unit: T007 Kiwi v0.24.1 integration and deployment feasibility.
Status: COMPLETE as source-level research; no product dependency/model adopted.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T006: COMPLETE/VERIFIED. CI #46 on code SHA f6d38e573cf5ecccd297a91aa0af727b35b472bb passed install/typecheck/lint and 15/15 tests (0 fail/skipped).
T007 research: AI_COLLAB/research/KEYBOARD_KIWI_FEASIBILITY_SPIKE_20261113.md. Kiwi v0.24.1 tag 724d00718f527bac3f8aef2f6ae3b6523b2aae74; latest main commit observed 6f7e5b80161b593dceb197e01f582ead82a736d9. Apache-2.0 from v0.24.0, NOTICE covers model files; third-party notices audited. Upstream release workflow #71 and Swift workflow #46 succeeded; latest main Ubuntu/Windows/macOS/WASM runs succeeded.
Assets: Android AAR 13,858,682 bytes (arm64-v8a + x86_64, minSdk21); iOS/macOS XCFramework zip 46,441,378 bytes; separate model archive 87,967,233 bytes. Model uncompressed size/RSS UNKNOWN. Android can use StreamProvider. iOS Swift package manifest is nested under bindings/swift, not repo root; upstream Swift CI built/tested package and XCFramework. WASM requires Emscripten, loads model files separately, and builder.build() is synchronous; Expo native Worker API is unavailable by default. Use native AAR/Swift integration for native app/IME; WASM is web candidate only.
No LingoMingle native build/integration performed. Keyboard extension process memory, model duplication and startup/latency remain UNKNOWN. Keep Kiwi as proof candidate, not adopted.
Commits: T007 research 978246f; index f3dceaf; dependency audit 8ec878f; decision 837c4f4; state ed292d9; T008 queue 7169546.
Next: T008 deterministic Kiwi↔NIKL POS crosswalk, preserve raw tags and ambiguous categories. No user action.
