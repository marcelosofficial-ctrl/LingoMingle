# NEXT_TASK
ID: T017
Goal: Turn the Alphabets tab into the first usable Japanese hiragana learning slice: a canonical, tested 46-character basic hiragana dataset, selectable grid, and clear character detail.

Acceptance:
- Add a dependency-free typed dataset for the 46 modern basic hiragana in conventional gojūon order: vowels; K/S/T/N/H/M/Y/R/W rows; final ん. Preserve the correct row sizes (5,5,5,5,5,5,5,3,5,2,1).
- Provide stable IDs, kana glyph, Hepburn romaji, and row/column metadata. Explicitly document the conventional ん=n and を=wo spellings; do not add voiced/semi-voiced, small, obsolete, combination, or katakana forms.
- Replace the alphabets placeholder with an accessible, responsive character grid. Tapping a character updates a selected-character detail panel showing the kana and romaji; initial selection is あ. Use existing theme tokens and no new runtime dependencies.
- Add Node tests for exactly 46 entries, uniqueness, row sizes/order, and critical spellings (し=shi, ち=chi, つ=tsu, ふ=fu, を=wo, ん=n).
- Keep this first slice focused: no audio, handwriting recognition, mnemonic copy, external data, database changes, Song Study changes, or paid services.
- Run root typecheck, lint, and tests in CI. Do not claim native runtime verification without iOS/Android device output.

Files allowed: NEXT_TASK.md, STATE.md, AI_COLLAB/CHECKPOINT.md, src/features/kana/**, app/(tabs)/alphabets.tsx, tests/**.
Line budget <=350 changed lines per unit. Commit completed implementation and overwrite CHECKPOINT.md.
