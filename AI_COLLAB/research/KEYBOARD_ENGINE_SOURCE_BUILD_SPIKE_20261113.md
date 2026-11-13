# Keyboard engine source/build spike | 2026-11-13

## Result

**No engine is adopted. Android Mozc is a conditional prototype GO; iOS Mozc is research-only until a real Apple-toolchain build; libhangul is a conditional Korean prototype GO only after an LGPL distribution plan.** Native builds were not run in this session. Build status is **UNKNOWN**, not passed.

## Mozc source and platform boundary

Upstream source reviewed: `google/mozc` current `master`, especially `src/README.md`, `src/android/jni/BUILD.bazel`, `src/android/jni/mozcjni.cc`, `src/ios/BUILD.bazel`, `src/ios/ios_engine.h`, `src/data_manager/oss/BUILD.bazel`, `src/data/dictionary_oss/BUILD.bazel`.

- Mozc separates converter/session/dictionary engine from platform clients. Its own `src/README.md` says Android-specific code does **not** include the Android client UI. The Android JNI target is an engine bridge, not a complete keyboard.
- Android target `//src/android/jni:mozc` links shared `libmozc.so` from JNI library `mozcjni`. Bazel declares Android-only targets for `arm64-v8a`, `armeabi-v7a`, `x86_64`, and `x86_32`; an archive target packages the four ABI outputs. The build file includes Android 15+ 16-KB page-size linker support.
- The JNI bridge exposes command evaluation and initialization around Mozc's session handler. A Kotlin `InputMethodService`, candidate UI, `InputConnection` lifecycle, permission/security handling, and adapter are still LingoMingle work.
- The iOS directory contains `ios_engine` C++ library and `ios_engine_main` binary targets. The header describes integration with Gboard, says the class is not yet mature, and expects a data-file path. The source README explicitly says Mozc does **not officially support iOS builds**. There is no ready-made iOS Custom Keyboard Extension or Swift wrapper here.
- The iOS engine target depends on Mozc base/config/client/data manager/engine/protocol/session components plus Abseil. Android also pulls the engine/session/data stack and Abseil/protobuf. This is not a tiny kana-only library; target-specific Bazel dependency closure and binary sizes must be measured.
- Build system is Bazel/Bazelisk. Current `src/MODULE.bazel` pins Abseil C++, protobuf, Bazel rules, and Android NDK r29 (configured under `third_party/ndk/android-ndk-r29`). The checked `src` tree has no `src/third_party` directory despite the general README licensing note; external Bazel modules are the relevant dependency inventory and each selected target's resolved graph still needs SPDX review.

## Dictionary/data scope

The OSS dictionary is not the commercial Google Japanese Input dictionary. `src/data/dictionary_oss/README.txt` states the main vocabulary is basically IPAdic mecab-ipadic 2.7.0-20070801, enriched with Okinawa Dictionary entries and Google-added compounds/words. It records IPAdic's notice/disclaimer and ICOT Free Software conditions; Okinawa Dictionary is stated to be public domain. Preserve all notices and the ICOT no-warranty terms if redistributing affected data. The README also says large web-corpus vocabulary and Japan Post postal-code data are not included in that OSS dictionary baseline. The current OSS dataset target shown in `data_manager/oss/BUILD.bazel` includes `dictionary_manual:domain.txt` and the external usage dictionary. The ten `dictionary00.txt`–`dictionary09.txt` files and connection matrix are not an English-gloss database.

The OSS dataset build additionally consumes `@ja_usage_dict//:usage_dict.txt` (Japanese Usage Dictionary, pinned as 2025-01-25 in `MODULE.bazel`), `data/dictionary_manual:domain.txt`, rules, emoji/emoticon/single-kanji/symbol and other data. The external Japanese Usage Dictionary has its own BSD-3-Clause LICENSE and supplies Japanese homonym definitions, not English glosses. The manual dictionary README describes the data role but does not state a separate data licence for each TSV; do not infer the code licence clears every data asset. Other rule/emoji/single-kanji/symbol data still need provenance/licence inventory. Do not infer that the top-level BSD-3-Clause code licence covers all assets.

Ten dictionary text shards plus `connection_single_column.txt` total **96,911,288 bytes (92.4 MiB)** in the upstream tree before generated dataset packaging. This is not a measured final binary or runtime footprint. It is a material warning for a memory-constrained iOS keyboard extension. A spike must measure generated `mozc.data`, resident memory, cold-start time and peak memory on devices.

## libhangul API and romanization correction

Upstream `hangul/hangul.h` exposes `HangulInputContext`, `hangul_ic_process`, `hangul_ic_backspace`, `hangul_ic_get_preedit_string`, `hangul_ic_get_commit_string`, `hangul_ic_flush`, keyboard selection and jamo/syllable conversion helpers. The model is exactly an incremental composition buffer with preedit and commit output, suitable behind an IME adapter.

**Correction to T003 wording:** libhangul does include a built-in `HANGUL_KEYBOARD_TYPE_ROMAJA` / keyboard id `ro`, with a Romaja key table and combination rules. It can accept Latin-key sequences through that specific built-in mode. It is therefore wrong to say it provides no Latin-to-Hangul input at all. It does not establish coverage for every learner romanization convention, alternate spelling, pronunciation ambiguity, word segmentation, dictionary candidate ranking, sentence-context disambiguation or English glosses. Keep a replaceable romanization-profile adapter in the design: `profileId + latinBuffer + compositionState -> jamo/key events + alternatives + consumedRange`; send selected jamo/key events to libhangul and expose preedit/commit/backspace. Test its built-in Romaja mode against independently authored Korean examples before deciding whether custom profiles are needed.

## LGPL-2.1 distribution implications

libhangul headers and COPYING identify LGPL-2.1-or-later. If the app distributes the library, provide complete corresponding library source and notices/licence. For a proprietary application using the library, LGPL 2.1 §6 generally requires a mechanism allowing users to modify/replace the library and relink or otherwise use the application with a modified compatible library. Static linking requires complete application object files and relinking materials; dynamic linking still requires source for the distributed library and a compliant replacement mechanism. If libhangul itself is modified, the modified library remains LGPL and changed files need prominent notices. These are not interchangeable with merely publishing the licence text.

iOS signing, App Store packaging and extension embedding may complicate the replacement/relink requirement. No legal conclusion is made here. Before shipping, obtain a documented distribution design and qualified licence review. If the required user freedoms cannot be supported cleanly, prefer a permissively licensed engine or an independently implemented composition core.

## No-network spike plan and build matrix

| Stage | Target | Required environment | Evidence |
|---|---|---|---|
| 1 | Mozc Android JNI | Linux/macOS, Bazelisk, pinned Bazel, Android NDK r29, SDK/NDK toolchain | Build `//android/jni:native_libs` (or `//android/jni:mozc.arm64` first) from the `src/` Bazel workspace; inspect ABI outputs, size, notices, offline startup |
| 2 | Mozc iOS engine | macOS + Xcode/iOS SDK + compatible Bazel Apple toolchain | Attempt `//ios:ios_engine` for device/simulator; if unsupported, record exact blocker; no extension claim |
| 3 | libhangul Android | NDK/CMake or Autotools cross-build, arm64 first | Shared library + JNI/Kotlin adapter; preedit/commit/backspace tests, licence packaging rehearsal |
| 4 | libhangul iOS | Xcode/iOS SDK C/C++ build | Static/dynamic framework experiment; measure extension memory and validate LGPL replacement design |
| 5 | host integrations | Android IME + iOS Custom Keyboard Extension | Context loss, selection/cursor, secure fields, next-keyboard, low-memory, offline, device tests |

Do not build or bundle all four Mozc ABIs for the first phone prototype; start arm64 and expand only when distribution needs it. Do not include the complete OSS dictionary until data licences and footprint are cleared. A no-network test must demonstrate zero network access during normal composition.

## Go/no-go gates

- **Mozc Android:** GO to an isolated, arm64-only prototype after pinning an upstream commit and auditing the resolved Bazel target closure. NO-GO for production until dictionary/data and binary/runtime budgets pass.
- **Mozc iOS:** HOLD. The source has an iOS engine layer but explicitly disclaims official iOS build support; require a successful Xcode-target build and extension memory/device proof.
- **libhangul:** CONDITIONAL GO for prototype only. First prove LGPL-compliant dynamic replacement or static relink packaging on both platforms; otherwise NO-GO for a proprietary store build.
- **Korean Romaja:** test built-in `ro` first. Add separate profile parser only where measured coverage/accuracy requires it.
- **All:** production acceptance requires offline behavior, no typed-text persistence, p95 local candidate latency target <100 ms, bounded context, user-confirmed commit, binary and peak-memory budgets, and an independently reviewed licence inventory.

**Verification:** upstream source files and licence texts inspected; native builds and device tests NOT RUN. Current environment provides repository/browser access only, so toolchain/build output remains UNKNOWN.
