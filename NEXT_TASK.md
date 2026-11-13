# NEXT_TASK
ID: T009
Goal: Inspect an official NIKL Korean Basic Dictionary snapshot and decide whether a minimal offline Korean-English glossary import is safe and technically feasible.
Prerequisite: user attaches the official full-dictionary JSON or XML export, preferably the 2026-10 full snapshot. Do not substitute a scraped website dump, API response, or third-party conversion.
Acceptance:
- Verify the file is from the official NIKL full-download flow; record filename, byte size, snapshot/upload date and acquisition path. Never commit the raw export.
- Inspect encoding, top-level schema, record counts, stable identifiers, headword/sense structure, POS result labels, English translation fields, learner level and conjugation fields. Identify malformed, duplicate and missing values.
- Confirm whether the export contains English headword/definition translations and whether it includes multimedia URLs or payloads. Exclude all multimedia, pronunciation/audio, images, video and usage examples from the v1 import unless individually cleared.
- Cross-check observed POS labels against T008's mapper. Add only aliases actually present in the official export; preserve unknown labels as unresolved. Do not treat NIKL search filter codes as record POS tags.
- Verify source notices and licence terms in the export or official download flow against the official copyright policy. Text data is CC BY-SA 2.0 KR unless separately marked; commercial use requires attribution and share-alike for adaptations. Keep derived data in a separate licence zone.
- Produce a source-to-GlossEntry field mapping, import/normalization design, attribution text and update/versioning policy. Document exact data-version and retrieval metadata.
- Use synthetic fixtures only. Do not commit real NIKL entries, definitions, translations, examples or audio.
- Do not import the dataset or create a production database in this task. First deliver a go/no-go and a reproducible import specification.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, STATE.md, src/features/glossary/**, tests/**.
Out of scope: API key/runtime calls, scraping, user accounts, native keyboard targets, Kiwi model/dependency adoption, Japanese dictionary import, paid services, lyric lookup.
Line budget <=350 changed lines. If the official snapshot is not attached, complete only public-source verification and report the precise user blocker; do not guess its schema.
