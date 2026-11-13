# CHECKPOINT
Unit: T003 multilingual transliteration keyboard feasibility review.
Status: RESEARCH COMPLETE; implementation explicitly not authorized by this task.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Research: AI_COLLAB/research/KEYBOARD_TRANSLITERATION_FEASIBILITY_20261113.md.
Decision: native offline-first iOS Custom Keyboard Extension + Android InputMethodService; Expo companion app remains settings/learning shell. Japanese: romaji → kana → Mozc conversion candidates → contextual ranking. Korean: selectable Latin romanization → Hangul composition (libhangul candidate) → lexical/context ranking. Glosses belong in keyboard candidate strip; arbitrary host-app inline annotations cannot be guaranteed.
Competitors reviewed: system Japanese IME/Mozc, Simeji, Microsoft SwiftKey, Fcitx5 Android, FusionIME.
OSS review: Mozc BSD-3-Clause code but mixed dictionary/third-party terms; libhangul LGPL-2.1; librime BSD-3-Clause core with dependency audit; Fcitx5 Android LGPL-2.1 framework/plugins separate; FusionIME GPL-3.0 reference only; WanaKana MIT candidate for kana only. No code/data adopted.
Platform findings: iOS keyboard default sandbox blocks network/writable shared group; Full Access is user opt-in and must not be required. Limited context proxy; secure fields and apps rejecting third-party keyboards are unsupported. Android needs native InputMethodService. Core typing must be offline.
Acceptance gates: native build/link spikes on both platforms; per-file Mozc dictionary licence audit; Korean romanization ambiguity evaluation; p95 candidate latency target <100ms; no ordinary-typing network requests; no typed-text persistence.
Commits:
- a4dfce7: define T003.
- d9b66ad: add keyboard feasibility research.
CI: no CI run expected; changes are documentation-only and CI workflow is path-filtered to app/code/config/package files. Latest code CI remains Run #36 on a3bdf071f12c7d9992a96a501b5cf90905edd177, SUCCESS with install/typecheck/lint and 3/3 tests.
Next: T004 should be a bounded, no-dependency native feasibility spike plan or a small pure TypeScript transliteration prototype only after user prioritizes which language to implement first. Do not start native extension implementation without task scope and per-component licence review.
