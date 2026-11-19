# Grok study reconciliation — 2026-11-19

Status: **INGESTED / AUDITED / NOT ACCEPTED AS PRODUCT SCOPE**  
Source package: `GROK_LINGOMINGLE_RESEARCH.zip` supplied by the owner in chat. The original ZIP is not stored in this repository. The study files were read in full across bounded sections; their SHA-256 checksums matched the supplied `SHA256SUMS.txt`.

## Executive result

Grok's four-pass study evaluates a *proposed optional Japanese/Korean romantic-speech and relationship-pragmatics lesson mode*, and audits LingoMingle's current visual system, accessibility, and Liquid Glass usage. It is not a study of an already approved feature. The study's own final handoff says the romance mode, design direction, and implementation sequence are unaccepted; no app edits or tests were made by Grok.

**Current product goal remains unchanged:** local-first language learning; Japanese kana work in progress, Korean/Hangul starter planned, Song Study later. G1 continues to block online copyrighted lyric lookup/synchronised lyric playback. User-imported, original, public-domain, or otherwise cleared text remains the only acceptable Song Study input. The active task remains T022 native/device acceptance; T023 remains the review-event architecture/spike workstream. This study does not supersede either.

## Findings worth preserving

### 1. Speech pragmatics must be taught as contextual choices, not magic phrases

- **VERIFIED (bounded source):** Filia & Nurfitri (2020) describe 12 Japanese street-interview videos, 79 confession-related utterances, and 16 expression types. Grok reports `好きです` at 36/79 (46%) and `付き合ってください` at 26/79 (33%). The publisher/academic landing page supports the study's small elicited-interview basis, but its linked full PDF was inaccessible during independent checking. Treat the percentages as *reported by the paper/Grok*, not a broadly representative frequency estimate.
- **VERIFIED (bounded source):** Won (2017) compares confession-related scenes in Japanese and Korean television dramas, not naturally occurring balanced conversation. The full article reports 39 Japanese and 140 Korean scenes drawn from selected remake dramas. It reports direct-confession formulas at 10.4% for Japanese and 7.1% for Korean within its classification, with adjunct formulas dominating both samples. This is a media corpus, uneven in size and context, not evidence of universal national speaking styles.
- **UNKNOWN:** The study does not establish a safe, representative, evidence-backed set of Korean confession formulas. Do not invent or teach Korean lines based on implication, fandom consensus, or translation intuition. Verify every candidate against appropriate Korean primary sources and competent review before any lesson.
- **INFERRED / design principle:** separate Japanese and Korean lesson content; teach the speech act, relationship, age/status, situation, degree of directness, and register together. Avoid “one phrase works everywhere” lessons.

### 2. Refusal, boundaries, and consent need to precede confession content

- **VERIFIED (bounded source):** The Japanese refusal research discussed by Grok concerns ordinary requests, invitations, offers, and suggestions; it is not a study of romantic rejection. The examples show that refusal can be indirect or unfinished (for example, a hesitant `ちょっと…`). Its useful application is a caution: learners need to recognize pragmatic refusal cues rather than wait for a blunt “no”.
- **VERIFIED / conflicting evidence:** The Korean refusal studies described in Grok use different methods and settings and report different distributions. One is a DCT comparison; another uses drama refusals and a Seoul survey. Preserve the disagreement; do not summarize them as a single “Korean refusal style”.
- **INFERRED / safety principle:** Any future lesson sequence should teach hearing a refusal, accepting it, and stopping; then how to refuse and set boundaries oneself; only later teach approach/confession. Never teach persistence, pressure, or “try again until the other person is explicit” as a response to an indirect refusal.
- **UNKNOWN:** Neither set of refusal studies measures romantic consent outcomes or validates a complete consent curriculum. A language lesson can teach phrases and pragmatic cues; it must not claim to assess another person's consent.

### 3. Register changes are negotiated social actions

- **VERIFIED (bounded source):** Grok's Korean banmal discussion draws on a small `We Got Married` television-couple sample. Offers to speak casually were often initiated by the older partner and could be phrased politely. This is useful as an example of negotiated register change, not a universal age/gender rule.
- **INFERRED / design principle:** explain that a register shift is offered, accepted, and context-dependent. Do not tell learners that plain form automatically means intimacy, consent, or romantic interest. Do not teach a learner to initiate banmal solely because two people are dating or are the same age.
- **VERIFIED / caution:** Gendered Japanese “women's speech” lists and aegyo are socially marked performances with variation. Do not make them mandatory, natural, or representative of how women should speak. The additional 2026 aegyo phonetics study uses 12 Seoul Korean speakers reading controlled scripts; it is not a broad survey of everyday speech.

### 4. Current visual/accessibility audit and design constraints

The study pinned code at `f627638d1031b168f0512f3e1493d02fd3325142`. A comparison to the pre-intake head `aea2a0e43d650069c3ac4bd58b57bcac9bdb45df` found 33 commits ahead, but the relevant theme, glass helper, app config, and tab-layout files remain as described in Grok's baseline (the app config only gained the Android package ID).

- **VERIFIED:** the current palette is paper/sage: canvas `#F7F4EF`, surface `#FFFEFC`, ink `#252521`, muted `#77766F`, line `#E8E3DA`, accent `#526B58`.
- **VERIFIED (calculation):** muted text `#77766F` on canvas is about **4.16:1**, below the WCAG 2.2 AA 4.5:1 normal-text minimum. On surface it is about **4.52:1**, only just above. Ink and accent combinations checked by Grok/current calculation exceed 4.5:1 on the two base surfaces.
- **INFERRED / candidate, not decision:** Grok's `#717069` calculates at about **4.53:1** on canvas—only a 0.03 margin. An independently calculated darker candidate `#6D6C65` is about **4.81:1** on canvas and **5.23:1** on surface. Neither is approved; inspect real text sizes, opacity, states, and themes, then add automated contrast tests before choosing.
- **VERIFIED:** current app has four native tabs (Songs, Alphabets, Review, You), automatic system interface style, and a Liquid Glass availability helper. The helper currently checks iOS, Liquid Glass availability, and Glass Effect API availability; it does not check Reduce Transparency.
- **VERIFIED:** Apple recommends keeping Liquid Glass to controls/navigation rather than content; Expo SDK 58 documents an accessibility Reduce Transparency check because the API may be present while the visual effect is restricted. Native iOS 26 tabs already participate in the system Liquid Glass treatment.
- **INFERRED / implementation guardrail:** do not add custom glass to kana, lesson, song, text, or other content cards. Keep an opaque/solid fallback and respect Reduce Transparency. Do not build a custom glass tab bar over Expo NativeTabs.
- **NOT DECIDED:** no reskin, dark-mode direction, typography change, motion system, haptics, or new theme has been accepted. The portfolio/EasyFlix style is not automatically LingoMingle's design system.

## Recommendation and deferred decision gate

Keep the report as a **candidate later product exploration**, not a new roadmap commitment. No new feature should displace T022 or the local review-history foundation.

If the owner later elects to explore romance/pragmatics lessons, require all of these gates first:
1. Confirm the product purpose is language pragmatics, not dating, matching, companion, or relationship simulation.
2. Decide audience/age policy with current Apple/Google rules before release; do not infer an 18+ rating solely from phrase lessons.
3. Develop separate Japanese and Korean content with primary-source citations, native/qualified review, register/context notes, and explicit confidence labels.
4. Put refusal recognition, respecting a no, and self-boundaries before approach/confession; no coercion, manipulation, pressure, sexual escalation, or persistence drills.
5. Keep it out of alphabet recognition and beginner kana charts; use a clearly optional, owner-approved content area only if it serves the product.
6. Test content for naturalness, social stereotyping, age/status/register assumptions, accessibility, and learner misunderstanding.
7. Obtain explicit owner acceptance of the feature scope, visual direction, and sequence before implementation or product copy.

### Explicitly not adopted

No romance/pragmatics mode, default-off preference, new navigation destination, age-gate, content pack, Japanese/Korean phrase set, theme reskin, GlassView usage, motion/haptics system, app-store declaration, or product roadmap change is authorized by this intake. No dependencies, data sources, paid services, models, native modules, lyric APIs, paywalls, or credentials were added.

## Source packet integrity

Package supplied by owner: `GROK_LINGOMINGLE_RESEARCH.zip`. Its manifest matched these source-file hashes:

- `README.md`: `8ff6513e3150456004ea6d6669f6834b5ee5a74c34d6f181674f1035f521c293`
- `PASS_1/PASS_1.md`: `96a502f873a852048f294b0b977a7dc8a31ed196219b9f43fc94f0de8a3a2146`
- `PASS_2/PASS_2.md`: `911d7427c08c72f376e394e2983e9290948d45b4a2aeaea5df56846918274fe7`
- `PASS_3/PASS_3.md`: `a363182a3df53a61de50f55297ec94935a8c58e26fc9026fe07c6810577cc4f3`
- `PASS_4/PASS_4.md`: `71bd356bffd8a55cf83f6679ad13a58cc9d0452e5e623b6df63372ff6bd386b1`

See `AI_COLLAB/GROK_STUDY_EVIDENCE_20261119.md` for the evidence ledger, citations, exact limitations, policy checks, and verification notes.

## Work performed / not performed

- **VERIFIED:** all four Grok passes and the README were ingested; package checksums matched.
- **VERIFIED:** current live branch and relevant theme/tab files were compared with the study's pinned baseline.
- **NOT RUN:** application tests, CI, visual/device tests, contrast test suite, Korean/Japanese native-speaker review, or feature prototype.
- **No implementation changes** were made as part of this study intake.
