# DECISIONS
## Accepted
D001 Separate private repo per project.
D002 Expo SDK 58 + React Native + TypeScript pinned in package.json.
D003 SQLite local-first; no mandatory account/server.
D004 Hiragana MVP, then katakana/Hangul, then Song Study.
D005 Freemium is future candidate, not first-slice scope.
D006 Reuse compatible permissively licensed packages/data; exclude GPL/AGPL/SSPL/NC/ND/unlicensed code/content.
D007 v1 media uses user-imported, original, public-domain or properly licensed text. No scraping.
D008 All spending blocked until explicit user approval.
D009 PWA and Android APK are no-store-fee paths, not equivalents to official stores.
D010 Canonical repository is marcelosofficial-ctrl/LingoMingle, selected explicitly by user on 2026-11-11. All new work belongs here.
D011 Glossing is a separate offline lexical layer, never conflated with transliteration, IME conversion or sentence translation. Japanese and Korean morphology adapters return exact token surface + lemma/reading/POS as appropriate. Lookup rejects stale/mismatched analyzer surfaces and Korean morphology tokens containing internal whitespace.
D012 POS comparisons require an explicit versioned tag namespace (scheme + tag). Never compare Kiwi Sejong-derived tags directly to NIKL dictionary POS labels. Exact surface matches may bypass morphology.
D013 Kiwi v0.24.1 is the preferred Korean morphology proof candidate, not an adopted dependency. Use native AAR/Swift bindings for native app and keyboard targets; reserve WASM for web unless a tested native worker bridge exists. Do not bundle the 87.97 MB model until extension RAM/size and offline loading pass.
## CONFLICTS
Repo slug: RESOLVED. A second private repository, LingoMingle-, also exists. It is not canonical. Foundation files were migrated to LingoMingle. The duplicate has not been deleted or archived because no destructive/archive GitHub action is available in this session; avoid further work there.
Lyrics: Gemini's LRCLIB/Lyricsfile approach is technically useful for metadata and synced lines, but API access/format does not establish copyright display rights. G1 blocks integration.
Apple: educational purpose alone does not waive Apple's fee for an individual. Waiver is limited to eligible nonprofits, accredited institutions and government entities. EU alternative distribution has eligibility/notarisation requirements and is not a simple free workaround.
## Gates
G1 no online copyrighted lyric display in v1 without explicit approval after rights review. Default BYO/original/PD/cleared content.
G2 no paid Apple/Google developer enrollment without approval.
G3 no paid hosting, API, AI inference or recurring service without approval.