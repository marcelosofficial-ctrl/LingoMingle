# INDEX
| Path | Purpose |
|---|---|
| AI_COLLAB/BOOT.md | Continuation entry point |
| STATE.md | Current project facts |
| NEXT_TASK.md | One executable task |
| INBOX_chatgpt.md | User/AI approvals and handoffs |
| AI_COLLAB/CHECKPOINT.md | Last unit, commit, CI and next |
| AI_COLLAB/DECISIONS.md | Decisions, conflicts and gates |
| AI_COLLAB/DEPENDENCIES.md | Adopted code/data and licences |
| AI_COLLAB/RISKS.md | Risk register |
| AI_COLLAB/VERIFY_BACKLOG.md | Unverified claims |
| AI_COLLAB/TECH_RESEARCH_20261111.md | Verified SDK 58 stack, package compatibility, SRS and reuse review |
| AI_COLLAB/COMPETITOR_AND_LEARNING_REVIEW_20261111.md | Kana apps, licensing, Hangul letter origins, mnemonic and retrieval evidence |
| AI_COLLAB/research/KEYBOARD_TRANSLITERATION_FEASIBILITY_20261113.md | Keyboard product UX, platform constraints and competitor landscape |
| AI_COLLAB/research/KEYBOARD_TRANSLITERATION_ENGINES_20261113.md | Mozc/libhangul/librime/Fcitx reuse, licences, architecture and corrected Romaja findings |
| AI_COLLAB/research/KEYBOARD_ENGINE_SOURCE_BUILD_SPIKE_20261113.md | T004 Mozc/libhangul source, build targets, dictionary/licence scope, LGPL and build matrix |
| AI_COLLAB/research/KEYBOARD_GLOSS_DATA_RESEARCH_20261113.md | T005 Japanese/Korean English gloss sources, licences, tokenizer/data caveats and offline recommendation |
| AI_COLLAB/research/KEYBOARD_GLOSS_RESEARCH_RECHECK_20261113.md | Red-team corrections, NIKL full-download confirmation, Kiwi v0.24.1 native/WASM evidence, Sudachi file-level licence and platform constraints |
| AI_COLLAB/research/KEYBOARD_KIWI_FEASIBILITY_SPIKE_20261113.md | T007 Kiwi Android/iOS/WASM source, upstream CI, model footprint, Expo/Hermes integration and proof matrix |
| AI_COLLAB/research/KOREAN_POS_CROSSWALK_20261113.md | T008 versioned Kiwi/NIKL POS mapping, explicit ambiguous tags and synthetic acceptance cases |
| AI_COLLAB/research/NIKL_FULL_EXPORT_AND_RIGHTS_20261113.md | Official NIKL text licence, full/custom export paths, fields, multimedia exclusions and import gates |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C00_C01_binding_rules.md | Condensed Claude workflow summary; not a verbatim source extract |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C02_product_economics.md | Product and distribution costs |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C03_platform_workflow.md | Expo and phone workflow |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C04_media_rights.md | Lyrics/video/audio legal boundaries |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C05_language_pipeline.md | Japanese/Korean NLP |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C06_learning_science.md | Evidence-based learning |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C07_character_learning.md | Mnemonics and quizzes |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C08_data_business_design.md | Data, monetisation, design, reuse |
| AI_COLLAB/research/00_MERGED_SHARDS/R-C09_architecture_roadmap.md | Architecture and task queue |
## Binding rules
1. Separate repo. Never touch RevDev or PocketCode here.
2. Continuation read order: BOOT, STATE, NEXT_TASK, INBOX. Find other files through this index.
3. Never open a file over 1,500 words whole; shard source research into <=1,300-word files.
4. Commit before summary; ~350 changed lines per work unit; overwrite CHECKPOINT after each unit.
5. Final <=15 lines: done(paths, commit), latest CI, next, user actions <=3. Tag VERIFIED/INFERRED/UNKNOWN. Never claim tests passed without output.
6. Phone-first user actions under 3 minutes, no terminal or secrets in chat.
7. Adopt before writing. Review exact licence and log name/version/SPDX/purpose/link/attribution before import.
8. No scraping or copyrighted lyric/subtitle fixtures. G1 blocks online lyric lookup.
9. No paid account/subscription/recurring service/store fee without explicit approval.
10. Pin Expo SDK and read current docs before Router/native-tabs/glass APIs.
11. STATE <=400 words; BOOT <=250; every file <=1,500 words; NEXT_TASK one task.
12. Secrets only in GitHub/EAS secrets.
13. Verify [INFERRED]/[UNKNOWN] claims when they block work.
14. Linux CI: typecheck, lint, unit tests; report latest actual status.
15. Claude C00/C01 workflow wins over conflicting research workflow.
## Source register
Claude digest: 10,380 words, 69,414 bytes; SHA-256 5a6e297392fea6de49ba00e03b8d6b150cbfb28ff82fe21209bf6481f7487b53. Primary workflow/technical plan.
Gemini Language.pdf: 637,913 bytes; SHA-256 c9bb7a2cd1cee16c9fedfe7c9bdfaef23787e392439f309e842890b9d891da74. API/media sync research.
ChatGPT digest: 63,563 bytes; SHA-256 357801718d53a606e704483f3685b002b64353c651610b9ab57a50257fd7596d. Learning science, architecture, costs.
Original sources remain in conversation attachments. This repo stores distilled synthesis. C00 and C01 verbatim extracts still need to be added as separate files; until then the original Claude attachment is authoritative.
