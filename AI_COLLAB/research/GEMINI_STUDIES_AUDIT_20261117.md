# Gemini Studies — evidence audit and project intake
Reviewed: 2026-11-17
Source: `main:Studies` in `marcelosofficial-ctrl/LingoMingle`
Disposition: selected strategic findings accepted; no code, data, model, paid service or lyric source adopted.

## Executive finding
The handoff has useful long-range product and learning design ideas, but it is not safe to implement as written. Its strongest value is separating linguistic layers, applying evidence-aware curriculum design, creating original mnemonic content, and explicitly recognising mobile performance/licensing unknowns. Several platform and commercial claims are stale or insufficiently sourced. Existing project decisions and release gates remain authoritative.

The study uses grouped numeric citations across many claims rather than traceable claim-to-source references. Its bibliography omits the 2022 ILH systematic review named in the text and Nation's 2007 primary Four Strands paper, while relying on secondary/commercial sources for several important claims. This audit therefore privileges official upstream documentation and primary research.

## Accepted design guidance
1. **Four Strands is a course-level balance, not a per-session quota.** Nation's framework is meaning-focused input, meaning-focused output, language-focused learning and fluency development, with roughly equal time across a well-designed course. Use it to prevent LingoMingle becoming only flashcards and drills. Do not force every lesson or individual session into four equal 25% blocks.
2. **ILH is a task-design checklist, not an optimizer.** Need, Search and Evaluation prompt designers to ask whether a task is meaningful, requires useful retrieval/search, and asks learners to compare or use language. The 2022 systematic review covered 78 studies and found partial support in some task types, but also inconsistent predictive results, measurement differences, an adult-learner skew and incomplete coverage of word knowledge. Do not turn ILH scores into mastery probabilities or a scheduler. Pair recognition with productive recall and contextual use as features develop.
3. **Use distinctive visual mnemonics authored by LingoMingle.** Imagery can add a separate memory cue instead of merely repeating a text label. Treat universal reaction-time rankings as unverified and validate designs with learners. Do not reproduce WaniKani, Heisig, Dr. Moku or other proprietary stories/art. Keep canonical character/component identity and official linguistic information separate from editable, versioned learner mnemonic stories and answer aliases.
4. **Keep language-processing layers separate.** Script conversion, morphology/POS, dictionary lookup and predictive IME are different jobs; this reinforces D011/D012. WanaKana is a useful MIT candidate for deterministic Romaji↔kana conversion, not a Japanese morphological analyzer. `es-hangul` is MIT and offers Hangul operations including initial-consonant extraction and particle attachment. Its QWERTY-to-Hangul keyboard mapping is not Revised-Romanization-to-Hangul. Neither package is adopted or needed for the current kana chart/practice scope.
5. **Native contextual conversion is future research, not an MVP dependency.** AzooKeyKanaKanjiConverter is MIT Swift code; upstream specifies iOS 16+ and Swift 6.1+. Zenz-v2.5 weights are CC BY-SA 4.0 and intended for the converter, but model/runtime size, memory, latency, Expo integration and Android parity remain unverified. Apple NaturalLanguage supports tokenization/tagging/lemma/lexical class; it is not a kana-kanji generator. The proposed light keyboard-extension/heavier in-app split is a hypothesis, not an accepted architecture.
6. **Isolate data by licence.** Kanji alive's language data/media are generally CC BY 4.0 but its credits page lists exclusions including mnemonic hints and supported dictionaries; inspect every asset and exception before reuse. KanjiVG is CC BY-SA 3.0. JMdict/KANJIDIC2 and NIKL rights are already tracked in project records; the Korean production-distribution HOLD is unchanged.

## Rejected, corrected or still unknown
- **LRCLIB:** its API returns plain/synced lyrics and Lyricsfile payloads. Lyricsfile's CC0 dedication covers its format specification, documentation and examples—not third-party song lyrics stored in LRCLIB. It does not grant a blanket lyric display licence. G1 blocks online lyric lookup; do not integrate LRCLIB, synced lyric playback or related dependencies.
- **RevenueCat price:** the handoff's `$119/month + 1%` is not the current official pricing page. It currently states no charge up to $2,500 monthly tracked revenue, then 1% of tracked revenue. This vendor pricing is not a reason to adopt it. No paywall, RevenueCat account or paid service is approved; monetization experiments wait for retention evidence and explicit approval.
- **StoreKit 1:** the claimed April 2026 deprecation/mandatory StoreKit 2 cutoff was not substantiated by an Apple source in this review. StoreKit 2 is Apple's modern API direction, but do not record a mandatory cutoff or release blocker without an official notice.
- **Keyboard memory:** Apple confirms custom keyboards run in a separate process, have a memory limit that varies by device, and can be terminated when exceeded. Fixed 30/40/60/120 MB figures in secondary sources are not a platform guarantee. All model/extension budgets remain UNKNOWN until device profiling.
- **Performance and absence claims:** the references provide no reliable Hermes bundle/RAM benchmarks for the suggested JS libraries or native models. “No open-source mnemonic repository exists” is an unprovable absence claim; record only that no suitable licence-cleared corpus has been adopted.
- **Commercial strategy:** Day-0 hard paywalls, 17+ day trials, regional lifetime tiers and mascot-conversion effects are not supported by LingoMingle-specific causal evidence. Do not encode them into the roadmap. Vendor subscription telemetry is not a market-wide census.

## Roadmap and acceptance impact
- No dependencies, datasets, artwork, model weights, native modules, keyboard extensions, paywall or lyric APIs are added by this study.
- T021 is complete after CI #116 success; T022 native iOS/Android device validation remains next. CI exports do not prove device runtime.
- Keep T023 local review-event semantics before evaluating FSRS. ts-fsrs 6.0.0 uses FSRS-7 and requires Node.js 24+, while current project CI uses Node 22; a toolchain and Hermes compatibility spike is required before adoption.
- Keep T024 corpus-specific Korean data rights review and the existing NIKL production-distribution HOLD.
- Song Study remains BYO, original, public-domain or appropriately cleared text; G1 remains in force.
- Treat mnemonic systems, course-level Four Strands coverage and productive/receptive/contextual assessment as product-design work to elaborate only when those features are scheduled.

## Sources checked
- Nation, “The Four Strands” (2007): https://www.wgtn.ac.nz/lals/resources/paul-nations-resources/paul-nations-publications/publications/documents/2007-Four-strands.pdf
- ILH systematic review (2022): https://pmc.ncbi.nlm.nih.gov/articles/PMC9598591/
- WanaKana package/licence: https://github.com/WaniKani/WanaKana/blob/master/package.json ; https://github.com/WaniKani/WanaKana/blob/master/LICENSE
- es-hangul README/releases: https://github.com/toss/es-hangul/blob/main/README-en_us.md ; https://github.com/toss/es-hangul/releases
- AzooKey converter/licence: https://github.com/azooKey/AzooKeyKanaKanjiConverter ; https://github.com/azooKey/AzooKeyKanaKanjiConverter/blob/main/LICENSE
- Zenz-v2.5 model card: https://huggingface.co/Miwa-Keita/zenz-v2.5-medium
- Apple custom keyboard memory guidance: https://developer.apple.com/documentation/uikit/creating-a-custom-keyboard
- Apple NaturalLanguage: https://developer.apple.com/documentation/naturallanguage/nltagger
- Kanji alive exceptions/licence: https://kanjialive.com/credits/
- Lyricsfile CC0 scope: https://github.com/tranxuanthang/lyricsfile
- LRCLIB API: https://lrclib.net/docs
- RevenueCat current pricing: https://www.revenuecat.com/pricing
- Apple StoreKit 2 overview (no StoreKit 1 cutoff located): https://developer.apple.com/storekit/
