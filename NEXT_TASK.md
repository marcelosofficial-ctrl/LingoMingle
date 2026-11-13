# NEXT_TASK
ID: T007
Goal: Complete a source-level integration and deployment feasibility spike for Kiwi v0.24.1 as the Korean morphology adapter, without adopting or bundling it.
Acceptance:
- Pin the upstream v0.24.1 tag and inspect the Android AAR, iOS XCFramework/Swift package, C++ core and WASM package/build instructions.
- Audit exact code, model and third-party licences from LICENSE and NOTICE; preserve component-level notices and verify model archive redistribution terms.
- Map Kiwi token output (surface, lemma, POS, token offsets, normalized form, spacing/join behavior) into the T006 KoreanTokenAnalysis and GlossPartOfSpeech contract. Define the POS crosswalk into a versioned LingoMingle scheme; do not compare raw Kiwi Sejong tags to NIKL POS labels.
- Assess Expo/RN/Hermes integration options: native JSI/TurboModule vs WASM. Check whether official bindings are actually usable in Hermes, not merely browser/Node. Keep the keyboard extension as a separate native process and prove whether the same model can be loaded in both host app and extension without duplication or unacceptable memory.
- Produce a reproducible platform matrix covering Android API/ABI, iOS deployment target/device/simulator slices, WASM runtime requirements, model files, startup/cold/warm memory, per-token p50/p95 latency, glue/space behavior, and fallback when model unavailable.
- Use only original/synthetic acceptance inputs for inflection, spacing, POS, homonyms and unknown words. No third-party dictionary entries, training corpus, examples or media in fixtures.
- If no native Apple build environment is available, mark iOS build UNKNOWN; do not infer support from the existence of an XCFramework.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**, STATE.md. Add temporary code only if it can be built/tested in existing CI without committing a runtime dependency or model.
Out of scope: shipping native keyboard extensions, adding Kiwi/libhangul/Mozc dependencies, downloading/bundling model or dictionary data, changing Expo SDK, external APIs, user accounts, paid services, lyric lookup.
Line budget <=350 changed lines. Verification: upstream source/release evidence; real build output only if actually executed. No adoption decision without measurements and full licence closure.
