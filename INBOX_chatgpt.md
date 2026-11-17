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
Continuation recovery completed on canonical branch. GitHub metadata confirms repository remains PUBLIC; no visibility change made. Latest five working-branch commits were listed; no external commits after the prior completed pass were present before this pass's start commit. Actions API confirms #116 SUCCESS is still latest (run 43959854824, SHA 5c7e3157); #115 is the preceding failed harness run, superseded by #116. T022 cannot be executed in this GitHub-only environment: no native iOS/Android device output or development build is available. Do not substitute Metro exports or CI for device acceptance. No app code changes and no tests run. Required next evidence: iOS and Android development/preview builds with packaged SQLite asset, install/launch/offline provisioning/read-only checks, and completed matrix evidence.
