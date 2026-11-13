# NEXT_TASK
ID: T009
Goal: Inspect an official NIKL Korean Basic Dictionary snapshot and decide whether a minimal offline Korean-English glossary import is safe and technically feasible.
Prerequisite: user attaches the official full-dictionary JSON or XML export, preferably the 2026-10 full snapshot from https://krdict.korean.go.kr/download/downloadPopup. Do not substitute a scraped website dump, API response or third-party conversion. If full download is inaccessible, user may use the official custom export form, choose JSON/XML and English, and attach the received file; note that its required fields include usage examples, which must be discarded before persistence.
Acceptance:
- Verify the file is from the official NIKL full-download flow or official custom-export email; record filename, byte size, SHA-256, snapshot/upload date, retrieval date and acquisition path. Never commit raw export.
- Inspect encoding, archive/container, actual top-level schema, record counts, stable identifiers, headword/homonym/sense structure, POS result labels, English headword/definition translation fields, learner level and conjugation fields. Identify malformed, duplicate and missing values.
- Confirm translation coverage and multimedia URLs/payloads. Exclude examples, multimedia, pronunciation/audio, images and video from v1; discard them before persistence and ensure logs/fixtures do not leak them.
- Cross-check every distinct observed POS label against T008's mapper. Add only aliases actually present in the official export; preserve unknown labels as unresolved. Do not treat NIKL search-filter codes as record POS tags.
- Verify file-specific notices and licence terms against official policy and CC BY-SA 2.0 KR. Preserve attribution, licence URL, changes, data version and source metadata. Keep derived data separately identifiable. Store packaging/platform restrictions require qualified legal review before app-store release.
- Finalize the source-to-GlossEntry mapping from observed fields, importer/normalization design, attribution text and update/versioning policy. Validate IDs and counts reproducibly.
- Use synthetic fixtures only. Do not commit real NIKL entries, definitions, translations, examples or audio.
- Do not import the dataset or create a production database in this task. First deliver a go/no-go and reproducible import specification.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, STATE.md, src/features/glossary/**, tests/**.
Out of scope: API key/runtime calls, scraping, user accounts, native keyboard targets, Kiwi model/dependency adoption, Japanese dictionary import, paid services, lyric lookup.
Line budget <=350 changed lines. If the official snapshot is not attached, complete only public-source verification and report the precise user blocker; do not guess its schema.
