# NEXT_TASK
ID: T011
Goal: Evaluate a safe build-time streaming pipeline for the NIKL 2026-10-19 archive and resolve the remaining CC BY-SA 2.0 KR app-store distribution questions. Deliver a dependency/architecture recommendation and release go/no-go; do not import data.
Context: T009 snapshot inspection and T010 synthetic record normalizer are complete. Technical candidate is 49,869 complete-translation word entries / 69,431 senses. Source archive is 84.5 MB compressed / 1.016 GB expanded. See AI_COLLAB/research/NIKL_SNAPSHOT_INSPECTION_20261114.md and NIKL_NORMALIZER_SPIKE_20261114.md.
Acceptance:
- Compare maintained ZIP readers and streaming JSON parsers suitable for a build-time Node 22/CI pipeline. Verify exact current version, SPDX licence, maintenance/release activity, Node compatibility, transitive licence risk and memory behavior from primary sources. Do not add a dependency.
- Compare build-time import versus on-device import. Recommend bounded extraction, per-file streaming, record-level normalization, aggregate ID/coverage validation, deterministic output, temporary artifacts, atomic finalization and cleanup. Account for the 1.016 GB expanded source and 5.70 MiB selected-text lower bound without claiming a final DB size.
- Assess whether GitHub Actions can safely process a user-supplied source archive without committing it, including artifact retention/size/access boundaries. Do not upload the user archive to GitHub or any external service.
- Review official Apple App Store and Google Play terms plus CC BY-SA 2.0 KR legal code/deed for no-additional-restrictions, encryption/DRM, user access to the derived database and attribution/share-alike obligations. Separate verified platform wording from legal interpretation.
- Produce a packaging options matrix and questions for qualified counsel. If compatibility remains uncertain, keep store distribution on HOLD; do not present this as legal advice.
- Preserve NIKL attribution, source URL, archive SHA-256, snapshot date, importer version, transformation description, licence link, data counts and excluded-field list in the proposed manifest.
- No real data import, production DB, app bundling, dependency adoption, external upload, account/API key, paid service or user spending.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/research/**, STATE.md.
Line budget <=350 changed lines. Use primary sources and several independent research angles. End with a clear technical architecture recommendation and legal/distribution go/no-go.
