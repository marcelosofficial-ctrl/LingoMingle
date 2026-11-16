# CHECKPOINT
Status: IN PROGRESS — T019 red-team hardening; CI pending
Branch: lingomingle-foundation-2026-11-10
Feature commit: a9c91e7deb4c1d229a6d42c4e68238342dc553ee
Red-team fix commit: ed3e67c41422ab5e7054870ff2ab9564dfdead27
Fixes: (1) an explicitly supplied full-row round now follows standard distractor rotation rather than retry-only distractor selection; (2) retry prompt records are validated against canonical row entries; (3) result/retry inputs reject forged kana spellings/readings and non-boolean outcome flags. Added regression tests for all three.
CI #110 (43776049306) SUCCESS for the original T019 feature. CI #111 (43840200852) was IN_PROGRESS for red-team fixes; do not mark this repair accepted until it succeeds.
Research findings: official NIKL FAQ requires corpus-specific approved-purpose access and prior approval before external result publication; do not assume CC BY-SA alone authorizes bundling. Expo SDK 58 Expo Go currently appears on expo.dev/go, so the earlier SDK54 mismatch page needs current-version reconciliation. Katakana 46-basic set is the next product extension; do not copy chart artwork or assume the linked PDF is licensed for reuse.
Native device runtime remains NOT RUN. No persisted progress, network, SRS, mastery, audio, handwriting, mnemonics, new dependencies, or paid services.
Next: verify CI #111. Then close T019, update STATE/NEXT_TASK, and record research-backed priority order.
