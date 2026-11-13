# NEXT_TASK
ID: T006
Goal: Define a source-agnostic offline glossary domain contract and deterministic lookup acceptance tests without importing third-party dictionaries.
Acceptance:
- Inspect the current app's language/vocabulary domain structure and follow existing conventions.
- Design typed records for source provenance/version/licence, language, surface form, lemma, reading, part of speech, sense, English gloss and optional learner metadata.
- Define separate Japanese morphology-to-lemma and Korean inflected-form-to-lemma lookup contracts; do not mix transliteration, IME conversion, lexical glossing and sentence translation.
- Implement only the minimal domain types/helpers and unit tests using original/synthetic examples. Include ambiguous Japanese あつい examples, unknown-word fallback, Korean inflection/spacing cases and source-provenance preservation.
- Keep source data in separate licence zones; no real dictionary entries, downloaded data, third-party examples, audio or dictionary dependencies.
- Run typecheck/lint/unit tests and report actual outputs. Do not claim keyboard native integration.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, STATE.md, existing app source/test paths required by the design.
Out of scope: native keyboard extensions/IME, Mozc/libhangul adoption, dictionary imports, external APIs, network services, accounts, paid services, lyric lookup.
Line budget <=350 changed lines. Verification: CI/test output for changed code; source-independent synthetic fixtures only.
