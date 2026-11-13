# Multilingual transliteration keyboard: engines and delivery | 2026-11-13

## Open-source reuse candidates

| Project | What it can provide | Licence / decision |
|---|---|---|
| [Mozc](https://github.com/google/mozc) | Mature Japanese reading-to-kanji candidate conversion, dictionary-backed prediction, Android/native code reference | Mozc-authored code BSD-3-Clause. Third-party directories and dictionary_oss are mixed; dictionary contents have separate conditions. **Best Japanese engine candidate**, pending per-component licence audit, native build/Hermes integration spike and data audit. |
| [libhangul](https://github.com/libhangul/libhangul) | Hangul jamo composition and Korean IME logic, Hanja dictionary support | LGPL-2.1. **Best Korean composition candidate**; review LGPL linking/distribution obligations and test Android/iOS builds. It does not by itself solve English romanization. |
| [librime](https://github.com/rime/librime) | Extensible cross-platform C++ IME framework and schema system | BSD-3-Clause core; runtime dependencies include Boost, LevelDB, Marisa, OpenCC and yaml-cpp, each needing audit. Flexible but likely too broad/heavy for first MVP. |
| [Fcitx5 Android](https://github.com/fcitx/fcitx5-android) | Real Android IME integration and plugin architecture reference | LGPL-2.1 framework; plugins and bundled engines have separate licences. Study, do not import wholesale. |
| [FusionIME](https://github.com/Lee0701/FusionIME) | Multi-language UX and integration reference | GPL-3.0; **do not copy or link into proprietary app**. |
| [WanaKana](https://github.com/WaniKani/WanaKana) | Small romaji/kana conversion utility | MIT per current dependency ledger. Candidate only for kana conversion; not a kanji converter, dictionary or translation engine. |

Mozc code licensing does not automatically clear its dictionary. Its README explicitly flags mixed third-party content and src/data/dictionary_oss; audit the exact files and distribution obligations before shipping any dictionary. Do not copy Google proprietary vocabulary, cloud services, commercial model weights, or third-party app assets.

## Architecture recommendation

1. **Input buffer:** incremental Latin composition with explicit language mode, undo/cancel, punctuation boundaries and user corrections.
2. **Japanese adapter:** romaji normalizer → kana reading → Mozc conversion candidates → context re-ranking. Preserve kana as a valid candidate. Later add tokenizer/lemma/reading metadata for glosses; existing Kuromoji/Hermes feasibility remains unverified.
3. **Korean adapter:** selectable romanization parser → jamo/syllable composer (libhangul candidate) → dictionary/lexicon candidates → contextual ranking. Research and test Revised Romanization variants and common learner spellings separately.
4. **Context ranker:** first use local candidate scores, dictionary frequency, part of speech, preceding/following tokens and a small local language model only if benchmarks justify it. Never transmit keystrokes by default. Cloud AI may be an optional, explicit sentence-level explanation feature later, subject to approval and platform policy.
5. **Gloss layer:** local licensed dictionary entries with concise English gloss, POS and confidence. Unknown words show “meaning unavailable”, not fabricated AI certainty. Distinguish lexical gloss from full-sentence translation.
6. **Native shells:** Swift keyboard extension and Android InputMethodService; Expo companion app for onboarding, language settings, dictionaries, learning history and in-app annotated practice.

## Delivery sequence and gates

- **Spike A:** Android Mozc and libhangul native integration, offline, latency/memory/binary-size benchmarks, exact licence inventory.
- **Spike B:** iOS extension prototype with local conversion only, measure context proxy behavior, candidate strip, extension memory and host-app compatibility.
- **Spike C:** Korean romanization ambiguity corpus made from original/synthetic examples; compare multiple romanization profiles and user correction burden.
- **MVP:** Japanese romaji→kana→kanji plus candidate glosses, then Korean romanization→Hangul beta. Keep typing fully offline, explicit language mode, and user-confirmed conversion.
- **Acceptance metrics:** p95 local candidate latency <100 ms on supported mid-range devices; zero network requests during ordinary typing; candidate accept rate, correction rate and wrong-script insertions measured on synthetic/original test suites; no unbounded context reads; no data persistence after commit; keyboard usable with full access disabled (iOS).

## Unknowns that must be verified before implementation

- Whether Mozc and libhangul can be built, linked and packaged cleanly in both iOS extension and Android IME targets under our chosen native toolchain.
- Mozc dictionary file-by-file licensing and whether its OSS vocabulary is sufficient for learner-oriented glossing.
- libhangul romanization behavior (not assumed) and quality of any separate Latin parser.
- iOS extension memory/time limits and actual context proxy behavior across common apps.
- Native keyboard implementation/build integration with the current Expo SDK 58 project.
- Whether local compact contextual models materially improve conversion over a strong dictionary engine without harming latency, battery, binary size or privacy.

**Decision:** pursue a feasibility spike before adopting engines. The likely best route is Mozc + a separately licensed gloss dictionary for Japanese, libhangul + a purpose-built romanization front-end for Korean, and a shared UX/spec with separate native keyboard adapters. Do not start with an LLM translating every keystroke.


## Context and word-meaning caveats

Apple's documented UITextDocumentProxy exposes context before and after the cursor and selected text; Android InputConnection exposes requested character windows and explicit composing-text APIs. Neither should be treated as a guarantee that the entire sentence or document is readable. The converter should rank from the current composition plus a bounded, optional context window, degrade gracefully when context is unavailable, and avoid reading more than needed. Sources: [Apple text interactions](https://developer.apple.com/documentation/uikit/handling-text-interactions-in-custom-keyboards), [Apple UITextDocumentProxy](https://developer.apple.com/documentation/uikit/uitextdocumentproxy), [Android InputConnection](https://developer.android.com/reference/android/view/inputmethod/InputConnection).

Japanese “word beneath word” glossing requires segmentation and lexical analysis because ordinary Japanese text does not use spaces between words. A gloss layer therefore depends on a tokenizer/morphological analyzer plus a licensed dictionary, and should display one gloss per selected candidate/token rather than pretending every character maps to an English word. Keep the sentence translation feature separate and label machine-generated explanations as such.
