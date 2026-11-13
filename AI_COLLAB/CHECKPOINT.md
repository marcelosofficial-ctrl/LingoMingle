# CHECKPOINT
Unit: T009 public-source verification and provisional import specification completed; actual export inspection remains blocked.
Status: T008 COMPLETE/VERIFIED. T009 IN PROGRESS/BLOCKED ON USER FILE.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
T008 code CI: Run #51 (43402893732) on code SHA 0cc227455554879195d00faac8939f40577945e SUCCESS. Install, typecheck, lint succeeded; tests 27/27 passed, 0 failed, 0 skipped. Later commits are docs-only; no newer code CI is claimed.
T009 public evidence: official NIKL full-download page currently displays 2026-10 and Excel/XML/JSON buttons. Its underlying URLs, access conditions and file size remain UNKNOWN. Custom export supports JSON/XML, headword/sense granularity and English translation, but requires email delivery and lists usage examples among mandatory fields. If used, discard examples before persistence.
NIKL API docs are reference schema only, not proof of bulk-export schema. They document an authenticated API and fields target_code, word, sup_no, word_grade, pos, sense_order, definition, trans_word and trans_dfn. API example confirms POS result is a Korean string label; bulk export must still be inspected.
Rights: official policy says site materials generally CC BY-SA 2.0 KR unless separately marked; text commercial reuse allowed with attribution/share-alike for adaptations. Multimedia separately licensed. CC BY-SA deed requires credit, licence link, change indication and no additional restrictions. Store packaging/technical restrictions need qualified review; licence-zone separation alone is not a legal conclusion.
New deliverable: AI_COLLAB/research/NIKL_IMPORT_SPEC_PREVIEW_20261113.md (commit 66c8418). It gives provisional field mapping, safe import pipeline, synthetic acceptance gates, attribution draft, versioning manifest and explicit blockers. It does not declare the export schema or authorize import.
Prior T008 files and crosswalk remain unchanged. No dataset, examples, API calls, code or production DB imported.
Next: user attaches the official NIKL full JSON or XML file from https://krdict.korean.go.kr/download/downloadPopup. Then verify filename, byte count, SHA-256, actual schema/IDs/POS/English coverage/duplicates/notices and decide go/no-go. Never commit the raw file.
