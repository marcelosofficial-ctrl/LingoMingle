# NEXT_TASK
ID: T003
Goal: Evaluate a system-wide LingoMingle multilingual transliteration keyboard for Japanese and Korean. Produce a sourced technical/competitor/licensing feasibility review and staged implementation recommendation before any keyboard code is adopted or written.
Acceptance:
- Compare iOS custom keyboard and Android IME constraints, including privacy, text-context access, extension lifecycle, app compatibility and network/full-access limitations.
- Compare Japanese romaji→kana→kanji conversion and Korean Latin→Hangul strategies; explicitly distinguish transliteration, IME conversion, machine translation and word glossing.
- Study relevant competitors and open-source implementations; record exact licenses, component boundaries, dictionary/data risks and adoption decisions.
- Specify a practical MVP, UX for sentence context and English glosses, privacy defaults, architecture boundaries and measurable acceptance tests.
- Update INDEX, STATE and CHECKPOINT. Research files <=1,300 words; total changed lines <=350.
Files allowed: NEXT_TASK.md, AI_COLLAB/INDEX.md, AI_COLLAB/STATE.md only if state is stored there (otherwise STATE.md), AI_COLLAB/CHECKPOINT.md, AI_COLLAB/DEPENDENCIES.md, AI_COLLAB/DECISIONS.md, AI_COLLAB/research/**.
Out of scope: implementation, native extensions, dependency adoption, network service, accounts, paid APIs, dictionary bundling, online lyric lookup.
Verification: cite primary platform docs and upstream project/licence sources; mark unverified build/Hermes/platform claims UNKNOWN.
