# Offline lexical gloss data research | 2026-11-13

## Recommendation

Use a separate, versioned offline gloss database, not the IME's conversion dictionary as the source of English definitions.

- **Japanese candidate:** JMdict English edition for word-level English glosses. KANJIDIC2 is optional character metadata, not a substitute for JMdict. Both are EDRDG CC BY-SA 4.0 resources, with one important KANJIDIC2 field exception.
- **Korean candidate:** National Institute of Korean Language (NIKL) Korean Basic Dictionary (한국어기초사전), a learner-focused Korean-English dictionary. Its text data is CC BY-SA 2.0 Korea. Do not include audio/pronunciation media without separate rights clearance.
- **Japanese tokenizer candidate:** Sudachi for segmentation/lemma/POS, but only after auditing the exact dictionary data bundle. Alternatively, investigate whether Mozc's converter output can supply enough segmentation for the keyboard without a second large tokenizer.
- No source is cleared for adoption in this task. The main blocker is data packaging/provenance and exact licence obligations, not the existence of useful dictionaries.

## Japanese-English data

### JMdict

EDRDG describes JMdict as a multilingual Japanese-pivot lexical database. Entries carry kanji forms, kana readings, POS/field tags and sense-level glosses. The English-only JMdict_e variant is available and avoids unused language glosses; JMdict_b omits several thousand name entries. JMdict is a better fit for learner-facing word glosses than the Mozc conversion dictionary, which focuses on input conversion and ranking rather than English meaning.

EDRDG's current general dictionary licence is **CC BY-SA 4.0**. It allows commercial redistribution and adaptation, but requires attribution, share-alike for adapted dictionary material, acknowledgement in a smartphone-app screen such as About/Sources, preservation of notices, and a procedure for regular updates. EDRDG says versions are generated daily and its licence requires a regular update process (it gives monthly updating as an example). Plan a monthly data-refresh release or an independently reviewed update mechanism; do not ship a stale frozen copy indefinitely.

Keep the JMdict-derived database separate from proprietary app code and publish the derived database under the required compatible share-alike terms, subject to legal review. Include a data version, source URL, retrieval date, modification record and acknowledgement. Never claim copyright over JMdict-derived content. Do not use JMdict example-sentence files until their individual source/provenance is reviewed; gloss-only is the safer first scope.

### KANJIDIC2

Useful for kanji readings, English meanings, stroke counts, grades and frequency, but it is character-level reference data, not a word segmentation or word-gloss source. EDRDG lists it under CC BY-SA 4.0. The SKIP code field has a separate, conflicting notice history. Jack Halpern's current conditions page says the SKIP system is CC BY-SA 4.0 and allows commercial use with attribution, while the EDRDG general licence page still says commercial applications using SKIP require prior permission. This is not a CC BY-NC-SA 4.0 restriction. Exclude SKIP from the first data pack until EDRDG and the field owner clarify the conflict in writing; do not mislabel its licence.

### Japanese segmentation

JMdict is not a tokenizer and does not provide all inflected surface forms. A morphological analyzer must segment continuous Japanese text and map inflected forms to lemmas/readings before gloss lookup.

Sudachi's tokenizer code is Apache-2.0. Its SudachiDict distribution says all files are Apache-2.0 but documents incorporated UniDic and NEologd material, including source provenance and additional notices. UniDic 2.x has a BSD/GPL/LGPL triple licence for commercial use; NEologd's provenance includes Hatena keywords, Japan Post postal codes, station names, personal names and web-derived forms. This is not a reason to reject Sudachi, but it is a separate data-provenance audit. Measure dictionary footprint and Hermes/native integration before selecting it. Do not confuse tokenizer-code licence with lexicon-data provenance.

## Korean-English data

### NIKL Korean Basic Dictionary

This is the strongest learner-oriented candidate found. Its published data includes Korean headwords, part of speech, learner definitions, English translations, conjugations and thematic/semantic categories. The official copyright policy states that text material not otherwise marked is available under **CC BY-SA 2.0 Korea**, including commercial use, with attribution and share-alike on adaptations. Audio, pronunciation and other multimedia assets can carry separate terms; exclude them from the initial dataset.

The official Open API requires an authentication key and serves network search results. The official site also offers search-result file downloads after email entry; a third-party open-source converter documents JSON/XML downloads and conversion to SQLite. This supports a possible offline import workflow, but a full, current bulk-export path and its terms still need confirmation. Do not call the API while typing, scrape pages, or make an end-user account/API key a product requirement. Obtain a permitted static export, keep the data separate under its source licence, and confirm whether the downloadable export covers the fields needed.

### Small alternative: Wiktionary-derived Korean

The KOReader dictionary project publishes a 3.4 MB Korean→English dictionary under CC BY-SA 4.0, derived from Korean Wiktionary and its translation tables. Its published stats are 37,337 entries, 341,382 inflected forms, translations on 75.59% of entries, and 44.5% coverage of its top-10k list. This is compact and useful for a prototype benchmark, but the coverage is too weak for a dependable general-purpose keyboard. Audit its generation scripts and per-source attribution before adoption.

A separate prebuilt Kotobase dataset claims 4M+ multilingual entries and 4.8M+ senses from KRDict, JMdict, CEDICT, Wiktionary/Kaikki, Tatoeba and OpenDict. Its broad CC BY-SA label does not replace a source-by-source audit; it is also too broad for the first keyboard footprint and contains example-sentence sources that need separate review. Do not import it.

## Data architecture and acceptance

Keep each source in a separate SQLite table/database or independently versioned data pack with: source id, upstream version/date, licence id, attribution text, modification notes, language, headword, reading, lemma, POS, sense id, English gloss and optional learner level. Never merge source records in a way that erases provenance. Keep media/audio and example sentences in separate licence zones.

Original/synthetic acceptance cases should cover:
- Japanese homonym selection (e.g. あつい → 暑い / 熱い / 厚い) and inflected surfaces resolving to lemma glosses.
- Japanese compounds, kana-only words, multiple readings and unknown words.
- Korean conjugated surface forms resolving to dictionary lemmas, spacing variation, homonyms, and missing-English-translation fallback.
- No audio, copyrighted example corpus, or third-party dictionary entry copied into repository fixtures.

**Decision:** JMdict + NIKL Korean Basic Dictionary are the strongest source candidates. Proceed only after verifying exact downloadable snapshots, attribution/share-alike packaging and update obligations. Use glosses as candidate explanations, never as a claim that transliteration itself translates the whole sentence.

## Primary references

- EDRDG [general dictionary licence](https://www.edrdg.org/edrdg/licence.html) and [JMdict project/download format](https://www.edrdg.org/dokuwiki/doku.php?id=wiki_index.php_jmdict-edict_dictionary_project).
- EDRDG [KANJIDIC project](https://www.edrdg.org/wiki/KANJIDIC_Project.html).
- NIKL [Korean Basic Dictionary API](https://krdict.korean.go.kr/eng/openApi/openApiInfo), [API registration and copyright policy](https://krdict.korean.go.kr/eng/openApi/openApiRegister).
- WorksApplications [Sudachi](https://github.com/WorksApplications/Sudachi) and [SudachiDict legal notices](https://github.com/WorksApplications/SudachiDict/blob/develop/LEGAL).
- KOReader [offline dictionary catalogue](https://danielgregorini.github.io/koreader-dicts/en/ko-en/).
