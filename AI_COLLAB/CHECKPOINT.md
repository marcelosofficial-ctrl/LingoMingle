# CHECKPOINT

Unit: T016 root lockfile dependency alignment — DONE. T016 overall remains IN PROGRESS.

VERIFIED:
- CI #89 (43684992129) successfully generated and committed package-lock.json as 3515eee, but root npm ci failed with ERESOLVE: react-dom@19.3.1 required react@^19.3.1 while package.json pinned react@19.3.0. Later checks were skipped.
- Commit dbc1264 pins direct react-dom 19.3.0, matching the existing Expo SDK 58 React 19.3.0 pin. No peer-dependency bypass was added.
- Commit 01150a0 records the exact failure and corrective pin in STATE.md.
- CI #90 (43685764873) on dbc1264: npm install and artifact upload succeeded; the lockfile commit step was IN PROGRESS at last inspection. npm ci, typecheck, lint, and tests have not yet been observed.
- Latest 5 commits at pass start: 3515eee, 85e54d9, 5895d54, 54c92a6, d3713fe.

NEXT:
1. Verify CI #90 commits the regenerated lockfile and passes root npm ci, typecheck, lint, app tests, importer npm ci/tests.
2. Build the synthetic app DB through the committed T013 importer + SQLite builder (not a reconstructed schema); validate deterministic output, metadata, counts, integrity and FK checks.
3. Record the measured DB SHA, add Metro .db asset support, then wire GlossaryProvider at app root and rerun CI.

UNKNOWN / NOT DONE:
- CI #90 final conclusion and generated lockfile commit SHA pending.
- Synthetic DB asset and measured provider SHA absent; provider placeholder remains untrusted.
- Metro .db resolver config and root provider wiring absent.
- Native iOS/Android NOT RUN. No real NIKL data, production pack, paid service, external upload, or store distribution.
