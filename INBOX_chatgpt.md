# INBOX_chatgpt
## 2026-11-11 from:user status:resolved
User explicitly selected the repository named exactly LingoMingle, with no trailing symbols. This is the sole canonical project repository.
Do not work in or delete LingoMingle-. User requested a full-power pass and authorized continued project work. No paid services, accounts, build credits, subscriptions, or store fees approved.

## 2026-11-16 from:claude status:info
Root BOOT.md now exists on main (commit 85c40e1) and names this branch, lingomingle-foundation-2026-11-10, as canonical, so the startup rule is satisfied; the owner asked Claude to fix the startup rule and delegated the choice. Read the files it lists from this branch. AI_COLLAB/CHECKPOINT.md still says IN PROGRESS (T021 test-harness fix 5c7e315 awaiting CI): recover from it as usual. Nothing needs deleting; do not delete LingoMingle- or any repository.

## 2026-11-17 from:user status:actioned
User reported an external AI research agent is not signed into GitHub and receives a not-found page. Verified repository visibility was PRIVATE. This blocks unauthenticated agents from reading all repository links; it does not invalidate the project work, but it means the agent must receive the handoff and any required supporting excerpts pasted directly, or have its own GitHub identity explicitly granted repository access. Never share account credentials or personal access tokens, and do not change repository visibility without explicit owner approval.
Updated AI_COLLAB/EXTERNAL_AI_RESEARCH_HANDOFF_20261117.md to put this access warning at the top and correct the misleading "public project paths" wording. The document itself remains private; for an unauthenticated agent, the owner must copy/paste its contents into the agent session.

## 2026-11-17 from:github-observation status:verified
At the start of the next continuation pass, GitHub API reported repository visibility PUBLIC (repo metadata visibility=public; latest CI run also reports private=false). This differs from the earlier PRIVATE state. External unauthenticated GPT should now be able to open repository links. No visibility change was made by ChatGPT. Public visibility exposes all accessible branches, source, docs and Git history. No automatic 24-hour expiry is configured or verified.

## 2026-11-17 from:user status:actioned
Owner explicitly confirmed they made LingoMingle public temporarily so another AI can inspect project gaps. Live GitHub repo metadata verified visibility=PUBLIC during this pass. Do not change visibility. A one-time reminder was successfully scheduled for 24 hours later to restore PRIVATE; reminder ID 6afc054725d8819194682af8103681fe. No automatic GitHub visibility expiry exists; owner must perform the change. T022 remains the next project task and requires actual native iOS/Android development builds/devices; CI/Metro export is insufficient. Latest recorded CI remains #116 SUCCESS; this pass made documentation-only changes and did not run tests.

## 2026-11-17 from:chatgpt status:blocked
Continuation recovery completed on canonical branch. GitHub metadata confirms repository remains PUBLIC; no visibility change made. Latest five working-branch commits were listed; no external commits after the prior completed pass were present before this pass's start commit. Actions API confirms #116 SUCCESS is still latest (run 43959854824, SHA 5c7e3157); #115 is the preceding failed harness run, superseded by #116. T022 cannot be executed in this GitHub-only environment: no native iOS/Android device output or development build is available. Do not substitute Metro exports or CI for device acceptance. No app code changes and no tests run. Required next evidence: iOS and Android development builds with packaged SQLite asset, install/launch/offline provisioning/read-only checks, and completed matrix evidence.

## 2026-11-17 from:chatgpt status:research
T022 remote-build feasibility researched against current official Expo documentation and recorded in NEXT_TASK.md. VERIFIED: Expo EAS Free currently includes up to 15 Android and 15 iOS builds per month, with low-priority queueing. EAS Build supports CI pipelines. An EAS preview profile with distribution internal produces an installable Android APK; the artifact can be downloaded directly on the physical device, without Google Play distribution. VERIFIED: iOS physical-device ad hoc installation requires a paid Apple Developer account and registered UDID. A recursive tree scan found no eas.json or .eas/workflows YAML. INFERRED: a GitHub Actions workflow plus Expo token could enable Android APK builds without local Android tooling, but project linking, Expo credentials, package configuration and the exact workflow remain unverified. UNKNOWN: owner prerequisites. No account, secret, paid service or build configuration was created.

## 2026-11-17 from:chatgpt status:research
T022 build-bootstrap rechecked. VERIFIED: Expo's CI guide requires a successful initial local EAS build to initialize project ID, create eas.json and populate native identifiers. Current app.json had neither identifier and no eas.json. VERIFIED: standard hosted runners are free/unlimited for public repos; Ubuntu 24.04 includes Android SDK tools. INFERRED: direct GitHub Actions + Prebuild + Gradle could avoid Expo account/token, but standalone bundle/signing/install needed proof. No configuration or workflow created.

## 2026-11-17 from:user status:pending-research
Owner expects independent app studies from Grok and GPT. Neither study had been received at that time. Ingest separately when received and reconcile against primary evidence. Do not treat studies as implementation authorization. Preserve G1, corpus rights HOLD, and no unapproved dependencies/models/native modules/paid services/data sources/paywalls.

## 2026-11-18 from:chatgpt status:research
T022 Android emulator preflight researched. VERIFIED: GitHub-hosted Linux runners support hardware acceleration; Android AVD/ADB docs describe creating, starting and installing. INFERRED: bounded x86_64 API 36 emulator smoke could install APK, launch, capture screenshot/logcat and inspect SQLite. UNKNOWN: KVM availability and exact DB path. No workflow change.

## 2026-11-18 from:chatgpt status:research
T022 iOS Simulator preflight researched. VERIFIED: Expo Simulator builds are unsigned; GitHub macOS runners can run Xcode Simulator. INFERRED: manual macOS workflow could build and launch. UNKNOWN: iOS bundle identifier; don't invent permanent identity. Simulator is not physical iPhone acceptance. No workflow change.

## 2026-11-18 from:chatgpt status:privacy-reminder-result
VERIFIED: one-time reminder 6afc054725d8819194682af8103681fe ran (run 563904f6-a0c4-8320-a02d-8431b4cab79b) and is disabled. It warned the owner repo remained PUBLIC. Delivery status UNKNOWN; repo was still PUBLIC at 10:31 Europe/Madrid. Owner must restore PRIVATE manually when research window ends. No visibility change made.

## 2026-11-18 from:chatgpt status:research-and-deliverable
VERIFIED: T022 native smoke protocol added at AI_COLLAB/T022_NATIVE_SMOKE_PROTOCOL_20261118.md. It separates Android emulator, iOS Simulator and physical-device evidence, and corrects EAS bootstrap, public-runner billing, SQLite seed/reuse and signing claims. No Grok/GPT payload appeared; Gemini remains only absorbed external study. No workflows, code, dependencies or tests changed.

## 2026-11-18 from:chatgpt status:T023-contract
- VERIFIED: repository visibility still PUBLIC (private=false) at this pass; owner said the public window would continue for a few more hours. No visibility change made. No automatic expiry assumed.
- VERIFIED: latest five commits before this pass were enumerated from the canonical branch; no external study commit was present in that history. INBOX contains no Grok/GPT payload; Gemini remains the only absorbed independent study.
- RESEARCH: opened Anki's official review-history documentation, FSRS/ts-fsrs v6 release notes and repository/license, Anki desired-retention/workload guidance, and Expo SDK 58 SQLite transaction documentation.
- VERIFIED: ts-fsrs v6.0.0 was published 2026-10-28, defaults to FSRS-7, introduces breaking API changes, and declares Node >=24. Current LingoMingle CI baseline is Node 22.13.1. MIT licence. UNKNOWN: Hermes compatibility.
- DELIVERABLE: AI_COLLAB/T023_REVIEW_EVENT_CONTRACT_20261118.md specifies an immutable local-only event envelope, idempotent persistence, distinction between answer correctness and subjective recall grade, versioned content identity, rebuildable projections, privacy minimization, 14 acceptance tests and a bounded Hermes compatibility spike.
- RED-TEAM: rejected deriving FSRS grade from quiz correctness; rejected mutable-only score state; corrected assumption that TypeScript means Hermes-compatible; accounted for Expo SDK 58 transaction scope behavior; protected history across content-pack retirement.
- LIMITS: documentation only. No app code, DB migration, scheduler, dependency, telemetry, sync, account, paid service or workflow changed. Tests NOT RUN. T022 remains open.

## 2026-11-19 from:chatgpt status:T023-preflight
VERIFIED: T023 local review-event contract remains unimplemented and algorithm-neutral. Checked official Expo/React Native Hermes documentation and ts-fsrs v6.0.0 release, migration, API, and package metadata. Expo SDK 58 uses supported Hermes; React Native bundles engine alongside RN version. ts-fsrs v6.0.0 defaults FSRS-7, uses explicit v6 API including iterable preview, monorepo root declares Node >=24 (project CI baseline recorded as Node 22.13.1), and package entry depends on internal workspace @open-spaced-repetition/srs-kit. Node engine requirement alone is not mobile runtime incompatibility; TypeScript/Node passing is not Hermes proof. Added AI_COLLAB/T023_SCHEDULER_COMPATIBILITY_PREFLIGHT_20261119.md with narrow test gate. UNKNOWN: full transitive runtime compatibility, Metro/Hermes behavior, deterministic clock, serialization and bundle/performance. NOT RUN: dependency install, runtime spike, tests, benchmark. No dependency adopted. T022 remains NEXT_TASK.
