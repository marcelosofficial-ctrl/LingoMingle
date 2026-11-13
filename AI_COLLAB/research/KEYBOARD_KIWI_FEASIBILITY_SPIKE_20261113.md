# Kiwi v0.24.1 integration feasibility spike | 2026-11-13

## Verdict

**Conditional GO for an app-local native proof; NO-GO for adoption or keyboard bundling yet.** Kiwi is a real, maintained Korean morphology engine with upstream Android, iOS and WASM build evidence. Its model footprint and keyboard-extension integration are the blockers, not basic source availability.

Pinned release: v0.24.1, tag commit 724d00718f527bac3f8aef2f6ae3b6523b2aae74 (2026-10-19). Upstream main commit observed 2026-11-12: 6f7e5b80161b593dceb197e01f582ead82a736d9. v0.24.0 added glue/space support to C++, C API, Java and WASM and 16 KB Android page alignment; v0.24.1 fixes WASM stack and long-input issues.

## Build and release evidence

- Upstream v0.24.1 release workflow run #71 (2026-10-19) completed SUCCESS. Android AAR build/upload, macOS libraries, model archive, Emscripten build and npm publish all completed.
- Upstream Swift workflow run #46 on the v0.24.1 tag completed SUCCESS: C++ static library, Swift package build, Swift tests, iOS/macOS XCFramework build and release upload.
- Upstream main commit 6f7e5b8 (2026-11-12) has successful Ubuntu, Windows, macOS, CentOS and WASM CI runs.
- These are VERIFIED upstream builds, not builds of LingoMingle. No Kiwi code has been built or integrated in this repo.

## Licence and distribution

Kiwi code and its distributed model files are Apache-2.0 from v0.24.0 onward. Upstream NOTICE says the model files are trained on Sejong Corpus and NIKL corpora, but those source corpora are not redistributed and cannot be reconstructed from the model. Retain LICENSE and NOTICE. Audit bundled components individually: Eigen MPL-2.0 built with EIGEN_MPL2_ONLY, cpuinfo BSD-2-Clause, mimalloc MIT, nlohmann JSON MIT, cpp-btree and streamvbyte Apache-2.0. No dependency or model adopted.

Release assets (compressed archive sizes, not installed size or runtime RAM):
- Android AAR: 13,858,682 bytes.
- iOS/macOS XCFramework zip: 46,441,378 bytes.
- Separate base model archive: 87,967,233 bytes.
The extracted model footprint, peak RSS, model load time and extension memory use are UNKNOWN.

## Platform findings

### Android native

Official Java/Kotlin AAR is the strongest route for the native app and Android IME. Upstream Gradle config targets minSdk 21, compileSdk 34, AGP 8.1.4, CMake 3.22.1 and NDK 27.1.12297006; release AAR ABIs are arm64-v8a and x86_64. The CMake link options align native libraries to 16 KB pages. The release workflow separately sets up NDK r25c before Gradle, while the module pins NDK 27.1.12297006; the successful build suggests Gradle resolves the pinned version, but reproduce and pin this explicitly.

Model files are separate from the AAR. KiwiBuilder.StreamProvider can read model assets without copying them to a filesystem path. Token output includes form, POS tag, source position and length. It supports typo correction, spacing and glue. The actual 87.97 MB model archive must be unpacked and measured before any keyboard integration.

### iOS native

A real Swift binding exists under bindings/swift, with Package.swift in that subdirectory, iOS 12+ / macOS 10.14+ deployment declarations, C API bridging and a static C++ library. The upstream v0.24.1 Swift CI built and tested it on macOS and produced the XCFramework. Its XCFramework script builds iOS device arm64, simulator arm64+x86_64, and macOS arm64+x86_64.

The model is separate and Swift KiwiBuilder loads it from a Bundle resource directory. The main README's remote Swift Package Manager URL points to the repository root, but the manifest is nested under bindings/swift; root Package.swift is absent. Do not assume a normal remote .package(url: repo) works as documented. The release workflow prints a binaryTarget snippet for the XCFramework; verify this exact integration in LingoMingle's own package setup before use.

A keyboard extension is a separate target/process. Do not assume it can read the containing app's private model path or reuse the app's loaded Kiwi instance. Test a model embedded in the extension and any permitted app-group alternative with Full Access disabled. If the model must be duplicated in app and extension bundles, the installed-size cost may be unacceptable.

### WASM / Expo

The npm package kiwi-nlp v0.24.1 is Apache-2.0. WASM build uses Emscripten; upstream CI uses Node 24 for publishing and Node 20 for package tests. CMake sets ALLOW_MEMORY_GROWTH=1 and a 256 KB stack. The builder loads separate model files and explicitly warns that build() runs synchronously in the same JS context and can hang the app; it recommends creating the builder and Kiwi instance in a worker.

Expo/React Native's native Worker API is not provided by default. Expo docs state Worker is traditionally unavailable in React Native and is only useful on web unless a native polyfill/module is added. Therefore:
- **Web:** WASM is a plausible offline option, after model-size and browser-worker tests.
- **Expo native app:** prefer a native Expo module/JSI bridge to the Android AAR and iOS library, with analysis off the UI thread.
- **System keyboard:** call Kiwi directly from Kotlin InputMethodService / Swift keyboard extension; do not route per-keystroke analysis through the React Native JS bridge.

## Mapping to T006 contract

Kiwi token fields map to KoreanTokenAnalysis.surfaceForm, lemma and a versioned GlossPartOfSpeech. Its POS tags are Sejong-derived (e.g. VV/VA); NIKL uses a different POS value scheme. Build a tested crosswalk into a stable internal scheme such as lingomingle-pos-v1 before matching. Preserve token offsets and original spacing. Kiwi morphology does not provide English learner glosses; NIKL remains the separate gloss source.

## Proof matrix and gates

| Target | Upstream status | LingoMingle proof still required |
|---|---|---|
| Android AAR / arm64-v8a | VERIFIED release build | Install into app and IME service; model loading, 16 KB page check, cold/warm init, peak RSS, per-token p50/p95 |
| Android x86_64 | VERIFIED release ABI | Emulator smoke test only; do not treat as production ABI |
| iOS device arm64 | VERIFIED XCFramework build | Link in app + keyboard extension; model bundle access, signing, memory and startup |
| iOS simulator arm64/x86_64 | VERIFIED XCFramework build | Simulator smoke test; device performance remains separate |
| WASM browser | VERIFIED upstream build/tests | Model loading, worker, memory growth, spacing/glue and offline assets |
| Expo native WASM | UNKNOWN / not recommended | Requires a native worker/polyfill and must prove non-blocking execution |
| Keyboard host integration | NOT TESTED | Password fields, secure entry, focus changes, cursor/selection, context privacy and extension termination |

Acceptance targets: no network requests or typed-text persistence; model loads once per process; candidate/analysis p95 under 100 ms on a supported mid-range device; no UI-thread blocking; stable token offsets; correct POS crosswalk; graceful fallback when model unavailable. These are project targets, not measured results.

**Decision:** keep Kiwi as first Korean morphology prototype candidate. Do not add the package, AAR, XCFramework or model to the product yet. First run the smallest native proof and measure the model. If the 87.97 MB model cannot meet extension size/RAM constraints, evaluate a filtered model or a lighter analyzer before adoption.

## Primary references

- Kiwi v0.24.1 release: https://github.com/bab2min/Kiwi/releases/tag/v0.24.1
- Upstream Android binding: https://github.com/bab2min/Kiwi/blob/main/bindings/java/README.md
- Upstream Swift manifest and development guide: https://github.com/bab2min/Kiwi/tree/main/bindings/swift
- Upstream WASM binding: https://github.com/bab2min/Kiwi/tree/main/bindings/wasm
- Kiwi NOTICE: https://github.com/bab2min/Kiwi/blob/main/NOTICE
- Expo Hermes: https://docs.expo.dev/guides/using-hermes/
- Expo native Worker limitation: https://docs.expo.dev/versions/latest/config/metro/
- NIKL POS scheme: https://krdict.korean.go.kr/eng/openApi/openApiInfo
