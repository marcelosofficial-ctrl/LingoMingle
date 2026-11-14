import { createHash } from "node:crypto";
import { createReadStream, createWriteStream, openAsBlob } from "node:fs";
import { mkdtemp, mkdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { finished } from "node:stream/promises";
import { Transform, Writable } from "node:stream";
import { BlobReader, ZipReader } from "@zip.js/zip.js";
import chain from "stream-chain";
import { parser } from "stream-json";
import { pick } from "stream-json/filters/pick.js";
import { streamArray } from "stream-json/streamers/stream-array.js";
import { createNiklEntryNormalizer } from "../../../src/features/glossary/nikl-json.mjs";

export const DEFAULT_MEMBER_NAMES = Object.freeze([
  ...Array.from({ length: 10 }, (_, index) => `${index + 1}_5000_20261019.json`),
  "11_3671_20261019.json",
]);

const DEFAULT_LIMITS = Object.freeze({
  maxArchiveBytes: 100_000_000,
  maxMembers: 11,
  maxMemberBytes: 120_000_000,
  maxTotalExpandedBytes: 1_100_000_000,
  maxCompressionRatio: 40,
  maxRecords: 60_000,
  maxRecordBytes: 2_000_000,
  maxPackedLength: 1_000_000,
  maxInputChunkBytes: 1_000_000,
  maxDepth: 64,
});

function fail(code) {
  throw new Error(code);
}

function safeFlatName(name) {
  return typeof name === "string"
    && name.length > 0
    && !name.includes("\\")
    && !name.includes("/")
    && !name.includes("\0")
    && !/^[A-Za-z]:/u.test(name)
    && name !== "."
    && name !== "..";
}

export function validateEntryMetadata(entries, expectedMemberNames, overrides = {}) {
  const limits = { ...DEFAULT_LIMITS, ...overrides };
  if (!Array.isArray(expectedMemberNames) || expectedMemberNames.length === 0
    || expectedMemberNames.length > limits.maxMembers
    || new Set(expectedMemberNames).size !== expectedMemberNames.length) {
    fail("invalid-member-allowlist");
  }
  if (!Array.isArray(entries) || entries.length > limits.maxMembers) fail("member-count-limit");

  const expected = new Set(expectedMemberNames);
  const byName = new Map();
  let declaredExpanded = 0;

  for (const entry of entries) {
    const name = entry?.filename;
    if (!safeFlatName(name)) fail("unsafe-member-path");
    if (!expected.has(name)) fail("unexpected-member");
    if (byName.has(name)) fail("duplicate-member");
    if (entry.directory || entry.encrypted || entry.symlink) fail("unsupported-member-type");
    if (![0, 8].includes(entry.compressionMethod)) fail("unsupported-compression");
    if (!Number.isSafeInteger(entry.compressedSize) || entry.compressedSize < 0
      || !Number.isSafeInteger(entry.uncompressedSize) || entry.uncompressedSize < 0) {
      fail("invalid-member-size");
    }
    if (entry.uncompressedSize > limits.maxMemberBytes) fail("member-size-limit");
    if (entry.compressedSize === 0 && entry.uncompressedSize > 0) fail("invalid-compression-ratio");
    const ratio = entry.compressedSize === 0 ? 1 : entry.uncompressedSize / entry.compressedSize;
    if (ratio > limits.maxCompressionRatio) fail("compression-ratio-limit");
    declaredExpanded += entry.uncompressedSize;
    if (declaredExpanded > limits.maxTotalExpandedBytes) fail("total-expanded-size-limit");
    byName.set(name, entry);
  }

  if (byName.size !== expected.size) fail("missing-member");
  return expectedMemberNames.map((name) => byName.get(name));
}

export function validateActualExpansion(memberBytes, compressedSize, totalBytes, overrides = {}) {
  const limits = { ...DEFAULT_LIMITS, ...overrides };
  if (memberBytes > limits.maxMemberBytes || totalBytes > limits.maxTotalExpandedBytes) {
    fail("actual-expanded-size-limit");
  }
  const ratio = compressedSize === 0 ? (memberBytes === 0 ? 1 : Infinity) : memberBytes / compressedSize;
  if (ratio > limits.maxCompressionRatio) fail("actual-compression-ratio-limit");
}

async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

async function writeLine(output, line) {
  await new Promise((resolveWrite, rejectWrite) => {
    output.write(line, (error) => (error ? rejectWrite(error) : resolveWrite()));
  });
}

function duplicateKeyGuard() {
  const objectKeys = [];
  return new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(token, _encoding, callback) {
      if (token.name === "startObject") objectKeys.push(new Set());
      else if (token.name === "endObject") objectKeys.pop();
      else if (token.name === "keyValue") {
        const keys = objectKeys[objectKeys.length - 1];
        if (!keys) {
          callback(new Error("invalid-json-key-context"));
          return;
        }
        if (keys.has(token.value)) {
          callback(new Error("duplicate-json-key"));
          return;
        }
        keys.add(token.value);
      }
      callback(null, token);
    },
  });
}

function packedValueGuard(maxLength) {
  let active = null;
  let packedLength = 0;
  return new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(token, _encoding, callback) {
      if (token.name === "startString" || token.name === "startKey") {
        active = token.name;
        packedLength = 0;
      } else if (token.name === "stringChunk" && active) {
        packedLength += token.value.length;
        if (packedLength > maxLength) {
          callback(new Error("packed-value-size-limit"));
          return;
        }
      } else if (token.name === "endString" || token.name === "endKey") {
        active = null;
        packedLength = 0;
      }
      callback(null, token);
    },
  });
}

function createMemberPipeline(limits, totals, compressedSize) {
  let memberBytes = 0;
  const parserChunkBytes = Math.max(1, Math.min(16 * 1024, Math.floor(limits.maxPackedLength / 2)));
  const byteLimit = new Transform({
    transform(chunk, _encoding, callback) {
      memberBytes += chunk.length;
      totals.actualExpandedBytes += chunk.length;
      try {
        validateActualExpansion(memberBytes, compressedSize, totals.actualExpandedBytes, limits);
        if (chunk.length > limits.maxInputChunkBytes) fail("input-chunk-size-limit");
        for (let offset = 0; offset < chunk.length; offset += parserChunkBytes) {
          this.push(chunk.subarray(offset, Math.min(offset + parserChunkBytes, chunk.length)));
        }
        callback();
      } catch (error) {
        callback(error);
      }
    },
  });
  const stream = chain([
    byteLimit,
    parser({ maxDepth: limits.maxDepth, maxPackedLength: limits.maxPackedLength, packKeys: true, streamKeys: true, streamStrings: true }),
    packedValueGuard(limits.maxPackedLength),
    duplicateKeyGuard(),
    pick({ filter: "LexicalResource.Lexicon.LexicalEntry" }),
    streamArray(),
  ]);
  return { stream, getMemberBytes: () => memberBytes };
}

async function processMember(entry, output, normalizer, totals, limits, signal, onProgress) {
  const bounded = createMemberPipeline(limits, totals, entry.compressedSize);
  const controller = new AbortController();
  const combinedSignal = signal
    ? AbortSignal.any([signal, controller.signal])
    : controller.signal;
  const webWritable = Writable.toWeb(bounded.stream);

  const consume = (async () => {
    for await (const item of bounded.stream) {
      if (combinedSignal.aborted) throw combinedSignal.reason ?? new Error("import-aborted");
      const record = item.value;
      totals.inputRecords += 1;
      if (totals.inputRecords > limits.maxRecords) fail("record-count-limit");
      if (Buffer.byteLength(JSON.stringify(record), "utf8") > limits.maxRecordBytes) fail("record-size-limit");

      const result = normalizer(record);
      if (result.status === "rejected") fail(`normalizer-rejected:${result.reason}`);
      if (result.status === "skipped") {
        totals.skipped += 1;
      } else {
        await writeLine(output, `${JSON.stringify(result.entry)}\n`);
        totals.accepted += 1;
      }
      onProgress?.({
        memberName: entry.filename,
        recordsProcessed: totals.inputRecords,
        bytesRead: bounded.getMemberBytes(),
      });
      if (combinedSignal.aborted) throw combinedSignal.reason ?? new Error("import-aborted");
    }
  })();

  const read = Promise.resolve().then(() => entry.getData(webWritable, {
    checkCrc32: true,
    checkOverlappingEntry: true,
    strictness: "strict",
    signal: combinedSignal,
  }));

  try {
    await Promise.all([read, consume]);
  } catch (error) {
    controller.abort(error);
    bounded.stream.destroy(error);
    await Promise.allSettled([read, consume]);
    throw error;
  }
  return bounded.getMemberBytes();
}

/**
 * Synthetic-only proof. Do not run against the NIKL archive: stream-json documents
 * that it is not designed for hostile JSON input. Production intake needs a separate
 * trust/validation review and explicit rights clearance.
 */
export async function importSyntheticArchive({
  archivePath,
  outputDir,
  expectedMemberNames = DEFAULT_MEMBER_NAMES,
  limits: limitOverrides = {},
  signal,
  onProgress,
}) {
  if (!archivePath || !outputDir) fail("archive-and-output-required");
  if (signal?.aborted) throw signal.reason ?? new Error("import-aborted");

  const limits = { ...DEFAULT_LIMITS, ...limitOverrides };
  const inputPath = resolve(archivePath);
  const finalPath = resolve(outputDir);
  const archiveInfo = await stat(inputPath);
  if (archiveInfo.size > limits.maxArchiveBytes) fail("archive-size-limit");

  await mkdir(dirname(finalPath), { recursive: true });
  try {
    await stat(finalPath);
    fail("output-already-exists");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const started = performance.now();
  const tempDir = await mkdtemp(join(dirname(finalPath), ".nikl-import-"));
  let reader;
  let output;
  const totals = { actualExpandedBytes: 0, inputRecords: 0, accepted: 0, skipped: 0 };

  try {
    const archiveSha256 = await sha256File(inputPath);
    reader = new ZipReader(new BlobReader(await openAsBlob(inputPath)), {
      strictness: "strict",
      checkOverlappingEntry: true,
    });
    const entries = await reader.getEntries({
      strictness: "strict",
      checkAmbiguity: true,
      filenameValidation: "strict",
    });
    const orderedEntries = validateEntryMetadata(entries, expectedMemberNames, limits);
    const normalizer = createNiklEntryNormalizer();
    output = createWriteStream(join(tempDir, "entries.jsonl"), { flags: "wx" });

    for (const entry of orderedEntries) {
      await processMember(entry, output, normalizer, totals, limits, signal, onProgress);
    }
    if (totals.inputRecords === 0) fail("missing-lexical-entry-array");

    output.end();
    await finished(output);
    await reader.close();
    reader = undefined;

    const jsonlPath = join(tempDir, "entries.jsonl");
    const outputInfo = await stat(jsonlPath);
    const manifest = {
      format: "lingomingle-nikl-jsonl-v1",
      sourceKind: "synthetic-only",
      importerVersion: "0.1.0",
      archiveSha256,
      memberNames: orderedEntries.map((entry) => entry.filename),
      counts: {
        inputRecords: totals.inputRecords,
        accepted: totals.accepted,
        skipped: totals.skipped,
      },
      output: {
        file: "entries.jsonl",
        bytes: outputInfo.size,
        sha256: await sha256File(jsonlPath),
      },
    };
    await writeFile(join(tempDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
    await rename(tempDir, finalPath);

    return {
      outputDir: finalPath,
      manifest,
      nodeVersion: process.version,
      elapsedMs: Number((performance.now() - started).toFixed(2)),
      processPeakRssKiB: process.resourceUsage().maxRSS,
    };
  } catch (error) {
    if (output && !output.destroyed) output.destroy();
    if (output) await finished(output).catch(() => {});
    await rm(tempDir, { recursive: true, force: true });
    throw error;
  } finally {
    if (reader) await reader.close().catch(() => {});
  }
}
