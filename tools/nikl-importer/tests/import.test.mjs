import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { BlobWriter, TextReader, ZipWriter } from "@zip.js/zip.js";
import {
  importSyntheticArchive,
  validateActualExpansion,
  validateEntryMetadata,
} from "../src/import.mjs";

const MEMBER_A = "fixture-01.json";
const MEMBER_B = "fixture-02.json";
const MEMBERS = [MEMBER_A, MEMBER_B];
const feat = (att, val) => ({ att, val });

function wordEntry(id, english = true) {
  return {
    att: "id",
    val: String(id),
    feat: [
      feat("lexicalUnit", "단어"),
      feat("partOfSpeech", "명사"),
      feat("vocabularyLevel", "초급"),
    ],
    Lemma: { feat: feat("writtenForm", `LM_SYNTHETIC_${id}`) },
    Sense: {
      att: "id",
      val: "1",
      feat: feat("definition", "synthetic source definition"),
      Equivalent: english ? [{
        feat: [
          feat("language", "영어"),
          feat("lemma", "LM_SYNTHETIC_EQUIVALENT"),
          feat("definition", "synthetic English gloss"),
        ],
      }] : [],
    },
  };
}

const document = (records) => JSON.stringify({
  LexicalResource: { Lexicon: { LexicalEntry: records } },
});

async function makeArchive(parent, members) {
  const writer = new ZipWriter(new BlobWriter());
  for (const [name, contents] of members) {
    await writer.add(name, new TextReader(contents), { compressionMethod: 0 });
  }
  const blob = await writer.close();
  const path = join(parent, "fixture.zip");
  await writeFile(path, Buffer.from(await blob.arrayBuffer()));
  return path;
}

async function sandbox() {
  return mkdtemp(join(tmpdir(), "lingomingle-nikl-prototype-"));
}

test("streams synthetic members, normalizes one record at a time and emits deterministic output", async () => {
  const parent = await sandbox();
  try {
    const archivePath = await makeArchive(parent, [
      [MEMBER_B, document([wordEntry(1002), wordEntry(1003, false)])],
      [MEMBER_A, document([wordEntry(1001)])],
    ]);
    const first = await importSyntheticArchive({
      archivePath,
      outputDir: join(parent, "out-a"),
      expectedMemberNames: MEMBERS,
    });
    const second = await importSyntheticArchive({
      archivePath,
      outputDir: join(parent, "out-b"),
      expectedMemberNames: MEMBERS,
    });
    const firstJsonl = await readFile(join(first.outputDir, "entries.jsonl"), "utf8");
    const secondJsonl = await readFile(join(second.outputDir, "entries.jsonl"), "utf8");
    const firstManifest = await readFile(join(first.outputDir, "manifest.json"), "utf8");
    const secondManifest = await readFile(join(second.outputDir, "manifest.json"), "utf8");

    assert.equal(firstJsonl, secondJsonl);
    assert.equal(firstManifest, secondManifest);
    assert.deepEqual(first.manifest.memberNames, MEMBERS);
    assert.deepEqual(first.manifest.counts, { inputRecords: 3, accepted: 2, skipped: 1 });
    assert.equal(firstJsonl.trim().split("\n").length, 2);
    assert.equal(JSON.parse(firstManifest).sourceKind, "synthetic-only");
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});

test("fails closed on duplicate, unexpected, unsafe, encrypted, linked and unsupported entries", () => {
  const meta = (filename, overrides = {}) => ({
    filename,
    directory: false,
    encrypted: false,
    symlink: false,
    compressionMethod: 0,
    compressedSize: 100,
    uncompressedSize: 100,
    ...overrides,
  });
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A), meta(MEMBER_A)], [MEMBER_A]), /duplicate-member/);
  assert.throws(() => validateEntryMetadata([meta("unexpected.json")], [MEMBER_A]), /unexpected-member/);
  assert.throws(() => validateEntryMetadata([meta("../escape.json")], ["../escape.json"]), /unsafe-member-path/);
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A, { encrypted: true })], [MEMBER_A]), /unsupported-member-type/);
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A, { symlink: true })], [MEMBER_A]), /unsupported-member-type/);
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A, { compressionMethod: 99 })], [MEMBER_A]), /unsupported-compression/);
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A, { uncompressedSize: 101 })], [MEMBER_A], { maxMemberBytes: 100 }), /member-size-limit/);
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A, { uncompressedSize: 5_000 })], [MEMBER_A], { maxCompressionRatio: 10 }), /compression-ratio-limit/);
  assert.throws(() => validateActualExpansion(101, 100, 101, { maxCompressionRatio: 1 }), /actual-compression-ratio-limit/);
  assert.throws(() => validateEntryMetadata([meta(MEMBER_A)], [MEMBER_A, MEMBER_B], { maxMembers: 1 }), /invalid-member-allowlist/);
});

test("refuses non-synthetic NIKL member names before opening any archive", async () => {
  await assert.rejects(importSyntheticArchive({
    archivePath: "not-opened.zip",
    outputDir: "unused-output",
    expectedMemberNames: ["1_5000_20261019.json"],
  }), /synthetic-member-allowlist-required/);
  await assert.rejects(importSyntheticArchive({
    archivePath: "not-opened.zip",
    outputDir: "unused-output",
  }), /synthetic-member-allowlist-required/);
});

test("CRC mismatch aborts and removes the temporary output", async () => {
  const parent = await sandbox();
  try {
    const archivePath = await makeArchive(parent, [[MEMBER_A, document([wordEntry(2001)])]]);
    const bytes = Buffer.from(await readFile(archivePath));
    const marker = Buffer.from("LM_SYNTHETIC_EQUIVALENT");
    const position = bytes.indexOf(marker);
    assert.notEqual(position, -1);
    bytes[position + 3] = bytes[position + 3] === 0x41 ? 0x42 : 0x41;
    await writeFile(archivePath, bytes);

    await assert.rejects(importSyntheticArchive({
      archivePath,
      outputDir: join(parent, "failed-output"),
      expectedMemberNames: [MEMBER_A],
    }));
    assert.deepEqual((await readdir(parent)).sort(), ["fixture.zip"]);
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});

test("malformed JSON, duplicate source IDs, size caps and cancellation all abort without publishing", async () => {
  const parent = await sandbox();
  try {
    const malformed = await makeArchive(parent, [[MEMBER_A, "{broken-json"]]);
    await assert.rejects(importSyntheticArchive({
      archivePath: malformed,
      outputDir: join(parent, "bad-json"),
      expectedMemberNames: [MEMBER_A],
    }));

    const duplicate = await makeArchive(parent, [
      [MEMBER_A, document([wordEntry(3001)])],
      [MEMBER_B, document([wordEntry(3001)])],
    ]);
    await assert.rejects(importSyntheticArchive({
      archivePath: duplicate,
      outputDir: join(parent, "duplicate-id"),
      expectedMemberNames: MEMBERS,
    }), /duplicate-entry-id/);

    await assert.rejects(importSyntheticArchive({
      archivePath: duplicate,
      outputDir: join(parent, "size-limited"),
      expectedMemberNames: MEMBERS,
      limits: { maxMemberBytes: 10 },
    }), /member-size-limit/);

    const controller = new AbortController();
    await assert.rejects(importSyntheticArchive({
      archivePath: duplicate,
      outputDir: join(parent, "cancelled"),
      expectedMemberNames: MEMBERS,
      signal: controller.signal,
      onProgress: ({ recordsProcessed }) => {
        if (recordsProcessed === 1) controller.abort(new Error("synthetic-cancel"));
      },
    }), /synthetic-cancel|abort/i);

    const names = (await readdir(parent)).sort();
    assert.deepEqual(names, ["fixture.zip"]);
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});

test("rejects duplicate JSON keys and parser depth/string limits", async () => {
  const parent = await sandbox();
  try {
    const duplicateKeys = '{"LexicalResource":{"Lexicon":{"LexicalEntry":[],"LexicalEntry":[]}}}';
    const archivePath = await makeArchive(parent, [[MEMBER_A, duplicateKeys]]);
    await assert.rejects(importSyntheticArchive({
      archivePath,
      outputDir: join(parent, "duplicate-json-key"),
      expectedMemberNames: [MEMBER_A],
    }), /duplicate-json-key/);

    const deep = wordEntry(4001);
    let cursor = deep;
    for (let index = 0; index < 40; index += 1) {
      cursor.nested = {};
      cursor = cursor.nested;
    }
    const deepArchive = await makeArchive(parent, [[MEMBER_A, document([deep])]]);
    await assert.rejects(importSyntheticArchive({
      archivePath: deepArchive,
      outputDir: join(parent, "deep-json"),
      expectedMemberNames: [MEMBER_A],
      limits: { maxDepth: 16 },
    }), /maxDepth|nesting depth/i);

    const long = wordEntry(4002);
    long.extra = "x".repeat(1_500);
    const longArchive = await makeArchive(parent, [[MEMBER_A, document([long])]]);
    await assert.rejects(importSyntheticArchive({
      archivePath: longArchive,
      outputDir: join(parent, "long-string"),
      expectedMemberNames: [MEMBER_A],
      limits: { maxPackedLength: 1_000 },
    }), /packed-value-size-limit|maxPackedLength|packed|length/i);

    const wide = wordEntry(4003);
    wide.extra = "x".repeat(600);
    const wideArchive = await makeArchive(parent, [[MEMBER_A, document([wide])]]);
    await assert.rejects(importSyntheticArchive({
      archivePath: wideArchive,
      outputDir: join(parent, "wide-record"),
      expectedMemberNames: [MEMBER_A],
      limits: { maxRecordBytes: 512, maxPackedLength: 1_000 },
    }), /record-size-limit/);

    const numericDoc = document([wordEntry(4004)]).replace(
      '"Sense":',
      `"largeNumber":${"7".repeat(1_500)},"Sense":`,
    );
    const numericArchive = await makeArchive(parent, [[MEMBER_A, numericDoc]]);
    await assert.rejects(importSyntheticArchive({
      archivePath: numericArchive,
      outputDir: join(parent, "long-number"),
      expectedMemberNames: [MEMBER_A],
      limits: { maxPackedLength: 1_000 },
    }), /packed-value-size-limit|maxPackedLength|packed|length/i);
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});

test("reports Node, elapsed time, process peak RSS and output size on a generated large fixture", async () => {
  const parent = await sandbox();
  try {
    const records = Array.from({ length: 1_500 }, (_, index) => wordEntry(10_000 + index));
    const archivePath = await makeArchive(parent, [[MEMBER_A, document(records)]]);
    const result = await importSyntheticArchive({
      archivePath,
      outputDir: join(parent, "large-output"),
      expectedMemberNames: [MEMBER_A],
    });
    const outputBytes = Buffer.byteLength(await readFile(join(result.outputDir, "entries.jsonl")));
    console.log("SYNTHETIC_IMPORT_METRICS", JSON.stringify({
      node: result.nodeVersion,
      elapsedMs: result.elapsedMs,
      processPeakRssKiB: result.processPeakRssKiB,
      inputRecords: result.manifest.counts.inputRecords,
      outputBytes,
    }));
    assert.equal(result.manifest.counts.accepted, 1_500);
    assert.ok(result.elapsedMs >= 0);
    assert.ok(result.processPeakRssKiB > 0);
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});
