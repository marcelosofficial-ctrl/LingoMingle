# Grok study evidence ledger — 2026-11-19

This file records the evidence boundaries behind `GROK_STUDY_RECONCILIATION_20261119.md`. “Verified” means the cited source or repository artifact was inspected; it does not mean a small or context-specific study generalizes to all speakers.

## Primary / authoritative sources independently checked

### Apple / Liquid Glass / accessibility

- Apple Human Interface Guidelines, Materials: https://developer.apple.com/design/human-interface-guidelines/materials
  - **VERIFIED:** Liquid Glass is for navigation and controls; Apple says not to use it in the content layer. Also notes accessibility settings can change material appearance.
- Expo SDK 58 Glass Effect: https://docs.expo.dev/versions/v58.0.0/sdk/glass-effect/
  - **VERIFIED:** GlassView support/fallback and API availability checks; `isLiquidGlassAvailable()` is not sufficient by itself when Reduce Transparency is enabled. Check `AccessibilityInfo.isReduceTransparencyEnabled()` before relying on the effect.
- Expo Router Native Tabs: https://docs.expo.dev/versions/v58.0.0/router/advanced/native-tabs/
  - **VERIFIED:** iOS 26 native tab bar uses the system Liquid Glass treatment. Current LingoMingle uses `NativeTabs`; don't stack a custom glass bar on top.
- W3C WCAG 2.2, SC 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
  - **VERIFIED:** normal text minimum is 4.5:1 (large text 3:1); thresholds are exact, not rounded. W3C advises aiming higher because anti-aliasing can reduce apparent contrast.

### Store policies

- Google Play Console Help, Age-Restricted Content and Functionality: https://support.google.com/googleplay/android-developer/answer/16329168
  - **VERIFIED:** core matchmaking/dating functionality must block minors; incidental dating functionality may be treated at feature level with appropriate age safeguards.
- Apple Developer, Upcoming: New age rating content descriptors in App Store Connect (2026-11-02): https://developer.apple.com/news/?id=3p6mav5n
  - **VERIFIED:** new descriptors include Dating & Relationships, defined around enabling dating/relationship connections between real people and/or a virtual companion engaging in sexual or romantic content; declarations are available since 2026-11-16 and due 2027-01-12. The descriptor carries 18+ where it applies.
  - **UNKNOWN:** whether a non-interactive language lesson teaching romantic phrases falls within this descriptor. Do not pre-classify it as dating/relationships or infer an 18+ rating without reviewing the actual feature and current policy.

### Speech-pragmatics research

- Filia & Nurfitri (2020), “The Speech Act of Confession of Love by Japanese Men and Women”: https://journal.unj.ac.id/unj/index.php/ijalr/article/view/15985
  - **VERIFIED:** publisher/academic landing page confirms the study's 12 street-interview videos, 79 utterances, and 16 categories. Grok reports counts of 36 `好きです` and 26 `付き合ってください` (46% and 33%). **LIMITATION:** publisher-linked full PDF returned HTTP 403 in this check; percentages/count table therefore remain attributed to Grok's transcription/report and not independently rechecked against publisher-hosted full text. The small elicited street-interview sample is not a representative natural-conversation corpus.
- Won (2017), DOI 10.21792/trijpn.2017..78.004; NINJAL bibliography: https://repository.ninjal.ac.jp/records/2000007
  - **VERIFIED:** inspected the full article PDF. It compares confession-related scenes in selected Japanese/Korean TV dramas, with 39 Japanese and 140 Korean scenes. It reports direct confession formulas at 10.4% (Japan) and 7.1% (Korea), with adjunct formulas 89.6% and 92.9% respectively.
  - **LIMITATION:** selected television drama scenes, uneven sample size, adaptation/remake context; not a balanced corpus of everyday speech. “Adjunct” is a coding category, not automatically a recommended or polite model expression. The paper classifies a range of scene utterances; do not use all coded utterances as lesson exemplars.
- Japanese refusal pragmatics overview: https://carla.umn.edu/speechacts/japanese/refusals/
  - **VERIFIED:** examples demonstrate indirect/incomplete refusals for requests, invitations, offers, and suggestions. **LIMITATION:** the page is archived and explicitly not maintained; the speech acts are not specifically romantic rejection. Use only as a warning not to mistake indirect refusal for consent or keep pressing.
- Kwon (2004) / Korean refusal and UNSW thesis discussed in Grok Pass 2:
  - **VERIFIED only at Grok-report level:** study methods and differing findings are accurately represented as two non-identical research designs in the packet.
  - **UNKNOWN / not independently fully retrieved in this pass:** primary full texts were not both inspected. Retain the contradiction and do not generalize; seek original papers before any curriculum claim.
- Baštanová Kwak (2020), DOI 10.14746/kr.2020.06.02, discussed in Grok Pass 2:
  - **VERIFIED only at available bibliographic/abstract snippet level:** small reality-TV couple sample and offers of banmal are described. Exact sample coding should be checked against full paper before teaching phrase-level rules.
- Kim & Dellwo (2026), “Acoustic correlates of aegyo in Korean speech,” DOI 10.1121/10.0044475:
  - **VERIFIED:** abstract describes 12 Seoul Korean speakers reading identical scripts in aegyo/non-aegyo conditions and a socially recognized childlike speaking style used predominantly in some adult romantic interactions.
  - **LIMITATION:** controlled scripted sample, not prevalence/appropriateness guidance for all speakers or women.

## Repository cross-check

- Study's pinned baseline: `f627638d1031b168f0512f3e1493d02fd3325142`.
- Pre-intake branch head: `aea2a0e43d650069c3ac4bd58b57bcac9bdb45df`.
- GitHub compare: 33 commits ahead, 0 behind. Relevant design files were not changed in that interval; app config gained an Android application ID. Current code inspected:
  - `src/theme/tokens.ts`: same six paper/sage tokens listed in reconciliation.
  - `src/theme/glass.ts`: checks iOS, `isLiquidGlassAvailable()`, and `isGlassEffectAPIAvailable()`; no Reduce Transparency check currently.
  - `app/(tabs)/_layout.tsx`: four `NativeTabs` triggers: Songs, Alphabets, Review, You.
  - `app.json`: `userInterfaceStyle: "automatic"`; Android package `com.marcelosofficial.lingomingle`.
- The theme/tab observations are therefore still relevant to the live branch at this intake, not stale assumptions from the pin.

## Independently calculated contrast ratios

Calculated from sRGB relative luminance using WCAG 2.x contrast formula. Ratios are not test-suite output.

| Foreground | Background | Ratio | Result for normal text |
|---|---|---:|---|
| `#77766F` | `#F7F4EF` | 4.16:1 | FAIL |
| `#77766F` | `#FFFEFC` | 4.52:1 | Pass, narrow margin |
| `#252521` | `#F7F4EF` | 14.02:1 | Pass |
| `#252521` | `#FFFEFC` | 15.26:1 | Pass |
| `#526B58` | `#F7F4EF` | 5.31:1 | Pass |
| `#526B58` | `#FFFEFC` | 5.78:1 | Pass |
| `#717069` | `#F7F4EF` | 4.53:1 | Pass, extremely narrow |
| `#717069` | `#FFFEFC` | 4.93:1 | Pass |
| `#6D6C65` | `#F7F4EF` | 4.81:1 | Pass candidate |
| `#6D6C65` | `#FFFEFC` | 5.23:1 | Pass candidate |

`#6D6C65` is only an independently calculated candidate with more margin, not an accepted token. Validate all sizes, font weights, opacity, disabled/focus/error states, dark mode, and surfaces actually used. Automated contrast testing is not present or run in this pass.

## Additional important limitations / corrections

1. “Most frequent phrase in this sample” is not the same as “most natural phrase for all speakers”. Japanese confession counts are one small elicited interview dataset; Korean drama frequencies are scripted media.
2. A drama scene's “adjunct formula” is not necessarily a useful or safe expression to teach. Select pedagogical examples independently.
3. No Korean confession phrase is validated by this intake. Do not infer a phrase from the Japanese data or translate it mechanically.
4. Indirect refusal examples are not a romantic consent model, but ignoring them risks learners reading hesitation as permission. Teach stop/respect as a conservative interaction principle without claiming research has measured consent outcomes.
5. Register choice is not a romance toggle. Plain form and banmal require pragmatic context; neither proves affection, consent, or permission.
6. Aegyo and gendered speech are not universal gender requirements or default learner targets.
7. Apple/Google dating policy may matter only if feature functionality falls within the policy definitions. A static language-learning module may be different; classification remains UNKNOWN until the feature is specified.
8. Grok's proposed work IDs LM-C01–LM-C06 are study labels, not repository tasks, implemented requirements, or passing acceptance tests.

## Test and implementation status

- Grok reports no product edits or test/CI execution.
- This reconciliation made no app-code, schema, content-pack, build, dependency, navigation, theme, or release-policy changes.
- **NOT RUN:** application tests, CI, device tests, visual accessibility tests, automated contrast tests, native-speaker validation, or a feature prototype.
