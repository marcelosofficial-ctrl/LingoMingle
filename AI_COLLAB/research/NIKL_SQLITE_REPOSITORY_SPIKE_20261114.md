# T014: Expo SQLite glossary repository spike

Date: 2026-11-14
Status: synthetic-only adapter contract implemented; native device validation NOT RUN.

## SDK/API compatibility

SDK 58 versioned Expo SQLite docs describe openDatabaseAsync, getFirstAsync, getAllAsync, parameter binding, execAsync and closeAsync. The repository uses asynchronous, parameterized SELECT operations plus a static connection PRAGMA. It avoids sync methods, tagged SQL, transactions and prepared statements.

The repo pins expo-sqlite 58.0.16. SDK 58 docs now recommend approximately 58.0.17, and npm metadata shows 58.0.17 published. The implemented methods are long-standing SDK 58 APIs. No package upgrade was made because that needs a deliberate Expo dependency and lockfile alignment pass.

SDK 58 SQLiteOpenOptions has no read-only open flag. openDatabaseAsync opens a filename and may create a missing DB. This repository therefore accepts no filename and opens no connection. Its caller must provision and open an existing pack, then transfer a dedicated connection. The repository validates application ID 0x4c4d474c, user_version=1, and six required tables, then enables and verifies PRAGMA query_only=ON. It exposes no database handle or write methods. This is connection-level protection, not OS-level read-only file access.

Expo documents the assetSource flow for existing databases, but actual asset installation/copy into durable app storage is outside this task. T015 evaluates that boundary. Immutable dictionary schema/migrations remain owned by the build-time pack builder; app lookup never migrates or silently creates a DB.

Sources:
- SDK 58 docs: https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- SDK 58 SQLiteOpenOptions: https://github.com/expo/expo/blob/sdk-58/packages/expo-sqlite/src/NativeDatabase.ts
- SDK 58 changelog: https://github.com/expo/expo/blob/main/packages/expo-sqlite/CHANGELOG.md
- Published versions: https://www.npmjs.com/package/expo-sqlite

## Repository contract

New src/features/glossary/sqlite-repository.mjs and declaration file implement createGlossaryRepository(db). The connection is dedicated and transferred to the repository on successful creation. The repository closes it idempotently. Failed schema validation leaves cleanup with the caller.

- Schema owner: build-time pack builder. App is a read-only consumer, not a migration runner.
- Compatibility: exact application ID and schema version plus six required tables; unknown/future versions and incomplete schemas fail closed.
- Write boundary: query_only=ON is enabled and checked before returning. No open/create/copy/migrate API exists in this module.
- Mapping: source ID, language, surface forms, lemma, reading, POS scheme/tag/source, senses, English equivalent/gloss, sense labels, learner level, frequency rank, domain labels and priority map back to GlossEntry.
- Matching: NFKC/trim/lowercase keys; exact surface and Japanese reading/optional lemma/POS matches; Korean lemma requires exact POS scheme and tag; stale analyzer surface and Korean internal whitespace are rejected. Results preserve priority then ID order. Exact surface matches take precedence per entry.
- Query safety: user/analyzer text is always bound. SQL identifiers are fixed constants.

## Verification boundary

New root tests create invented JSONL and build a real schema-v1 SQLite pack through T013's synthetic-only builder. Tests open it through Node's read-only SQLite handle behind an adapter implementing Expo's async method shape. Thus SQL behavior, mapping and query-only enforcement run against SQLite, not a hand-written query mock.

Covered: Japanese duplicate surface candidates and reading lookup, Korean lemma/POS lookup, metadata round-trip, unknown miss, stale analyzer token, POS mismatch, schema-version rejection, incomplete-schema rejection, query-only activation, idempotent close and lookup-after-close. No actual NIKL source text or translations are used.

Limitations: no Expo Go/device/iOS/Android execution; no asset-copy/install path; no production pack; no full-source performance test. The adapter checks the method contract but cannot establish native bridge behavior.

## Decision

T014 technical GO for a read-only repository over a pre-opened schema-v1 pack. It does not authorize actual NIKL import, production pack creation, asset bundling or store distribution. Those remain blocked by source/parser trust and qualified legal/platform review.
