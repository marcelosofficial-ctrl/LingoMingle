# NEXT_TASK
ID: T008
Goal: Implement a deterministic, versioned Korean POS crosswalk between Kiwi's Sejong-derived tags and NIKL dictionary POS categories.
Acceptance:
- Recheck the current official Kiwi POSTag list and NIKL POS category values; document exact source versions/URLs.
- Define a canonical LingoMingle POS scheme with explicit tags and mapping coverage. Map only unambiguous categories; preserve ambiguous/unmapped tags as unresolved rather than forcing a match.
- Handle Kiwi regular/irregular suffix variants without losing the original source tag.
- Add a pure TypeScript/JavaScript adapter and declaration types that convert source tags into canonical GlossPartOfSpeech records.
- Add synthetic tests for noun/proper noun, bound noun, pronoun, numeral, verb, adjective, auxiliary predicate ambiguity, particles, endings, affixes, punctuation/foreign/unknown tags, and POS namespace mismatch. No NIKL entries or copied third-party dictionary content in fixtures.
- Keep the raw source tag + source scheme available for audit; compare gloss entries only on canonical scheme/tag.
- Run typecheck, lint and unit tests; report exact CI outputs.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, STATE.md, src/features/glossary/**, tests/**.
Out of scope: importing NIKL/JMdict, adding Kiwi dependency/model, native keyboard targets, external APIs, accounts, paid services, lyric lookup.
Line budget <=350 changed lines. Verification: official POS source docs + CI output. No guessed mappings for ambiguous tags.
