# RISKS
K1 Lyrics/subtitle copyright and store review: BYO/original/PD/cleared content, G1.
K2 Song audio: official embedded player, user files, no-audio/TTS; no arbitrary streaming.
K3 Phone-only native builds: Expo Go first; EAS quota rechecked; paid services need approval.
K4 Google Play testing gates: verify current account-specific rules if Play release approved.
K5 Japanese tokenizer in Hermes: spike and benchmark; fallback to pre-tokenised data.
K6 Apple Translation JS bridge: verify native-module feasibility; do not assume.
K7 Mnemonic art: original vector/glyph-morph artwork; do not copy existing commercial mnemonics.
K8 Cloud costs: local-first and export; no cloud backend in MVP.
K9 Scope creep: cut MVP at alphabet trainer + local review.
K10 Licence contamination: dependency ledger and licence audit.
K11 Duplicate repository LingoMingle- exists; canonical is LingoMingle. Archive/delete duplicate manually after checking the migrated branch; no automated archive/delete action is available here.
K12 Store fees: PWA/APK first; G2 blocks paid enrollment.
K13 Package lock absent; direct package versions pinned but transitive dependency tree not reproducible until package-lock.json is committed.