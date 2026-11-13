# CHECKPOINT
Unit: T003 multilingual transliteration keyboard feasibility review.
Status: COMPLETE. T004 queued for source/build feasibility.
Canonical repo: marcelosofficial-ctrl/LingoMingle.
Branch: lingomingle-foundation-2026-11-10.
Research: AI_COLLAB/research/KEYBOARD_TRANSLITERATION_FEASIBILITY_20261113.md (836 words) and AI_COLLAB/research/KEYBOARD_TRANSLITERATION_ENGINES_20261113.md (864 words).
Product recommendation: offline-first native iOS Custom Keyboard Extension + Android InputMethodService; Expo companion app remains settings/learning shell. Japanese: romaji → kana → Mozc conversion candidates → contextual ranking. Korean: selectable Latin romanization → Hangul composition (libhangul candidate) → lexical/context ranking. Glosses belong in keyboard candidate strip; arbitrary host-app inline annotations cannot be guaranteed.
Platform evidence: Apple UITextDocumentProxy exposes context before/after cursor and selected text; iOS default keyboard sandbox blocks network and writable shared group. Full Access is user opt-in and must not be required. Android InputMethodService/InputConnection supports bounded context, composing text and commit operations. Host editor behavior varies.
Competitors reviewed: system Japanese IME/Mozc, Simeji, Microsoft SwiftKey, Fcitx5 Android, FusionIME.
OSS review: Mozc BSD-3-Clause code but mixed dictionary/third-party terms; libhangul LGPL-2.1; librime BSD-3-Clause core with dependency audit; Fcitx5 Android LGPL-2.1 framework/plugins separate; FusionIME GPL-3.0 reference only; WanaKana MIT candidate for kana only. No code/data adopted.
Important product distinction: transliteration ≠ IME conversion ≠ machine translation ≠ lexical gloss. Japanese word-level glosses require tokenizer + licensed dictionary. Do not send ordinary keystrokes to network or silently replace committed text.
Open gates: native build/link spikes; per-file Mozc dictionary licence audit; libhangul obligations and romanization adapter; Korean ambiguity evaluation; native extension memory/host-app testing; package-lock + transitive SPDX audit; device smoke test; exact C00/C01 source extraction remains attachment-dependent.
Commits: T003 task a4dfce7; research d9b66ad; index a7f362e; dependencies 24f16dd; state 86fba92; checkpoint 3f588e8; platform context addendum 4719738; T004 queued 61d45c1; research split into <=1,300-word shards f781fed and 34ab4e2.
CI: no CI run expected; changes are documentation-only and workflow path-filtered. Latest code CI remains Run #36 on a3bdf071f12c7d9992a96a501b5cf90905edd177, SUCCESS with install/typecheck/lint and 3/3 tests.
Next: execute T004 only. Do not add native targets or dependencies before its go/no-go and licence findings.
