# T022 native smoke evidence protocol

Date: 2026-11-18  
Status: research and acceptance specification only; no workflow implementation authorized by this document.

## Purpose and evidence boundary

T022 validates that the packaged synthetic SQLite database is available in a native app, that first-run provisioning is correct, and that the app's repository remains read-only. Keep three evidence classes separate:

1. **Build evidence:** a binary was produced and inspected. This is already VERIFIED for Android debug APK run 44144207732.
2. **Simulator/emulator evidence:** a native binary was installed and exercised in a virtual device. This is useful preliminary evidence, but not physical-device acceptance.
3. **Physical-device evidence:** the app was installed and exercised on actual iOS and Android hardware. This remains the target T022 release gate.

A Metro export, Expo Go session, successful Gradle/Xcode compile, or screenshot of a build page is not runtime acceptance.

## Ranked work items

1. Android emulator smoke: highest near-term leverage because an installable APK already exists and GitHub documents Linux KVM acceleration.
2. Android physical device: required to close Android device rows; owner must install the existing debug APK and capture observed results.
3. iOS Simulator: feasible without device provisioning, but project-specific Prebuild/Xcode success remains unproven.
4. iOS physical device: requires a separately signed/provisioned device build; do not conflate with Simulator results.
5. Rights gate: synthetic data only; NIKL production corpus remains HOLD pending corpus-specific written permission.

## Android emulator smoke procedure (proposal, not executed)

Prerequisites:
- Use the exact APK from Actions run 44144207732; artifact 14355909071 expires 2026-11-24 18:21 UTC.
- Use a standard `ubuntu-24.04` GitHub-hosted runner while the repository is public. Recheck visibility and current GitHub billing terms before any later run.
- Enable KVM access using GitHub's documented udev/group setup. Fail fast if `/dev/kvm` is absent or emulator acceleration check fails; do not silently fall back to slow software emulation.
- Create an x86_64 API 36 AVD using Android command-line tools. Pin the system-image package and record the exact emulator/SDK versions in the run log.

Execution and required evidence:
1. Record workflow SHA, artifact SHA-256, runner image, SDK/emulator versions and AVD configuration.
2. Boot the AVD headlessly with acceleration; wait for `sys.boot_completed=1` with a bounded timeout.
3. Install the APK with `adb install`; assert package ID is `com.marcelosofficial.lingomingle`.
4. Launch the actual app activity; collect `adb logcat` and a screenshot. Fail on install failure, fatal exception, crash, or missing foreground activity.
5. Exercise the app's Hiragana and Katakana chart/detail and recognition flows. Capture visible proof that bundled content is queryable.
6. Verify the synthetic database exists in the app's private sandbox. Discover the path empirically using `run-as com.marcelosofficial.lingomingle` and a bounded file listing; do not hard-code an assumed Expo SQLite path.
7. Record database filename, size, hash, SQLite integrity result, schema/version marker, and read-only query result. Use the app's own diagnostics or a test-only instrumentation route; do not mutate the bundled source database.
8. If a supported test fixture can be used, attempt a write through the production repository API and assert it is rejected. Never introduce a production write API just to make the test possible.
9. Force-stop and relaunch, then compare database hash and provisioning marker. Confirm the bundled asset did not overwrite an existing provisioned database and that the app still reads the expected content.
10. Upload screenshot, filtered logcat, metadata and DB integrity report with short retention. Do not upload user data, credentials, or unrelated device files.

Acceptance outcomes:
- Emulator install/launch/provision/reuse checks can be marked PASS only with their own observed output.
- Emulator evidence must be labelled EMULATOR, never PHYSICAL DEVICE.
- Accessibility/TalkBack, OEM behavior, hardware performance, upgrade across installed versions and physical offline behavior remain separate checks.

## iOS Simulator smoke procedure (proposal, not executed)

- Use a standard GitHub-hosted macOS runner only while public-runner billing terms apply; record the exact runner label and Xcode version.
- Generate the iOS native project with the repository's pinned Expo SDK and dependencies; run CocoaPods using the lockfile generated for that exact prebuild.
- Build for an explicit iOS Simulator destination with code signing disabled. Apple documents that Xcode does not code-sign Simulator builds; this does not imply a physical-device IPA can be installed.
- Boot a named simulator, install the generated app, launch it, collect screenshot and simulator logs, and execute the same content/database/provisioning/read-only/relaunch assertions as Android where supported.
- Do not silently choose or commit a permanent `ios.bundleIdentifier`. The project identity decision remains unresolved; a simulator-only identifier must be isolated from release configuration and proven not to alter the production app identity.
- Simulator success is not physical iPhone acceptance, nor proof of touch/audio/hardware behavior.

## Physical-device acceptance record

For each platform, record:
- Device model, OS version, install source, app version, commit SHA and binary hash.
- First install and cold launch; launch with network disabled; bundled database presence and integrity.
- First-run provisioning result and second-launch reuse without overwrite.
- Hiragana and Katakana content/practice behavior.
- Repository read-only behavior and rejection of attempted writes.
- Accessibility checks with VoiceOver (iOS) or TalkBack (Android), including focus order, labels, dynamic text and contrast observations.
- Force-stop/reboot, interrupted provisioning recovery, upgrade/reinstall behavior and whether user learning data is preserved.
- Exact observed output, screenshot/log reference, tester and timestamp for every PASS. Unobserved items remain NOT RUN; failures remain FAIL with reproduction steps.

## Red-team corrections to prior planning

1. **EAS CI was presented too simply.** Current Expo CI documentation requires a successful local EAS build to initialise the project, create `eas.json` and populate native identifiers. EAS Free currently lists 15 Android and 15 iOS builds plus 60 CI/CD minutes, but this does not remove the bootstrap prerequisite. Do not describe an EXPO_TOKEN-only setup as ready.
2. **GitHub runner cost was missing a privacy condition.** Standard hosted runners are free/unlimited for public repositories. Private repositories draw on included compute usage and can incur charges. The free-runner assumption expires when the owner makes this repository private.
3. **SQLite acceptance lacked an explicit overwrite/reuse assertion.** Expo SDK 58 documents bundled database seeding through `SQLiteProvider.assetSource`; the provider imports the asset when the destination database does not exist. `forceOverwrite: true` replaces an existing database and must not be used as a user-data migration strategy. T022 must prove first-run seed and second-launch non-overwrite behavior separately.
4. **Simulator and device signing were conflated.** Apple documents that Xcode does not code-sign Simulator builds. That does not create a physical-device installable artifact; physical iOS remains a separate provisioning/signing gate.

## Sources opened and checked 2026-11-18

- Expo SDK 58 SQLite API: https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- Expo SQLite bundled database guidance: https://github.com/expo/expo/blob/main/packages/expo-sqlite/skills/expo-sqlite/references/web-and-config.md
- Expo static assets: https://docs.expo.dev/develop/user-interface/assets/
- GitHub Actions public runner billing: https://docs.github.com/en/actions/concepts/billing-and-usage
- GitHub hosted runner selection and specifications: https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
- GitHub KVM enablement note: https://github.blog/changelog/2024-04-02-github-actions-hardware-accelerated-android-virtualization-now-available/
- Android emulator command-line: https://developer.android.com/studio/run/emulator-commandline
- Android emulator acceleration: https://developer.android.com/studio/run/emulator-acceleration
- Expo EAS pricing: https://expo.dev/pricing
- Expo CI bootstrap prerequisite: https://docs.expo.dev/build/building-on-ci/
- Apple Xcode Simulator signing note: https://developer.apple.com/library/archive/technotes/tn2415/

## Current status and explicit non-actions

- Android debug APK build: VERIFIED (run 44144207732).
- Android emulator runtime: NOT RUN.
- Android physical device: NOT RUN.
- iOS Simulator build/runtime: NOT RUN.
- iOS physical device: NOT RUN.
- Workflow implementation: NOT APPROVED / NOT CHANGED.
- App source, dependencies, native identifiers, secrets, credentials, paid services and repository visibility: NOT CHANGED.
- Tests in this documentation pass: NOT RUN.
