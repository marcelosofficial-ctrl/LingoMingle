# T022 — native device acceptance matrix
Prepared: 2026-11-17
Status: PLAN READY; DEVICE EXECUTION NOT RUN
Branch: lingomingle-foundation-2026-11-10

## Purpose and evidence boundary
T016–T021 CI and Metro exports establish typecheck, lint, automated tests, platform bundling, importer validation and synthetic-pack reproducibility. They do not establish that a native app installs, launches, provisions its bundled SQLite pack, or queries it correctly on a real device. T022 closes that gap.

This file is a test protocol, not a claim of completion. Record results per platform and device. Do not mark a check PASS without observed output or a screenshot/log.

## Preconditions
- Use a development/preview build that contains the app's native asset configuration. A Metro export or Expo Go session alone is not sufficient evidence for the bundled-asset path.
- Use only the synthetic pack already committed to the app. Do not import NIKL or any real corpus.
- Record app commit SHA, build profile/build ID, device model, OS version, install method, date and whether the test was online/offline.
- Keep a clean baseline and a separate upgrade/reinstall run. Do not manually edit the installed SQLite database during baseline checks.

## Acceptance matrix — run independently on iOS and Android
For every row use PASS / FAIL / BLOCKED / NOT RUN, attach the evidence listed, and include the exact observed error for failures.

| ID | Check | Procedure | Expected result | Evidence |
|---|---|---|---|---|
| T022-01 | Native install and cold launch | Install the native build; force-quit; launch from the device home screen | App opens without a red screen, native crash or missing-asset error | Device/OS, build ID, launch screenshot and crash/log output |
| T022-02 | Offline launch | Enable airplane mode before cold launch; navigate to Alphabets | Core screen remains usable; no required network request blocks it | Screenshot and network/offline state |
| T022-03 | Bundled database presence | Launch the code path that resolves the packaged SQLite asset and provisions it | Packaged asset resolves and the app's expected database file exists at its provisioned destination | Asset/provisioning logs; resolved path; file size |
| T022-04 | Integrity and identity | Run the existing manifest/hash verification path against the provisioned file | Hash matches the committed synthetic-pack manifest; mismatch fails closed | Expected/actual hash and verification result |
| T022-05 | First-run provisioning | Start from a clean app install/data sandbox and trigger normal initialization | Provisioning completes once; repository opens only after successful verification | First-run log sequence and repository-open result |
| T022-06 | Idempotent second launch | Force-quit and relaunch without clearing app data | Existing valid pack is reused; no unnecessary destructive replacement or duplicate initialization | Before/after file hash and launch logs |
| T022-07 | Read-only repository | Open the normal chart/glossary/practice flows that read the pack; inspect repository diagnostics if available | Expected records are returned; app-facing repository does not mutate the pack | Screen evidence and query/diagnostic output |
| T022-08 | Hiragana data | Open Hiragana chart and sample first, middle and final rows; open a detail and practice round | Correct glyph/reading/row mapping; no missing or duplicated basic entries | Screenshots and any data assertion output |
| T022-09 | Katakana data | Switch to Katakana; sample first, middle and final rows; start and complete a practice round | 46 basic records render; Katakana practice remains isolated from Hiragana state | Screenshots and round result |
| T022-10 | Navigation and return | Move between chart, detail, practice and tabs; use back/navigation controls | No blank route, lost screen or runtime error | Short screen recording or ordered screenshots |
| T022-11 | Accessibility | Enable VoiceOver (iOS) / TalkBack (Android); navigate chart, detail and quiz controls | Controls have meaningful labels, logical focus order and announced selected/feedback state | Accessibility observations; note exact failures |
| T022-12 | Text/display resilience | Increase system text size; test narrow/large display settings where available | Essential labels and controls remain visible and operable; no clipped critical action | Screenshots and device settings |
| T022-13 | Interrupted provisioning | On a disposable test install only, interrupt or simulate a failed copy using an existing test hook; relaunch | Partial/corrupt file is not treated as valid; app fails safely and can recover without damaging another valid pack | Failure injection method, logs, hashes before/after |
| T022-14 | Upgrade/reinstall behavior | Install a newer build over the prior build, then separately uninstall/reinstall | Existing valid data is not silently corrupted; bundled pack can be restored. Document whether user data is intentionally retained or erased | Build IDs, before/after hashes, observed data retention |
| T022-15 | Platform parity | Repeat the relevant checks on the other platform; compare record counts and outcomes | Both platforms produce equivalent basic learning behavior and data identity | Completed iOS/Android matrices |

## Safety and interpretation
- Use a disposable install for destructive or failure-injection checks. Never corrupt a user's only app data.
- Do not infer persistence guarantees for quiz scores: current T018–T021 progression is in-memory. Record this as expected current behavior, not a defect, unless the product requirement has changed.
- Uninstall behavior may erase app-container data. Verify what the current provisioning code actually does before promising preservation.
- If no native build can be produced, mark affected rows BLOCKED with the missing prerequisite. Do not substitute a Metro export and call it device validation.
- Expo Go is not a substitute for a development build when validating custom native configuration or the packaged database path.

## Completion gate
T022 is complete only when:
1. Each platform has a recorded result for all applicable rows, with BLOCKED/NOT RUN explicitly justified.
2. T022-01 through T022-10 pass on both platforms (or a platform-specific limitation is documented and accepted by the owner).
3. Integrity mismatch and interrupted provisioning fail safely without damaging another valid pack.
4. No unexplained crash, missing asset, database-open failure, or cross-script state leak remains.
5. Evidence is committed in a dated result file and STATE/NEXT_TASK/CHECKPOINT are updated from that evidence.

## Current result
- iOS native runtime: NOT RUN.
- Android native runtime: NOT RUN.
- CI #116 / run 43959854824: SUCCESS on commit 5c7e3157d4fd77025f45eb92f746d8a09cc995fe; this is CI evidence only.
- Device build availability, device logs and native SQLite asset behavior: UNKNOWN until executed.

## Owner action when device-build tooling is available
Build/install the development or preview app on one iPhone and one Android device (or document why one platform is unavailable), then capture the evidence fields above. iOS native build normally requires macOS/Xcode; Android native build requires Android build tooling. No paid build service is assumed or authorized.
