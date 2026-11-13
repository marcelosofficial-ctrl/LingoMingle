# Multilingual transliteration keyboard feasibility | 2026-11-13

## Executive decision

**Recommendation: pursue a native, offline-first keyboard as a later product track, not as an Expo-only feature and not as an AI-cloud-first feature.** It is technically feasible, but it is effectively two native products: an iOS Custom Keyboard Extension and an Android Input Method Editor (IME). Expo/React Native can power the companion app and shared settings/learning surfaces; it cannot replace the platform keyboard extension lifecycle.

The differentiator should be *English-keyboard input that produces natural Japanese/Korean writing with explainable word glosses*. Do not promise perfect automatic translation. Separate four operations:
1. **Transliteration/input**: Latin keystrokes become a target script's phonetic reading.
2. **IME conversion**: a reading becomes likely words and writing choices using dictionaries and sentence context.
3. **Translation**: a sentence's meaning is rendered in another language. This is a separate, much harder task.
4. **Glossing**: selected words receive short English meanings/grammar notes. Glosses explain a candidate; they are not translations of the whole sentence.

## User experience proposal

- Keyboard has explicit Japanese / Korean / English modes and a visible romanized-input state. Never silently change ordinary English typing into Japanese.
- User types atsui. Japanese composition shows あつい while candidate conversion offers 暑い (hot weather), 熱い (hot to touch/temperature), 厚い (thick), with sentence context re-ranking. User can accept kana or choose a candidate.
- Candidate cards may show a small English gloss and part-of-speech cue: 暑い · hot (weather/adjective). This is the reliable interpretation of “English meaning beneath each word”.
- For a phrase, keep the full composition buffer until the user commits. Use neighboring words and available left/right context to rank candidates. Offer sentence conversion as an explicit action, never replace committed text without a user tap.
- Korean needs a different pipeline. Standard Hangul IMEs compose consonant/vowel keystrokes (2-set/3-set) into syllable blocks. English romanization such as annyeong is a many-to-many, convention-dependent pronunciation hint, not a native Korean keyboard layout. Provide romanization profiles and candidate Hangul output (e.g. 안녕) with correction choices; do not pretend a simple character substitution is enough.
- Show glosses in the keyboard's candidate strip or an expandable learning panel. A third-party keyboard cannot reliably draw annotations beneath text already inserted into arbitrary host apps. In LingoMingle itself, a reading/meaning overlay can be richer.

## Platform feasibility and constraints

### iOS
Apple supports system-wide Custom Keyboard Extensions with UIInputViewController and UITextDocumentProxy. The proxy exposes documentContextBeforeInput and documentContextAfterInput, plus selectedText, so a keyboard can use available text on both sides of the cursor. It does not promise the full document or stable context across every host app; design for missing/truncated context and never assume full-sentence access. The keyboard is sandboxed by default: no network and no writable shared app group. RequestsOpenAccess plus the user's explicit Allow Full Access enables network and shared-container capabilities. Do not require it for core typing. Apple says keyboard extensions must remain functional without full network access; some host apps can reject third-party keyboards and secure fields use the system keyboard. The keyboard must provide a next-keyboard path. Sources: Apple [Creating a custom keyboard](https://developer.apple.com/documentation/uikit/creating-a-custom-keyboard), [Open access](https://developer.apple.com/documentation/uikit/configuring-open-access-for-a-custom-keyboard), [App Review Guidelines 4.4.1](https://developer-rno.apple.com/app-store/review/guidelines/).

### Android
A native InputMethodService is the system IME integration point. Android's InputConnection exposes bounded getTextBeforeCursor/getTextAfterCursor and setComposingText/commitText operations, enabling live composition and replacement before commit. Host editors can still vary in behavior, so test text fields, cursor movement, selections, password fields and rich editors. Native Android implementation and lifecycle/security testing are required. Expo app screens remain useful for settings, onboarding and vocabulary review. Source: Android [Create an input method](https://developer.android.com/develop/ui/views/touch-and-input/creating-input-method) and [InputConnection API](https://developer.android.com/reference/android/view/inputmethod/InputConnection).

**Shared conclusion:** Build platform adapters in Swift and Kotlin, with a small shared conversion core only where native integration and binary size permit. Do not depend on a network model for keystroke-by-keystroke operation. Avoid storing typed text; keep composition in memory and discard it on commit/cancel.

## Competitor landscape

- **Apple/Japanese system IME and Google Japanese Input/Mozc:** the baseline to beat for natural Japanese conversion, candidate selection and established user trust. Mozc is an open-source subset/origin of Google Japanese Input, not the entirety of Google's commercial product. Google describes IMEs as keystroke-to-language conversion tools. Source: [google/mozc](https://github.com/google/mozc), [Google Input Tools](https://www.google.com/inputtools/services/features/).
- **Simeji:** Japanese keyboard with cloud dictionary advertised at 2 million entries, slang/trend coverage, multilingual input, and AI features for replies, rewriting, translation and proofreading. It validates demand for a keyboard plus AI assistance, but its cloud-first features are not a privacy model to copy. App Store listing and Japanese listing: [Simeji](https://apps.apple.com/us/app/simeji/id899997582), [Japanese feature listing](https://apps.apple.com/jp/app/simeji-ai%E9%9F%B3%E5%A3%B0%E5%85%A5%E5%8A%9B%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89-%E9%A1%94%E6%96%87%E5%AD%97-%E7%B5%B5%E6%96%87%E5%AD%97/id899997582).
- **Microsoft SwiftKey:** broad multilingual keyboard, contextual next-word prediction, personalization, and an in-keyboard Microsoft Translator workflow. It demonstrates that translation can be an explicit keyboard tool rather than silently altering every word. SwiftKey documents 700+ Android languages and 600+ iOS languages, with different simultaneous-language limits. Sources: [language support](https://support.microsoft.com/en-us/swiftkey-keyboard/what-languages-are-currently-supported-for-microsoft-swiftkey-keyboard), [prediction and context](https://support.microsoft.com/en-us/swiftkey-keyboard/how-to-use-the-microsoft-swiftkey-keyboard), [Translator](https://support.microsoft.com/en-us/swiftkey-keyboard/how-to-use-microsoft-translator-with-your-microsoft-swiftkey-keyboard).
- **Fcitx5 for Android / FusionIME:** open-source multi-engine keyboards demonstrate modular language engines and platform integration. Fcitx5 Android lists Japanese via Anthy and Korean via Hangul plugins. FusionIME supports many CJKV layouts but is GPL-3.0. Sources: [Fcitx5 Android](https://github.com/fcitx/fcitx5-android), [FusionIME](https://github.com/Lee0701/FusionIME).
