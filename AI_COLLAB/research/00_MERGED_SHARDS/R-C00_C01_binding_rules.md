# Claude C00 + C01 binding rules
Audience: future executive AI chat. Confidence tags [V] verified, [I] inferred, [U] unknown. Preserve this shard at the top of future merged research.
<<<SHARD C00 | MERGE PROTOCOL + BINDING OPERATING RULES>>>
## C00.1 Merge protocol
1. Keep C00 and C01 verbatim at the top under BINDING OPERATING RULES (authored by Claude). Do not paraphrase.
2. Resolve factual conflicts by [V] over [I] over [U], newest verification wins; log both versions in DECISIONS.md#CONFLICTS. Workflow conflicts are resolved in favour of C00/C01.
3. Preserve shard markers. Split unmarked research at headings into <=1,300-word pieces.
4. Never read the merged file whole. Shard into research files and maintain INDEX.md.
## C00.2 User context
- Builds mostly from iPhone 12 using AI chats. Laptop expected about one month after 2026-11-10 (soft estimate).
- RevDev, PocketCode and LingoMingle are separate GitHub projects.
- Goal: sleek Apple-like iOS/Android language app, preferably free to build, monetisable, also used by user for Japanese. User learned kana/Hangul via visual-sound mnemonics.
## C00.3 Binding rules
R1 Repo: marcelosofficial-ctrl/LingoMingle; private. Work branch: lingomingle-foundation-2026-11-10. Boot: AI_COLLAB/BOOT.md.
R2 On "continue working on LingoMingle": read ONLY BOOT.md, then STATE.md, NEXT_TASK.md, INBOX_chatgpt.md; do NEXT_TASK.
R3 Never open files >1,500 words whole. Find via INDEX.md. Do not create/read CHAT_START_HERE, HOT_RESUME, STATE_LEDGER.
R4 Normal mode unless NEXT_TASK says otherwise. Commit before summary. About 350 lines per turn. Overwrite CHECKPOINT.md after each unit.
R5 Final <=15 lines: done(paths, commit), latest CI, next, user actions <=3. Tag VERIFIED/INFERRED/UNKNOWN. Never claim tests passed without output. If GitHub cannot be read/written, stop.
R6 Phone-first: each user action doable on iPhone in under 3 minutes, no terminal, no secrets in chat.
R7 Adopt, don't write. Check licences first; prefer permissive. Never copy GPL/AGPL code. Log adoptions in DEPENDENCIES.md.
R8 No scraping; never commit copyrighted lyrics/subtitles; fixtures only PD/CC/original/synthetic. Do not implement gated lyric source before G1 approval.
R9 Any paid account/subscription/recurring cost requires explicit approval.
R10 Pin Expo SDK; read current docs for pinned SDK before Expo Router/native tabs/glass; otherwise UNKNOWN.
R11 Every repo file <=1,500 words; STATE <=400; BOOT <=250; NEXT_TASK one task.
R12 One project per chat. Never read/write DevRelay-Missions or PocketCode- from this chat.
R13 Secrets only in GitHub/EAS secrets, never repo/chat.
R14 If [I]/[U] blocks task, create verification task rather than assume.
R15 Linux CI: typecheck + lint + unit tests; report latest commit CI every final reply.
<<<SHARD C01 | BOOTSTRAP TEMPLATES, SETTINGS CHANGES, CONCURRENCY>>>
## C01.1 Repo
Separate repo is best for phone workflow, GitHub integration, CI and Expo project root. Do not place LingoMingle inside either other repo. Private recommended.
## C01.2 First commit tree
AI_COLLAB/BOOT.md, STATE.md, NEXT_TASK.md, INBOX_chatgpt.md, CHECKPOINT.md, INDEX.md, DECISIONS.md, DEPENDENCIES.md, RISKS.md, VERIFY_BACKLOG.md, research shards, .github/workflows/ci.yml, README.md, LICENSE (defer; proprietary default), PRIVACY.md (later), app/src/assets/data/scripts created with Expo app.
## C01.3 ChatGPT instructions
Prefer a dedicated ChatGPT Project named LingoMingle for project-specific instructions; leave global RevDev/PocketCode instructions unchanged.
## C01.4 Cross-project work
No cross-project repository operations here. User routes coordination requests.
## C01.5 Three AI chats
Concurrent AI work requires explicit file/task ownership, branch isolation or non-overlapping paths, and committed handoffs. Never let agents write same files simultaneously.