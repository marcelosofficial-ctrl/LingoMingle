# CHECKPOINT
Status: IN PROGRESS — T019 acceptance after red-team repair
Branch: lingomingle-foundation-2026-11-10
Feature commit: a9c91e7deb4c1d229a6d42c4e68238342dc553ee
Red-team commit: ed3e67c41422ab5e7054870ff2ab9564dfdead27 (CI #111 FAILED: TS2339; new comparison referenced nonexistent HiraganaCharacter.column)
Repair: remove unsupported column access; canonical validation now compares typed id, kana, romaji, row only. Full-row fresh question rotation, forged kana rejection and boolean result validation remain covered by tests.
CI #110 (43776049306) SUCCESS for feature commit. CI #111 (43840200852) FAILED at typecheck only; repair commit now supersedes the failed commit and must pass a new CI run before T019 is closed.
Research: NIKL official FAQ requires approved-purpose corpus access and prior approval before public result release; no blanket corpus redistribution assumption. Expo SDK 58 page now lists an iOS Expo Go install option while an older mismatch page still says SDK54; live installation route remains to be checked. Katakana 46-basic coverage is next product extension; no copied artwork or unlicensed chart assets.
Native device runtime NOT RUN. No persistence, network, SRS, mastery, audio, handwriting, mnemonics, new dependencies, or paid services.
Next: verify repair CI, close T019 after success, and queue T020 basic Katakana dataset/chart.
