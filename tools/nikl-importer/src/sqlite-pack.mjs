import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { createInterface } from "node:readline";
import { DatabaseSync } from "node:sqlite";

const SCHEMA_VERSION = 1;
const APPLICATION_ID = 0x4c4d474c;
const SCHEMA = `
CREATE TABLE glossary_source (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, version TEXT NOT NULL, source_url TEXT NOT NULL,
 license_id TEXT NOT NULL, license_url TEXT NOT NULL, attribution_text TEXT NOT NULL,
 retrieved_at TEXT NOT NULL, share_alike_required INTEGER NOT NULL CHECK(share_alike_required IN (0,1)),
 modification_notes TEXT NOT NULL
) STRICT;
CREATE TABLE glossary_entry (
 id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES glossary_source(id),
 language TEXT NOT NULL CHECK(language IN ('ja','ko')), lemma TEXT NOT NULL, reading TEXT,
 pos_scheme TEXT, pos_tag TEXT, source_pos_scheme TEXT, source_pos_tag TEXT,
 learner_level TEXT, frequency_rank INTEGER CHECK(frequency_rank IS NULL OR frequency_rank >= 0),
 priority INTEGER NOT NULL,
 CHECK((pos_scheme IS NULL) = (pos_tag IS NULL)),
 CHECK((source_pos_scheme IS NULL) = (source_pos_tag IS NULL))
) STRICT;
CREATE TABLE glossary_surface_form (
 entry_id TEXT NOT NULL REFERENCES glossary_entry(id) ON DELETE CASCADE,
 ordinal INTEGER NOT NULL CHECK(ordinal >= 0), surface_form TEXT NOT NULL,
 PRIMARY KEY(entry_id, ordinal), UNIQUE(entry_id, surface_form)
) STRICT;
CREATE TABLE glossary_sense (
 id TEXT PRIMARY KEY, entry_id TEXT NOT NULL REFERENCES glossary_entry(id) ON DELETE CASCADE,
 ordinal INTEGER NOT NULL CHECK(ordinal >= 0), english_equivalent TEXT, english_gloss TEXT NOT NULL,
 UNIQUE(entry_id, ordinal)
) STRICT;
CREATE TABLE glossary_sense_label (
 sense_id TEXT NOT NULL REFERENCES glossary_sense(id) ON DELETE CASCADE,
 ordinal INTEGER NOT NULL CHECK(ordinal >= 0), label TEXT NOT NULL,
 PRIMARY KEY(sense_id, ordinal), UNIQUE(sense_id, label)
) STRICT;
CREATE TABLE glossary_domain_label (
 entry_id TEXT NOT NULL REFERENCES glossary_entry(id) ON DELETE CASCADE,
 ordinal INTEGER NOT NULL CHECK(ordinal >= 0), label TEXT NOT NULL,
 PRIMARY KEY(entry_id, ordinal), UNIQUE(entry_id, label)
) STRICT;`;

function fail(code) { throw new Error(code); }
function requireString(value, code) {
  if (typeof value !== "string" || !value.trim()) fail(code);
  return value;
}
function validateStrings(value, code, allowEmpty = true) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)
    || value.some((item) => typeof item !== "string" || !item.trim())
    || new Set(value).size !== value.length) fail(code);
}
function validateSource(source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) fail("invalid-source");
  for (const key of ["id","name","version","sourceUrl","licenseId","licenseUrl","attributionText","retrievedAt","modificationNotes"]) {
    requireString(source[key], "invalid-source");
  }
  if (typeof source.shareAlikeRequired !== "boolean") fail("invalid-source");
  return source;
}
function validateEntry(entry, sources) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) fail("invalid-entry");
  for (const key of ["id","sourceId","lemma"]) requireString(entry[key], "invalid-entry");
  if (!sources.has(entry.sourceId)) fail("unknown-source");
  if (!["ja","ko"].includes(entry.language)) fail("invalid-language");
  validateStrings(entry.surfaceForms, "invalid-surface-forms", false);
  if (entry.reading !== undefined) requireString(entry.reading, "invalid-reading");
  if (entry.partOfSpeech !== undefined) {
    const pos = entry.partOfSpeech;
    if (!pos || typeof pos !== "object" || Array.isArray(pos)) fail("invalid-pos");
    requireString(pos.scheme, "invalid-pos"); requireString(pos.tag, "invalid-pos");
    if (pos.source !== undefined) {
      requireString(pos.source.scheme, "invalid-pos"); requireString(pos.source.tag, "invalid-pos");
    }
  }
  if (!Array.isArray(entry.senses) || entry.senses.length === 0) fail("invalid-senses");
  for (const sense of entry.senses) {
    requireString(sense?.id, "invalid-sense"); requireString(sense.englishGloss, "invalid-sense");
    if (sense.englishEquivalent !== undefined) requireString(sense.englishEquivalent, "invalid-sense");
    if (sense.labels !== undefined) validateStrings(sense.labels, "invalid-sense-labels");
  }
  if (entry.learnerLevel !== undefined) requireString(entry.learnerLevel, "invalid-learner-level");
  if (entry.frequencyRank !== undefined && (!Number.isSafeInteger(entry.frequencyRank) || entry.frequencyRank < 0)) fail("invalid-frequency-rank");
  if (!Number.isSafeInteger(entry.priority)) fail("invalid-priority");
  if (entry.domainLabels !== undefined) validateStrings(entry.domainLabels, "invalid-domain-labels");
}
async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}
async function exists(path) {
  try { await stat(path); return true; } catch (error) { if (error.code === "ENOENT") return false; throw error; }
}

export async function buildSyntheticSqlitePack({
  jsonlPath, inputManifestPath, outputDir, sources, limits: overrides = {}, signal, onProgress,
}) {
  if (!jsonlPath || !inputManifestPath || !outputDir) fail("input-and-output-required");
  const limits = { maxJsonlBytes: 100_000_000, maxRecordBytes: 2_000_000, maxRecords: 60_000, ...overrides };
  const inputPath = resolve(jsonlPath), manifestPath = resolve(inputManifestPath), finalPath = resolve(outputDir);
  if (basename(inputPath) !== "entries.jsonl" || dirname(inputPath) !== dirname(manifestPath)) fail("invalid-input-path");
  if (signal?.aborted) throw signal.reason ?? new Error("pack-aborted");
  const [manifestInfo, jsonlInfo] = await Promise.all([stat(manifestPath), stat(inputPath)]);
  if (manifestInfo.size > 1_000_000 || jsonlInfo.size > limits.maxJsonlBytes) fail("input-size-limit");
  const manifestText = await readFile(manifestPath, "utf8");
  let inputManifest;
  try { inputManifest = JSON.parse(manifestText); } catch { fail("invalid-input-manifest"); }
  if (inputManifest?.format !== "lingomingle-nikl-jsonl-v1" || inputManifest.sourceKind !== "synthetic-only"
    || !Array.isArray(inputManifest.memberNames) || inputManifest.memberNames.length === 0
    || inputManifest.memberNames.some((name) => !/^fixture-[0-9]{2}[.]json$/u.test(name))
    || inputManifest.output?.file !== "entries.jsonl") fail("synthetic-input-manifest-required");
  if (inputManifest.output.bytes !== jsonlInfo.size || inputManifest.output.sha256 !== await sha256File(inputPath)) fail("input-jsonl-hash-mismatch");
  if (!Number.isSafeInteger(inputManifest.counts?.accepted)) fail("invalid-input-counts");
  if (!Array.isArray(sources) || sources.length === 0) fail("sources-required");
  const sourceList = sources.map(validateSource).sort((a,b) => a.id.localeCompare(b.id));
  const sourceIds = new Set(sourceList.map((source) => source.id));
  if (sourceIds.size !== sourceList.length) fail("duplicate-source-id");
  await mkdir(dirname(finalPath), { recursive: true });
  if (await exists(finalPath)) fail("output-already-exists");

  const started = performance.now(), tempDir = await mkdtemp(join(dirname(finalPath), ".glossary-pack-"));
  const dbPath = join(tempDir, "glossary.sqlite"), counts = {
    entries: 0, surfaceForms: 0, senses: 0, senseLabels: 0, domainLabels: 0,
  };
  let db, inTransaction = false, input;
  let firstEntry = null;
  try {
    db = new DatabaseSync(dbPath, { enableForeignKeyConstraints: true, allowExtension: false });
    db.exec("PRAGMA foreign_keys=ON; PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL; PRAGMA page_size=4096;");
    db.exec("BEGIN IMMEDIATE"); inTransaction = true;
    db.exec(SCHEMA);
    const sourceInsert = db.prepare("INSERT INTO glossary_source VALUES (?,?,?,?,?,?,?,?,?,?)");
    for (const source of sourceList) {
      sourceInsert.run(source.id,source.name,source.version,source.sourceUrl,source.licenseId,source.licenseUrl,
        source.attributionText,source.retrievedAt,source.shareAlikeRequired ? 1 : 0,source.modificationNotes);
    }
    const entryInsert = db.prepare("INSERT INTO glossary_entry VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    const surfaceInsert = db.prepare("INSERT INTO glossary_surface_form VALUES (?,?,?)");
    const senseInsert = db.prepare("INSERT INTO glossary_sense VALUES (?,?,?,?,?)");
    const senseLabelInsert = db.prepare("INSERT INTO glossary_sense_label VALUES (?,?,?)");
    const domainLabelInsert = db.prepare("INSERT INTO glossary_domain_label VALUES (?,?,?)");
    input = createReadStream(inputPath);
    const lines = createInterface({ input, crlfDelay: Infinity });
    for await (const line of lines) {
      if (signal?.aborted) throw signal.reason ?? new Error("pack-aborted");
      if (!line.trim() || Buffer.byteLength(line,"utf8") > limits.maxRecordBytes) fail("invalid-jsonl-line");
      let entry;
      try { entry = JSON.parse(line); } catch { fail("invalid-jsonl"); }
      validateEntry(entry, sourceIds);
      if (!firstEntry) firstEntry = entry;
      counts.entries += 1;
      if (counts.entries > limits.maxRecords) fail("record-count-limit");
      const pos = entry.partOfSpeech;
      entryInsert.run(entry.id,entry.sourceId,entry.language,entry.lemma,entry.reading ?? null,
        pos?.scheme ?? null,pos?.tag ?? null,pos?.source?.scheme ?? null,pos?.source?.tag ?? null,
        entry.learnerLevel ?? null,entry.frequencyRank ?? null,entry.priority);
      entry.surfaceForms.forEach((form,ordinal) => { surfaceInsert.run(entry.id,ordinal,form); counts.surfaceForms += 1; });
      entry.senses.forEach((sense,ordinal) => {
        senseInsert.run(sense.id,entry.id,ordinal,sense.englishEquivalent ?? null,sense.englishGloss);
        counts.senses += 1;
        (sense.labels ?? []).forEach((label,index) => { senseLabelInsert.run(sense.id,index,label); counts.senseLabels += 1; });
      });
      (entry.domainLabels ?? []).forEach((label,ordinal) => { domainLabelInsert.run(entry.id,ordinal,label); counts.domainLabels += 1; });
      onProgress?.({ recordsProcessed: counts.entries, entries: counts.entries, senses: counts.senses });
    }
    if (!counts.entries || counts.entries !== inputManifest.counts.accepted) fail("input-count-mismatch");
    if (signal?.aborted) throw signal.reason ?? new Error("pack-aborted");
    db.exec("CREATE INDEX idx_surface_lookup ON glossary_surface_form(surface_form,entry_id); CREATE INDEX idx_lemma_pos_lookup ON glossary_entry(language,lemma,pos_scheme,pos_tag); CREATE INDEX idx_source_lookup ON glossary_entry(source_id,language);");
    db.exec(`PRAGMA user_version=${SCHEMA_VERSION}; PRAGMA application_id=${APPLICATION_ID}; COMMIT;`);
    inTransaction = false;
    if (db.prepare("PRAGMA integrity_check").get()?.integrity_check !== "ok") fail("integrity-check-failed");
    if (db.prepare("PRAGMA foreign_key_check").all().length) fail("foreign-key-check-failed");
    const sqliteVersion = db.prepare("SELECT sqlite_version() AS version").get().version;
    if (db.prepare("PRAGMA user_version").get().user_version !== SCHEMA_VERSION) fail("schema-version-check-failed");
    const unique = db.prepare("SELECT COUNT(*) AS total,COUNT(DISTINCT id) AS distinct_count FROM glossary_entry").get();
    if (unique.total !== counts.entries || unique.distinct_count !== counts.entries) fail("entry-uniqueness-check-failed");
    const lookup = db.prepare("SELECT e.id FROM glossary_entry e JOIN glossary_surface_form s ON s.entry_id=e.id WHERE s.surface_form=? ORDER BY e.priority,e.id LIMIT 1").get(firstEntry.surfaceForms[0]);
    if (lookup?.id !== firstEntry.id) fail("representative-lookup-failed");
    db.close(); db = undefined;
    const dbInfo = await stat(dbPath);
    const manifest = {
      format: "lingomingle-glossary-sqlite-v1", sourceKind: "synthetic-only", schemaVersion: SCHEMA_VERSION,
      applicationId: APPLICATION_ID, sqliteVersion,
      input: { jsonlSha256: await sha256File(inputPath), manifestSha256: createHash("sha256").update(manifestText).digest("hex") },
      counts: { sources: sourceList.length, ...counts },
      database: { file: "glossary.sqlite", bytes: dbInfo.size, sha256: await sha256File(dbPath) },
    };
    await writeFile(join(tempDir,"manifest.json"), `${JSON.stringify(manifest,null,2)}\n`, { flag: "wx" });
    await rename(tempDir, finalPath);
    return { outputDir: finalPath, manifest, elapsedMs: Number((performance.now()-started).toFixed(2)), processPeakRssKiB: process.resourceUsage().maxRSS };
  } catch (error) {
    if (inTransaction && db) { try { db.exec("ROLLBACK"); } catch {} }
    if (db) { try { db.close(); } catch {} }
    if (input) input.destroy();
    await rm(tempDir,{recursive:true,force:true});
    throw error;
  }
}
