# NEXT_TASK
ID: T004
Goal: Run a bounded source-and-build feasibility spike for the proposed Japanese/Korean keyboard engines before any engine is adopted.
Acceptance:
- Inspect Mozc build targets and source layout relevant to Android and iOS extension embedding; identify native toolchain, binary/runtime dependencies and practical integration boundary.
- Inspect libhangul APIs for Hangul composition and determine exactly what it does not provide for Latin romanization; define the separate romanization adapter contract.
- Audit Mozc dictionary_oss and third-party directory licence notices at file/component level; distinguish code licence from dictionary/content terms.
- Audit libhangul LGPL-2.1 obligations for static vs dynamic linking and app distribution; do not assume compliance.
- Produce a no-network prototype/spike plan, build matrix and go/no-go criteria. If the current environment cannot compile native targets, mark build verification UNKNOWN rather than claiming it.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, STATE.md.
Out of scope: shipping keyboard code, adding native targets/dependencies, bundling dictionaries, network services, paid APIs, accounts, lyric lookup.
Line budget <=350 changed lines. Verification: upstream source/licence evidence; build output only if a real build is executed.
