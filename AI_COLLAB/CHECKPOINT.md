# CHECKPOINT
Unit 1: inspected the user-attached official-looking NIKL full JSON archive, recorded aggregate-only snapshot findings, and aligned the glossary sense model with the actual English translation structure.
Status: T008 COMPLETE/VERIFIED. T009 SNAPSHOT INSPECTED; TECHNICAL GO, DISTRIBUTION HOLD.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Source file is not committed: 84,498,237 bytes; SHA-256 c8f9ffbf7e9be1f1ec86fa29e4160a75eee8044fc081c27788dadf3ceb66d34e. ZIP integrity PASS; 11/11 UTF-8 JSON files parse; 0 duplicate JSON object keys across 6,484,068 objects. Uncompressed 1,016,275,365 bytes. Embedded creation date 2026-10-19. Exact acquisition path/retrieval timestamp not independently proven by archive.
Actual bulk schema is documented in AI_COLLAB/research/NIKL_SNAPSHOT_INSPECTION_20261114.md. 56,555 LexicalEntry records, 53,671 distinct IDs. 51,555 word entries (all IDs unique in word subset); other lexical units share IDs and are excluded from v1. All word entries have one lemma, sense(s), POS field and vocabulary level.
Word entries: 71,120 senses; 69,432 English translations; 49,869 entries have all senses translated; 1,685 entries have no English, and one entry is partially translated. Proposed v1 subset is 49,869 complete entries / 69,431 senses. POS: 15 labels, 14 mapped; 품사 없음 stays unresolved. 1,646 HTML entities in selected English text require safe decoding. Exclude examples, pronunciation/audio, conjugations, multimedia, phrases, idioms, proverbs and grammar expressions.
T009 technical decision: GO for a filtered offline Korean-English word glossary; HOLD production import/store distribution pending qualified review of CC BY-SA 2.0 KR and platform no-additional-restrictions implications. No dataset or production DB created.
Code/model update: GlossSense now has optional englishEquivalent distinct from englishGloss. Test covers preservation and snapshot-observed 품사 없음 unresolved behavior. POS research updated. No real source text/fixtures committed.
Commits this unit: report 4b80b50; type  c84267e; tests 7c99faf; crosswalk docs dffa971.
Prior code CI remains #51 on 0cc2274; new code change needs CI verification.
Next unit: reconcile INDEX, DEPENDENCIES, DECISIONS, STATE and NEXT_TASK; close T009 and queue a synthetic-only importer prototype. No real-data import.
