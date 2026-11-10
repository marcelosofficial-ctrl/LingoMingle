# DEPENDENCIES
## Present in app package.json
- Expo SDK 58: expo 58.0.23, expo-router 58.0.30, expo-sqlite 58.0.15, expo-glass-effect 58.0.5, expo-status-bar 58.0.4, expo-constants 58.0.15, expo-linking 58.0.16.
- React Native 0.88.1 / React 19.3.0.
- Reanimated 4.7.1 + Worklets 0.13.0; Gesture Handler 3.3.0; Screens 4.30.1; Safe Area Context 5.11.1.
- TypeScript 6.0.3, ESLint 9.39.1, eslint-config-expo 58.0.4, @types/react 19.3.0.
**License status:** Expo framework and Expo Router MIT verified from upstream package/repo metadata; React Native MIT verified. Remaining package SPDX metadata and transitive dependency licences must be audited from the resolved package lock before release. No additional library is being copied into the repo.
## Evaluated, not yet adopted
- WanaKana 5.3.1: MIT verified. Candidate for kana/romaji conversion only. Do not treat as tokenizer/dictionary or pronunciation evaluator.
- ts-fsrs 6.0.0: MIT; FSRS-7 default; requires Node >=24 and has breaking API changes. Not adopted. Evaluate Hermes compatibility and current v5.4.2 compatibility before selection.
- Kuromoji.js/fork: licence, Hermes compatibility, memory and dictionary size unknown.
- hangul-js: maintenance/licence unknown.
- JMdict/KANJIDIC2/KanjiVG: CC BY-SA-family candidates; attribution/share-alike obligations need review.
- Tatoeba licences vary per record; never assume one licence for all.
Every future adoption records exact version, SPDX licence, purpose, upstream URL, attribution, modifications and review date before import.