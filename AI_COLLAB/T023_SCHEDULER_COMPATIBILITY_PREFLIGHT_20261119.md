# T023 scheduler compatibility preflight — 2026-11-19

Status: **RESEARCH COMPLETE; SPIKE NOT RUN; NO DEPENDENCY APPROVED**. This is a small, bounded technical preflight supporting the existing local review-event contract. It does not replace T022 (native device acceptance), and it does not authorize adoption of a scheduler.

## What the source checks establish

- **VERIFIED:** Expo documents Hermes as its default React Native JS engine and supports it across Expo tooling. React Native ships a Hermes version built alongside its RN version; Hermes compatibility is version-paired rather than an arbitrary engine upgrade. The LingoMingle runtime is Expo SDK 58 / React Native 0.88.1. Official docs: https://docs.expo.dev/guides/using-hermes/ and https://reactnative.dev/docs/hermes
- **VERIFIED:** ts-fsrs v6.0.0 release documentation describes a major API/model change; FSRS-7 is the default model for DefaultScheduler. Version migration guide warns to use the v6 explicit API and not old scheduler APIs. API overview identifies `defineScheduler`, `defineModel`, `defineChrono`, and scheduler methods including `newCard`, `review`, `rollback`, `preview`, `forget`. Preview returns an iterable; iteration depends on standard `Symbol.iterator`. Sources: https://open-spaced-repetition.github.io/ts-fsrs/updates/fsrs/6.0.0 ; https://open-spaced-repetition.github.io/ts-fsrs/guide/migration ; https://open-spaced-repetition.github.io/ts-fsrs/api/ts-fsrs/
- **VERIFIED:** Tag v6.0.0 package metadata declares `node >=24.0.0` at the monorepo root, whereas project CI's recorded Node baseline is 22.13.1. The `packages/fsrs` entry is ESM/CJS dual-exported and depends on internal workspace package `@open-spaced-repetition/srs-kit`. The Node engine declaration is a warning for install/build tooling and must not be misinterpreted as proof that the scheduler algorithm cannot execute in Hermes.
- **UNKNOWN:** Hermes compatibility of the exact release dependency graph, package transpilation target, module resolution, transitive runtime APIs, serialization stability, deterministic behavior under LingoMingle's clock, and bundle/runtime cost have not been proven. Limited package-manifest/source entry inspection is not a dependency-wide audit.

## Important interpretation

The `>=24` Node requirement **does not itself prove mobile runtime incompatibility**. Conversely, a TypeScript/ESM library and a successful Node test **do not prove Hermes compatibility**. The next experiment should be a narrow runtime gate, not a package integration.

## Recommended spike gate (dependency still unapproved)

Only after owner approves the exact pinned package for a temporary isolated test:
1. Record exact `ts-fsrs` version, integrity hash, transitive graph, license/notice, exports, and package engine declaration.
2. Compile/import the smallest v6 ESM entry through the project's SDK 58 bundler in a throwaway branch/worktree or isolated fixture. No app navigation or SQLite schema changes.
3. Execute deterministic scheduler cases under the actual Hermes runtime: create card, review each supported grade, serialize/deserialize state, preview iterable and select candidate, rollback, forget, edge timestamps, invalid inputs.
4. Compare Node 24 reference outputs against Hermes for same fixtures, pinned time/inputs, allowing only documented floating-point/timestamp differences.
5. Audit every runtime dependency for Node built-ins, environment assumptions, dynamic require, unsupported globals, and module-resolution/Metro configuration.
6. Measure bundle-size delta, cold-start impact, memory and a small bounded CPU sample on a real device or explicitly labeled emulator; no invented budget until baseline is measured.
7. Test event-history replay from T023 contract separately from scheduler state; scheduler state must be rebuildable and version-labelled.
8. Remove spike dependency/fixture unless owner separately accepts integration; report exact logs and PASS/FAIL/NOT RUN per gate.

## Current decision

- **INFERRED:** a small compatibility spike is technically worth doing *if* T022 device acceptance cannot progress and the owner approves temporary dependency use. The existing T023 event model is intentionally scheduler-neutral and should remain so.
- **UNKNOWN:** actual compatibility/performance. No install, bundling, runtime, benchmark, or tests were performed during this preflight.
- **NOT ADOPTED:** ts-fsrs, FSRS-7, any model, desired-retention default, review intervals, scheduler UI, or learning claims.
