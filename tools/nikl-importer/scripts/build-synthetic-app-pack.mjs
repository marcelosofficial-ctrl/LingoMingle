import { mkdtemp, mkdir, readFile, rm, writeFile, copyFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { BlobWriter, TextReader, ZipWriter } from "@zip.js/zip.js";
import { importSyntheticArchive } from "../src/import.mjs";
import { buildSyntheticSqlitePack } from "../src/sqlite-pack.mjs";

const SOURCE = {
  id: "nikl-korean-basic-dictionary",
  name: "LingoMingle synthetic fixture source",
  version: "fixture-v1",
  sourceUrl: "https://example.invalid/lingomingle-synthetic-fixture",
  licenseId: "NO-LICENSE-SYNTHETIC",
  licenseUrl: "https://example.invalid/lingomingle-synthetic-fixture-license",
  attributionText: "Invented synthetic test content; not sourced from a dictionary.",
  retrievedAt: "2026-11-15T00:00:00.000Z",
  shareAlikeRequired: false,
  modificationNotes: "Synthetic-only application bundle smoke fixture.",
};

const feature = (att, val) => ({ att, val });
const entry = {
  att: "id",
  val: "9001",
  feat: [
    feature("lexicalUnit", "단어"),
    feature("partOfSpeech", "명사"),
    feature("vocabularyLevel", "초급"),
  ],
  Lemma: { feat: feature("writtenForm", "LM_SYNTHETIC_9001") },
  Sense: {
    att: "id",
    val: "1",
    feat: feature("definition", "invented synthetic source definition"),
    Equivalent: [{
      feat: [
        feature("language", "영어"),
        feature("lemma", "synthetic-fixture"),
        feature("definition", "invented synthetic English gloss"),
      ],
    }],
  },
};

const root = resolve(process.cwd());
const assets = join(root, "assets");
const temp = await mkdtemp(join(tmpdir(), "lingomingle-synthetic-app-pack-"));
try {
  await mkdir(assets, { recursive: true });
  const writer = new ZipWriter(new BlobWriter());
  await writer.add(
    "fixture-01.json",
    new TextReader(JSON.stringify({
      LexicalResource: { Lexicon: { LexicalEntry: [entry] } },
    })),
    { compressionMethod: 0 },
  );
  const archiveBlob = await writer.close();
  const archivePath = join(temp, "fixture.zip");
  await writeFile(archivePath, Buffer.from(await archiveBlob.arrayBuffer()));

  const imported = await importSyntheticArchive({
    archivePath,
    outputDir: join(temp, "imported"),
    expectedMemberNames: ["fixture-01.json"],
  });
  const built = await buildSyntheticSqlitePack({
    jsonlPath: join(imported.outputDir, "entries.jsonl"),
    inputManifestPath: join(imported.outputDir, "manifest.json"),
    outputDir: join(temp, "pack"),
    sources: [SOURCE],
  });

  const databasePath = join(assets, "glossary-synthetic-v1.db");
  const manifestPath = join(assets, "glossary-synthetic-v1.manifest.json");
  await copyFile(join(built.outputDir, "glossary.sqlite"), databasePath);
  await writeFile(manifestPath, `${JSON.stringify(built.manifest, null, 2)}\n`, { flag: "w" });

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  console.log("SYNTHETIC_APP_PACK", JSON.stringify({
    databasePath,
    bytes: manifest.database.bytes,
    sha256: manifest.database.sha256,
    counts: manifest.counts,
    sourceKind: manifest.sourceKind,
    sqliteVersion: manifest.sqliteVersion,
  }));
} finally {
  await rm(temp, { recursive: true, force: true });
}
