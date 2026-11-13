# Keyboard/gloss research red-team recheck | 2026-11-13

## Corrections to earlier conclusions

1. **NIKL bulk data is not merely an unresolved possibility.** The official Korean Basic Dictionary download page currently displays a full-dictionary download panel, last uploaded 2026-10, with Excel, XML and JSON options. The exact button URL/authentication behavior was not exposed by the text-only page, so the downloadable snapshot is VERIFIED but no-login access is UNKNOWN. This supersedes the older claim that only per-search downloads were evident. The official copyright policy confirms text is CC BY-SA 2.0 Korea; audio/pronunciation/media remain separately licensed. Use the official full JSON/XML snapshot if the button is accessible without prohibited credentials; otherwise ask NIKL for a permitted export. Do not use the API key in end-user typing flow.
2. **Kiwi is a substantially stronger Korean morphology candidate than the previous shortlist indicated.** Upstream v0.24.1 is the latest release (2026-10-19); repository latest commit observed 2026-11-10. Release assets include Android AAR 13,858,682 bytes, iOS XCFramework zip 46,441,378 bytes, and a separate base model archive 87,967,233 bytes. These are source archive sizes, not installed footprint or runtime memory. Kiwi added glue/space support in 0.24.0; 0.24.1 fixes WASM stack and long-input bugs. It supplies C++, Java, Swift and WASM bindings.
3. **Kiwi iOS support documentation conflicts.** The main README still says Swift bindings are forthcoming, but the repository has a current Swift binding README, the v0.24.1 release includes an XCFramework, and the Swift guide documents Swift Package Manager. This is enough to warrant a real iOS proof build, not enough to assert a production-ready keyboard extension. Test minimum deployment, arm64 simulator/device slices, memory and extension startup.
4. **Kiwi licence is Apache-2.0 from v0.24.0 onward.** The upstream NOTICE explicitly licenses distributed model files under Apache-2.0 and says source Sejong/NIKL corpora are not redistributed or reconstructable from model files. Preserve NOTICE and audit linked components: Eigen MPL-2.0 (built with EIGEN_MPL2_ONLY), cpuinfo BSD-2-Clause, mimalloc MIT, JSON MIT, cpp-btree and streamvbyte Apache-2.0. Do not rely on the top-level SPDX alone.
5. **Sudachi data licensing needs a file-level correction.** Current SudachiDict LEGAL says distribution files are Apache-2.0; small_lex.csv includes UniDic material, matrix.def.zip is UniDic under BSD-style notice terms, and core_lex.csv/notcore_lex.csv include NEologd with detailed provenance (Hatena keywords, Japan Post postal data, station names, personal names and web-extracted pairs). Do not repeat a blanket "UniDic triple-licence" claim for every current SudachiDict file. Select exact binary/source files and ship the matching LEGAL/LICENSE/third-party notices. Current SudachiDict README also warns that v202610 changed the dictionary binary format to V1, incompatible with older V0 engines.

## Korean analyzer comparison

| Candidate | Evidence | Decision |
|---|---|---|
| Kiwi v0.24.1 | Apache-2.0; active upstream; Android AAR, iOS XCFramework, Swift and WASM bindings; morphology, multiple analyses, POS tags, normalization and glue/space support | **First prototype candidate**, gated by model size and extension memory |
| libhangul | LGPL-2.1-or-later; Hangul composition and Romaja keyboard mode | Keep as input-composition option, not a substitute for morphology/gloss analysis |
| KoNLPy | GPL-3.0-or-later; Python wrapper toolkit | Reference only under current permissive-dependency policy |
| MeCab-ko Rust port | Recent community project claims WASM and spacing correction; its README reports external gold-set F1 0.703, while its 100% figure is its own test set | Research-only; inspect licence, corpus, reproducibility and maintenance before considering |
| Kiwi-WASM | Emscripten build, npm package, model files loaded separately; Node/Vitest tests documented | Possible Expo JS prototype, but Hermes compatibility, iOS keyboard-extension memory and mobile latency remain UNKNOWN |

Kiwi's current WASM README uses KiwiBuilder.create() and explicit model-file loading. It does not make the model tiny: the official base model archive alone is about 84 MiB compressed. The native AAR/XCFramework sizes exclude the separate model archive. A candidate's code licence does not solve model distribution size or app/extension RAM.

## Architecture update

- Keep Japanese and Korean morphology adapters language-specific. Their output must include the exact source token surface, canonical lemma, POS, and reading where applicable.
- Korean analyzer output must retain original token/eojeol boundaries and analyzer POS tags. NIKL exposes POS categories as its own numeric/value scheme; Kiwi uses Sejong-derived tags such as VV/VA. Never compare raw labels. Map both into an explicit versioned POS namespace (scheme + tag) before lemma matching. Whitespace correction belongs to the analyzer; the glossary lookup must not globally delete internal spaces because spacing can change tokenization and meaning.
- The shared glossary lookup accepts an analyzer result only when its surfaceForm matches the queried token after Unicode NFKC and edge trimming. This prevents a stale or mismatched analysis from attaching an unrelated lemma/gloss.
- Gloss data stays separate from morphology models. NIKL/JMdict provide learner meanings; Kiwi/Sudachi provide tokenization/lemma/POS. Neither is the other's replacement.
- On iOS, custom keyboards run in a separate process and UITextDocumentProxy exposes bounded surrounding context and editing operations, not arbitrary full-document access. On Android, InputConnection is the IME/editor channel; its operations are asynchronous and may become invalid after focus changes. Commit text through the connection rather than synthesizing key events in normal operation.
- No typing telemetry, network lookup, or full-text persistence is introduced.

## Go/no-go

**GO:** build a throwaway Kiwi v0.24.1 proof for Android AAR and iOS XCFramework, using a fixed small corpus and memory/latency probes. Keep it outside the product dependency graph until the measurements pass.

**HOLD:** do not bundle the 87.97 MB Kiwi base model, full NIKL dictionary or JMdict in the app yet. First measure filtered/quantized model feasibility, dictionary row counts and SQLite size, extension memory, and licensing notices/update mechanics. Do not adopt Sudachi dictionary data until exact release files and notices are pinned.

## Primary sources

- NIKL full dictionary downloads: https://krdict.korean.go.kr/download/downloadPopup
- NIKL English copyright policy: https://krdict.korean.go.kr/eng/kboardPolicy/copyRightTermsInfo
- NIKL Korean licence registration policy: https://krdict.korean.go.kr/ind/openApi/openApiRegister
- Kiwi v0.24.1 release and asset sizes: https://github.com/bab2min/Kiwi/releases/tag/v0.24.1
- Kiwi NOTICE: https://github.com/bab2min/Kiwi/blob/main/NOTICE
- Kiwi Swift binding: https://github.com/bab2min/Kiwi/blob/main/bindings/swift/README.md
- Kiwi WASM binding: https://github.com/bab2min/Kiwi/blob/main/bindings/wasm/README.md
- SudachiDict current LEGAL: https://github.com/WorksApplications/SudachiDict/blob/develop/LEGAL
- SudachiDict format/version note: https://github.com/WorksApplications/SudachiDict/blob/develop/README.md
- Apple custom keyboard text interactions: https://developer.apple.com/documentation/uikit/handling-text-interactions-in-custom-keyboards
- Android InputConnection: https://developer.android.com/reference/android/view/inputmethod/InputConnection
