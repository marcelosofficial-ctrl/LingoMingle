# Technical verification and reuse review | 2026-11-11

## 1. Expo platform and dependency baseline

**VERIFIED:** Expo SDK 58 was released 2026-10-15 and targets React Native 0.88 / React 19.3. Expo's SDK 58 docs specify Node 22.13.x or later supported lines (24.3+ or 26+), iOS 16.4+ and Android 7+ baseline, and Xcode 26.4. SDK 58 makes Expo Router native tabs stable. Source: https://expo.dev/changelog/sdk-58 and https://docs.expo.dev/versions/v58.0.0/

**VERIFIED:** Expo Router SDK 58 docs recommend ~58.0.30. Expo SQLite docs recommend ~58.0.15 and SQLite persists data across app restarts. Reanimated docs recommend 4.7.1; Reanimated 4 requires the React Native New Architecture and matching react-native-worklets. Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/ ; https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/ ; https://docs.expo.dev/versions/latest/sdk/reanimated/ ; https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/

**VERIFIED:** Expo GlassEffect uses the native iOS visual effect API, is available only on iOS 26+, and falls back to a regular View on unsupported platforms. The app must check both app/system availability and runtime API availability before rendering glass. Do not make glass the only contrast or navigation affordance. Source: https://docs.expo.dev/versions/latest/sdk/glass-effect/

**INFERRED:** SDK 58 is the right starting point for this new project because it is current stable, its router tabs are stable, and its GlassEffect API directly matches the requested visual direction. Use a restrained, cross-platform base UI; apply native glass only as progressive enhancement.

## 2. Current project package pins

Initial pins committed in package.json:
- expo 58.0.23; react 19.3.0; react-native 0.88.1
- expo-router 58.0.30; expo-sqlite 58.0.15; expo-glass-effect 58.0.5; expo-status-bar 58.0.4
- expo-constants 58.0.15; expo-linking 58.0.14
- react-native-reanimated 4.7.1; react-native-worklets 0.13.0; react-native-gesture-handler 3.3.0; react-native-screens 4.30.1; react-native-safe-area-context 5.11.1
- typescript 6.0.3; eslint 9.39.1; eslint-config-expo 58.0.4; @types/react 19.3.0

**VERIFIED:** first dependency installation failed because expo-router@58.0.30 requires expo-constants ^58.0.15 while project initially pinned 58.0.13. Corrected to 58.0.15. No --force or --legacy-peer-deps workaround is permitted. A subsequent CI run must prove the full tree resolves.

**UNKNOWN:** final peer compatibility of every direct package and lockfile reproducibility remain unverified until npm install succeeds. No package-lock is committed yet. Exact direct pins reduce drift but do not lock transitive dependencies.

## 3. Open-source reuse candidates

**VERIFIED:** WanaKana 5.3.1 is MIT-licensed and provides kana/romaji conversion utilities. It is a narrow, low-risk candidate for conversion, not a tokenizer or dictionary. Keep script display independent of romaji and test long vowels, small kana, punctuation and ambiguous Hepburn cases. Sources: https://github.com/WaniKani/WanaKana/blob/master/LICENSE ; https://github.com/WaniKani/WanaKana/blob/master/package.json

**VERIFIED:** ts-fsrs 6.0.0 was released 2026-10-28, introduces FSRS-7 as default, has breaking API changes, and requires Node >=24.0.0. Expo CI currently uses Node 22.13, which Expo SDK 58 supports. Do not add v6 blindly or raise Node just for it. Evaluate v5.4.2 (MIT, stable v5 line) versus v6 under Hermes, and wrap the chosen API behind our own scheduler interface. Preserve review history and never silently reschedule existing cards during algorithm migration. Sources: https://open-spaced-repetition.github.io/ts-fsrs/updates/ ; https://github.com/open-spaced-repetition/ts-fsrs ; https://docs.ankiweb.net/deck-options.html

**VERIFIED:** WaniKani describes a staged SRS system that combines mnemonic associations, radicals and vocabulary, with review intervals adapting to recall. Its progression/unlock mechanics are a useful product reference, not something to copy wholesale. Sources: https://knowledge.wanikani.com/wanikani/srs/ ; https://knowledge.wanikani.com/getting-started/unlock-new-lessons/

**VERIFIED:** KanaDojo is AGPL-3.0 per the earlier source audit. Treat it as UX/research inspiration only; do not copy code or assets into this proprietary app. Its licence is incompatible with the project's permissive-only adoption rule.

## 4. Learning design implications

- Character lesson sequence: see glyph + hear sound + learn one original visual mnemonic; retrieve sound from glyph; retrieve glyph from sound; then mix only familiar characters.
- Use WanaKana only for conversion assistance. It does not validate the learner's pronunciation or teach the correct phonology.
- Keep a character's mnemonic, sound recording/TTS and distractor group as separate data fields so content can be revised without changing scheduler state.
- SRS ratings must reflect actual recall, not response speed alone. Use one clear failure option and a small number of positive confidence grades; avoid "Hard" when the learner actually failed.
- Streaks should not punish missed days. Track total practice and personal consistency separately from a punitive streak counter.

## 5. Open verification tasks

1. Confirm npm install resolves the complete SDK 58 package set after the expo-constants correction; generate and commit package-lock.json.
2. Run typecheck, lint and unit tests and fix actual failures from logs.
3. Test expo-glass-effect on iPhone 12 / iOS version when device access is available; Android must remain visually complete without glass.
4. Benchmark WanaKana and candidate tokenizer in Hermes before adoption.
5. Prototype FSRS v5/v6 behind an interface and test Hermes compatibility, persistence schema and migration of review history before choosing.
6. Extract C00 and C01 verbatim into separate <=1,300-word source shards. The existing combined rules file is a condensed working copy, not an exact source reproduction.
