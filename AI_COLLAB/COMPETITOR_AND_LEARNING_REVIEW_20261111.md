# Competitor, learning-science and alphabet review | 2026-11-11

## Competitor teardown and reuse decisions

### KanaSRS
**VERIFIED:** Android app focused on hiragana/katakana with five-kana lesson groups, built-in mnemonics, native audio, stroke-order GIFs, SRS, writing recognition, accuracy statistics, streaks and notification time. Its own GitHub README says it is Source Available Software, not Open Source Software. Do not copy its code or assets. Reuse only the product pattern as inspiration: small groups, immediate audio, separate recognition and writing practice, per-character accuracy. Source: https://github.com/Lucas-Curran/KanaSRS

### KanaDojo
**VERIFIED:** Web-first learning product built with Next.js 15, React 19, TypeScript, Tailwind, Zustand and Framer Motion; README names Kuroshiro, Kuromoji and WanaKana for Japanese processing and JMdict/KANJIDIC as data sources. Repository is AGPL-3.0. This project is proprietary by default, so no code, artwork, lesson text or bundled datasets should be copied. Use it as a feature/UX reference only. Sources: https://github.com/lingdojo/kana-dojo ; https://github.com/lingdojo/kana-dojo/blob/main/README.md

### Kanji Dojo
**VERIFIED:** Multiplatform, offline-oriented app with kana/kanji decks, handwriting, SRS, dictionary, flashcards and level-based paths. Its GitHub repository was archived 2026-08-27 and is GPL-3.0-or-later. No code reuse in this proprietary project. Its data credits include JMdict, KANJIDIC, KanjiVG and JmdictFurigana, with CC BY/CC BY-SA obligations. Each dataset requires separate review; do not bundle its full data pack by assumption. Source: https://github.com/syt0r/Kanji-Dojo

### Nihonoari
**VERIFIED:** Minimalist Flutter kana trainer with no ads or in-app purchases; source is GPL-3.0. Not reusable in this proprietary app. Its deliberately narrow scope is a useful counterexample to feature bloat: the first LingoMingle release should make one character-learning loop excellent before adding dictionaries, handwriting and media. Source: https://github.com/aeri/Nihonoari-App

### Kanji/learning tracker Kanjii
**VERIFIED:** A local-first web tracker emphasizes user-chosen vocabulary, bidirectional spaced repetition, handwriting practice and file backup, without accounts or streak pressure. The surfaced repository page did not establish its licence. Do not adopt its code or data until licence and maintenance are verified. The product lesson is to preserve user ownership and avoid forcing a fixed syllabus. Source: https://github.com/sb-17/kanjii

## Evidence-based alphabet lesson design

### Hangul
**VERIFIED:** The National Institute of Korean Language explains that the five basic consonant shapes represent articulators: ㄱ the back of the tongue at the velum, ㄴ the tongue tip at the alveolar ridge, ㅁ closed lips, ㅅ teeth, and ㅇ the throat. Related letters add strokes to show related articulations and sound classes. This validates the user's instinct to use ㄴ as a tongue/nose-area cue, but the mnemonic should accurately describe tongue-tip placement, not claim that ㄴ is literally a nose. Teach the articulatory truth first, then add a simple visual story. Source: https://www.korean.go.kr/eng_hangeul/principle/002.html

### Visual mnemonics and retrieval
**VERIFIED:** A 2007 study comparing keyword mnemonics and retrieval practice for foreign vocabulary found both outperformed rote rehearsal; retrieval practice was stronger for productive recall in one experiment. A 2013 study of Japanese kanji learners found mnemonics helpful when meaningful but warned that overreliance can have negative effects. These findings support a mnemonic as an encoding aid, followed by active recall and fading the hint. They do not prove that every invented shape pun is effective. Sources: https://doi.org/10.1002/acp.1287 ; https://doi.org/10.1111/j.1540-4781.2013.12040.x

### Character confusability
**VERIFIED:** Research on Japanese kana script priming reports that hiragana and katakana are not interchangeable in visual processing. Keep hiragana and katakana as distinct learning tracks, even when they share a sound. Introduce visually confusable characters after basic recognition, then interleave them for discrimination. Source: https://pubmed.ncbi.nlm.nih.gov/28114782/

## Product decisions from this review

1. First release: hiragana only, in small sound-family groups, with original mnemonic, native/system audio, glyph-to-sound and sound-to-glyph retrieval.
2. Separate recognition, pronunciation/listening and handwriting skills. Do not mark a glyph learned just because the learner can choose its romaji.
3. Fade romaji and mnemonic hints as mastery increases; retain an optional help action.
4. Add katakana as its own progression; teach shared sounds only after each script has independent recognition.
5. Hangul starter should teach articulator-based consonant groups and vowel layout before syllable block assembly.
6. Keep a local, exportable review history. Streaks are optional motivation, not the measure of mastery.
7. Reuse WanaKana only as an MIT-licensed conversion library after adding regression tests. Do not import any of the above app projects' code or content under GPL/AGPL/source-available licences.

## Open checks
- Verify the exact license and current maintenance of any Kanji Dojo data repository before considering individual datasets.
- Obtain native Korean audio samples or verify platform TTS quality before selecting default Hangul voice.
- Pilot original mnemonics with beginner users; remove any cue that creates a false articulation or a confusing alternate sound.
