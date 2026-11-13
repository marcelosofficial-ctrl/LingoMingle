# NIKL full dictionary export and rights | 2026-11-13

## Verified official findings

1. The NIKL Korean Basic Dictionary's official copyright policy states that material on the site, unless separately identified, is distributed under Creative Commons Attribution-ShareAlike 2.0 Korea (CC BY-SA 2.0 KR). Commercial reuse is allowed without special permission if attribution is provided and adapted material is shared under the same licence.
2. The same policy explicitly excludes multimedia files from the blanket rule. Images, video, music, sound and pronunciation/audio have individual commercial-use and modification settings. Do not assume the text licence clears those assets.
3. The full-dictionary download page currently lists Excel, XML and JSON full downloads and shows upload date 2026-10. The page exposes the buttons but its text view does not reveal the underlying file URLs, exact byte sizes, or whether an account is required for those full-file buttons.
4. A separate custom export panel on the dictionary search page asks the requester to choose a purpose (learning material, lecture material, research material or other), export granularity, format, fields, multilingual translation language and an email address. It says the download route is sent to that email. This custom-export workflow is not the same as the full-dictionary popup.
5. The custom export supports headword-level or sense-level output and Excel/HWP/Word/text/XML/JSON. Required fields include vocabulary, category, POS, definitions and usage examples. Optional fields include conjugation, pronunciation, vocabulary level, categories, alternate search forms and more. English is one of the selectable translation languages.
6. The official Open API returns Korean POS labels as strings in the result field, and supports English translation fields such as translated headword and definition. API use requires an authentication key. Do not make the API or a user key a runtime product dependency.

## Product decision

- Preferred acquisition path: use the official full-dictionary JSON or XML snapshot dated 2026-10, if the button download succeeds and the file is the complete Korean Basic Dictionary text dataset.
- If the full-file button cannot be used, the custom export panel is a documented fallback. Select headword-level or sense-level output, JSON or XML, English translation, and only the fields needed for glossing; request the download link by email. No API key should be needed for this export flow.
- Do not upload the raw snapshot into Git. Keep it as a user-provided local source file for schema inspection and import. Do not commit copied NIKL entries or examples as tests.
- Initial app data scope: headword, POS label, sense identifier/order, English headword translation, English definition translation, learner level, conjugation only if required by the analyzer contract. Keep usage examples, audio/pronunciation, image/video and other multimedia out of v1 unless their individual rights and scope are reviewed.
- Store source metadata alongside any derived database: source name, source URL, snapshot upload date, retrieval date, CC BY-SA 2.0 KR identifier and link, required attribution, modifications, and a data-version identifier. Keep the NIKL-derived database in a separate licence zone, not mixed into proprietary app code.
- For adaptations, preserve CC BY-SA 2.0 KR attribution and share-alike notices. A collection containing separately licensed app code and a separately licensed NIKL-derived data file must keep the boundaries explicit. This is a technical packaging recommendation, not legal advice.
- Update cadence is not specified by the reviewed download page. Record the snapshot date and check the official page for a newer export before each dictionary data release. Do not promise automatic updates.

## Unknowns that block data import

- Exact JSON/XML schema, archive/file size, entry/sense counts, completeness, UTF-8 normalization and stable identifiers are UNKNOWN until the official file is obtained and inspected.
- The full-file popup's underlying download URL, access/authentication conditions and file-specific notices are UNKNOWN.
- Whether all English translations are included in the full snapshot or only in selected export options is UNKNOWN until the file is inspected.
- Exact data update cadence and whether the full-file snapshot is complete for all dictionary subdomains are UNKNOWN.

## Primary sources opened

- NIKL copyright policy: https://krdict.korean.go.kr/kor/kboardPolicy/copyRightTermsInfo
- NIKL full dictionary download page (upload date 2026-10; Excel/XML/JSON): https://krdict.korean.go.kr/download/downloadPopup
- NIKL custom export form and fields: https://krdict.korean.go.kr/kor/dicMarinerSearch/search
- NIKL English Open API specification and response fields: https://krdict.korean.go.kr/eng/openApi/openApiInfo
- NIKL advanced search POS categories: https://krdict.korean.go.kr/eng/dicSearchDetail/searchDetailWords
