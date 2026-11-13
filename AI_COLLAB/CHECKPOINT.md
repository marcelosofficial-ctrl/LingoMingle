# CHECKPOINT
Unit: T005 offline Japanese/Korean English-gloss data source research.
Status: COMPLETE as source-selection research only; no dictionary or tokenizer adopted/imported.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Research: AI_COLLAB/research/KEYBOARD_GLOSS_DATA_RESEARCH_20261113.md. T004 source/build findings: AI_COLLAB/research/KEYBOARD_ENGINE_SOURCE_BUILD_SPIKE_20261113.md.
Japanese: JMdict English is the strongest word-level gloss candidate; EDRDG CC BY-SA 4.0 allows commercial distribution with attribution/share-alike, a dedicated app Sources/About acknowledgement and regular data updates (daily generation; monthly update example). KANJIDIC2 is optional character metadata, not word glosses; exclude SKIP field under CC BY-NC-SA 4.0.
Japanese tokenizer: Sudachi code Apache-2.0; SudachiDict includes UniDic and NEologd-derived data with source notices/provenance; exact data closure and footprint still need review. JMdict is not a tokenizer and does not provide all inflected forms.
Korean: NIKL Korean Basic Dictionary text is CC BY-SA 2.0 Korea and contains learner definitions, English translations, POS/conjugation metadata; audio/multimedia have separate terms. Official API requires a key; site has search-result downloads, and a third-party converter documents JSON/XML export. Full permitted bulk snapshot path still needs confirmation. No scraping or runtime API use.
Fallback: KOReader Wiktionary-derived Korean-English data CC BY-SA 4.0, 37,337 entries / 3.4 MB, 75.59% entries translated and 44.5% top-10k coverage; too sparse as primary. Kotobase mixed-source DB is too broad and requires source-by-source audit.
Decision: prefer JMdict + NIKL Basic Dictionary as candidate sources; no source is cleared for import yet. Keep source data separate from proprietary app code, retain attribution/modification/version metadata, and obtain legal review for share-alike packaging/update design.
Commits: T005 data research 147bdbd; dependency candidates e9cb51d; index a9d04ae; state 0c617b3; T006 queued 654dbf9.
CI: documentation-only; no new CI expected. Latest code CI remains Run #36 on code SHA a3bdf071f12c7d9992a96a501b5cf90905edd177, successful install/typecheck/lint and 3/3 tests.
Next: T006 source-agnostic offline glossary domain contract and synthetic unit tests. No user action needed.
