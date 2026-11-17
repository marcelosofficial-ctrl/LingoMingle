# LingoMingle — independent AI research handoff
Prepared: 2026-11-17
Canonical repository: https://github.com/marcelosofficial-ctrl/LingoMingle
Canonical branch: `lingomingle-foundation-2026-11-10`
This brief is a research handoff, not authorization to change code, dependencies, licensing decisions or roadmap priorities.

> **Access warning — important:** The canonical GitHub repository is PRIVATE. Every GitHub link in this brief requires an authenticated account that has repository access. An AI session that is not signed in cannot read these links and may receive a 404. If you cannot access the repository, do not infer file contents from link titles or proceed as though you read them. Ask the owner to paste this entire handoff and any specific supporting excerpts into the conversation. Do not ask for passwords, personal access tokens or account credentials. This handoff is designed to be self-contained enough to begin independent research without repository access; clearly label any project detail that you cannot independently inspect.

## 1. Product in one minute
LingoMingle is a phone-first, local-first language-learning app built with Expo, React Native and TypeScript. It is intended to make useful language learning work offline and avoid requiring a PC or paid AI/API service for core learning. Current sequence: Japanese hiragana foundation, basic katakana extension, Korean Hangul starter, then a carefully scoped Song Study experience using only user-imported, original, public-domain or otherwise cleared text.

The current app is a foundation, not a finished commercial product. It already has a synthetic-only content import/build pipeline, a read-only SQLite repository and Japanese kana chart/practice features. The next engineering task is real iOS/Android device validation—not another broad feature build.

## 2. Start here — authoritative project paths (repository access required)
Use these files from the canonical branch, not `main` unless the path explicitly says main:
- Startup/working rules: [BOOT.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/main/BOOT.md) and [AI_COLLAB/BOOT.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/BOOT.md)
- Current facts: [STATE.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/STATE.md)
- Next executable task: [NEXT_TASK.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/NEXT_TASK.md)
- Decisions and constraints: [AI_COLLAB/DECISIONS.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/DECISIONS.md)
- Adopted/evaluated dependencies and licences: [AI_COLLAB/DEPENDENCIES.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/DEPENDENCIES.md)
- Risk register: [AI_COLLAB/RISKS.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/RISKS.md)
- Research index: [AI_COLLAB/INDEX.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/INDEX.md)
- Gemini source handoff: [Studies on main](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/main/Studies)
- Audited Gemini conclusions: [GEMINI_STUDIES_AUDIT_20261117.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/research/GEMINI_STUDIES_AUDIT_20261117.md)
- Previous technical and competitor research: [TECH_RESEARCH_20261111.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/TECH_RESEARCH_20261111.md), [COMPETITOR_AND_LEARNING_REVIEW_20261111.md](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/AI_COLLAB/COMPETITOR_AND_LEARNING_REVIEW_20261111.md)
- Implementation examples: [alphabets.tsx](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/app/%28tabs%29/alphabets.tsx), [KatakanaPractice.tsx](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/src/features/kana/KatakanaPractice.tsx), [katakanaPractice.ts](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/src/features/kana/katakanaPractice.ts), [katakana-practice.test.mjs](https://github.com/marcelosofficial-ctrl/LingoMingle/blob/lingomingle-foundation-2026-11-10/tests/katakana-practice.test.mjs)

## 3. What has been achieved
- T012–T015: synthetic-only importer and SQLite pack builder; read-only Expo repository; hash-gated staging/provisioning. Conflict handling fails closed and preserves other valid schema-v1 packs.
- T016: SDK 58 asset/filesystem integration, synthetic SQLite app pack and manifest, Metro DB registration and glossary provider.
- T017: typed 46-character Hiragana dataset and accessible chart/detail view.
- T018–T019: deterministic row-scoped Hiragana recognition practice, same-row distractors, progression, score, missed-character retry and fresh rounds; adversarial input validation.
- T020: 46 basic Katakana records and accessible script switching.
- T021: isolated Katakana recognition practice, with row-scoped choices, scoring, missed-only retry and fresh rounds.
- CI #116, run [43959854824](https://github.com/marcelosofficial-ctrl/LingoMingle/actions/runs/43959854824), succeeded on harness-fix commit `5c7e3157d4fd77025f45eb92f746d8a09cc995fe`. Reported checks include typecheck, lint, root tests, iOS/Android Metro exports, importer tests and synthetic-pack reproducibility. This is CI evidence, **not** proof of native device runtime.
- T021 implementation commit: `5b1263c2245d063bebb17fe3438e27e0a03bf16b`.
- Gemini study intake commit: `64c856dfdb5194ead7263ebe92661373ce644377`; checkpoint close commit: `aaa3cc53bd45de5b21536c46d30bc0965c25365a`.

## 4. Non-negotiable constraints
- Local-first/offline core; no paid API, subscription, hosting, store fee or build service without owner approval.
- No scraping or copyrighted lyric/subtitle fixtures. **G1 blocks online copyrighted lyric lookup.** Song Study must use BYO/original/public-domain/cleared text.
- Korean NIKL real-corpus production import/distribution remains HOLD pending corpus-specific authorization. Synthetic fixtures only.
- No new dependency or native module without a demonstrated need, licence review, compatibility evidence and acceptance plan.
- Do not touch the separate `LingoMingle-` repository; do not merge/rebase/delete repositories or branches.
- Do not claim tests, device behavior or licences are verified without direct evidence.

## 5. Current open gaps — research these, do not implement
1. **T022 device acceptance:** define a precise iOS/Android test matrix for app launch, bundled SQLite asset availability, hash/provisioning behavior, read-only repository queries, navigation, accessibility, upgrade/reinstall and failure recovery. Separate simulator/device evidence from Metro export evidence. Identify minimum user actions/tooling and avoid assuming the owner has a Mac/PC available.
2. **T023 review history/SRS:** propose the smallest privacy-preserving local review-event model before choosing an algorithm. Compare FSRS with simpler scheduling; verify Node/Hermes/React Native compatibility, runtime constraints, migration, explainability, and what data is actually needed. Current notes flag ts-fsrs 6.0.0's Node >=24 requirement against CI Node 22; independently verify current upstream facts.
3. **Korean starter and rights:** research Hangul learning scope and legally usable lexical/example data. Distinguish metadata licence from corpus redistribution permission. Do not recommend NIKL production use without explicit written authorization.
4. **Learning quality:** assess whether recognition-only kana practice is sufficient for the current stage; recommend a staged progression toward recall, production, listening and contextual use without overbuilding or disrupting the MVP.
5. **Content architecture:** examine canonical language facts versus learner-authored mnemonics, answer aliases, script/romanization conventions (`を=wo`, `ヲ=wo`), versioning and data provenance.
6. **Privacy/security/offline quality:** identify risks in local SQLite, imported content, backups, analytics, user-created study data and future sync. Prefer no account/network for core functionality.
7. **Product and distribution:** identify differentiators and realistic validation experiments versus established language apps. Do not assume paywall, trial, mascot or subscription strategies work without LingoMingle-specific evidence.

## 6. Prior Gemini intake — do not blindly repeat
The audited study accepted Four Strands as a whole-course balance, ILH as a task-design heuristic, original visual mnemonics, separation of conversion/morphology/dictionary/IME layers, and careful licence isolation. It rejected LRCLIB integration under G1, unsupported StoreKit 1 cutoff claims, fixed keyboard-memory figures and unvalidated commercial/paywall assumptions. WanaKana, es-hangul and AzooKey/Zenzai are evaluated candidates only, not adopted dependencies. Read the audit file before revisiting these topics and challenge it if new primary evidence contradicts it.

## 7. Required research deliverable
Return one concise but substantial research packet:
- Executive summary: top 5 improvements ranked by impact, confidence and effort.
- Findings table: gap, evidence, why it matters, proposed direction, dependencies/licence, risks, validation method.
- Cite primary/official sources and date-sensitive claims; separate VERIFIED / INFERRED / UNKNOWN.
- Map every recommendation to an existing project path/task or explicitly mark it as a proposed new task.
- Include a short acceptance checklist and what should **not** be built.
- Identify contradictions or errors in current project assumptions, including in the Gemini audit.
- Do not edit GitHub or implement anything. Send the report to the owner for ChatGPT to reconcile and integrate.

Aim for independent criticism, not agreement. Prioritize evidence and practical improvements over a large generic feature wish-list.
