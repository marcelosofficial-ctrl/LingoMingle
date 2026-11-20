# T022 hosted Android emulator smoke — implementation-ready scope

Date: 2026-11-20
Status: PREPARED / OWNER APPROVAL REQUIRED / NOT EXECUTED
Branch: `lingomingle-foundation-2026-11-10`

## Purpose
Complement the existing successful debug-APK build with native Android emulator evidence while the owner has no reliable PC/device access. This is a separate automated CI smoke path—not physical-device acceptance and not a substitute for iOS.

## Scope mapping
| T022 row | Hosted emulator coverage | Limit |
|---|---|---|
| 01 install + cold launch | Install APK on AVD, force-stop, launch, wait for activity, collect screenshot/logcat | Emulator only |
| 02 offline launch | Disable emulator network; force-stop/relaunch; navigate to alphabet route | Does not prove real radio/offline transition |
| 03 bundled DB | Inspect app logs and sandbox for expected provisioned DB | Requires path/log discovery; no path assumed |
| 04 hash/integrity | Run existing verification path and collect expected/actual hash | Only if diagnostics expose it; no app code added for this job |
| 05 first-run | Fresh AVD/data, launch once, capture provisioning sequence | Fresh emulator state |
| 06 idempotent second launch | Force-stop/relaunch, compare DB hashes/size and log provisioning outcome | Avoid treating timestamps as proof |
| 07 read-only provider | Exercise chart/quiz screens; capture log output and DB hash before/after | Screen-only evidence cannot prove no writes; inspect hash/diagnostics |
| 08 hiragana | Navigate first/middle/final rows, open detail, practice | Automatable via UI steps only if stable selectors/accessibility labels exist |
| 09 katakana | Same sample points and script switch; practice | Same automation stability caveat |
| 10 navigation | Route/tab/back transitions, capture screenshots and crash logs | Limited to scripted paths |
| 11 accessibility | AVD TalkBack smoke may be possible, but requires deliberate setup and observations | Not full accessibility acceptance |
| 12 text/display | AVD font-size setting and screenshot comparison | Limited sizes/density; not every device |
| 13 interrupted provisioning | **Not included in first smoke**; needs safe existing injection hook or disposable fault-injection design | No corrupt-file manipulation against real user data |
| 14 upgrade/reinstall | Later phase: install build A, install build B over it, compare pack/data; separate uninstall/reinstall test | No guarantee of user-data retention without observed evidence |
| 15 parity | Android emulator only | iOS parity remains blocked |

## Suggested disposable workflow design (no implementation yet)
- Manual dispatch initially, with read-only `contents` permission; no third-party action beyond the existing official setup actions where possible.
- Reuse the current direct Expo Prebuild + Gradle APK build rather than duplicate build logic. Refactor only if a clear build artifact dependency makes reuse impossible.
- Enable KVM with runner's documented group permissions; create an x86_64 AVD on an API image available from the runner; use headless mode and bounded boot wait.
- Install the exact APK produced by the same run via `adb install`; launch using the package/activity discovery path, not a guessed activity name.
- Capture `adb logcat`, screenshot, package metadata and app-sandbox database inventory. Avoid uploading personal data; this is synthetic content only.
- Use fixed timeouts, fail-fast install/launch/crash checks and short artifact retention. If emulator startup/KVM fails, mark the run as infrastructure-blocked; do not convert it to a product failure.
- First iteration targets launch/offline/basic navigation/pack provisioning/read-only behavior only. Add UI automation after app accessibility identifiers are proven stable. Use no destructive fault injection in the first pass.

## Evidence and acceptance boundary
A successful run can close selected **Android emulator** smoke checks only, with its commit, APK SHA, AVD/API, runner, command results, screenshots/logs, DB hash and explicit row mapping. It cannot pass physical Android T022, iOS T022, accessibility fully, interrupted provisioning, upgrade behavior, or platform parity. Preserve all those rows as NOT RUN/BLOCKED until separately observed.

## Decision gate
Owner approval is required before adding a workflow or changing CI. Proposed approval scope: one manual, bounded hosted Android emulator smoke workflow using the existing APK pipeline, no credentials, no external service, no dependencies, no release signing, no publishing, and no changes to app/security/privacy boundaries. If approved, implement in a small pass and stop after the initial smoke result. Otherwise leave this memo as a ready proposal.
