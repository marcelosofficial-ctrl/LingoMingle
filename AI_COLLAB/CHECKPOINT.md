# CHECKPOINT
Status: DONE — T019
Branch: lingomingle-foundation-2026-11-10
Feature commit: a9c91e7deb4c1d229a6d42c4e68238342dc553ee
Red-team commits: ed3e67c41422ab5e7054870ff2ab9564dfdead27; cc8a04d813c2d1c4941c0543320cfae672df2371
CI #110 (43776049306) SUCCESS for original feature; CI #111 (43840200852) FAILED at typecheck because hardening referenced an unsupported field; CI #112 (43840445604) SUCCESS after repair. All steps green: npm install/ci, typecheck, lint, root tests, iOS+Android Metro exports, importer install/tests, synthetic pack build and byte-for-byte repeat-build check.
T019 delivered in-memory score, missed kana with canonical readings, missed-only retry prompt pool and a fresh round after perfect score. Red-team fixes: full-row rounds use normal distractors; retry/result inputs reject forged kana records and non-boolean outcome values; canonical validation checks every typed field including rowIndex and columnIndex.
Research gates: NIKL real-data use/distribution HOLD pending corpus-specific approved-purpose and prior publication authorization; Metro CI is not device validation; Expo Go SDK58 is available but remains a fixed sandbox. T020 queued: original 46-entry Katakana data and chart, no copied illustrated materials.
Native iOS/Android builds and device runtime NOT RUN. No paid services, subscriptions, accounts or store fees.
Next: T020; create dataset/tests first, then accessible script switch; preserve Hiragana practice.
