import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { DatabaseSync } from "node:sqlite";
import { BlobWriter, TextReader, ZipWriter } from "@zip.js/zip.js";
import { importSyntheticArchive } from "../src/import.mjs";
import { buildSyntheticSqlitePack } from "../src/sqlite-pack.mjs";

const SOURCE = {
  id: "nikl-korean-basic-dictionary", name: "Synthetic fixture source", version: "fixture-v1",
  sourceUrl: "https://example.invalid/source", licenseId: "NO-LICENSE-SYNTHETIC",
  licenseUrl: "https://example.invalid/license", attributionText: "Invented test content only.",
  retrievedAt: "2026-11-14T00:00:00.000Z", shareAlikeRequired: false,
  modificationNotes: "Synthetic fixture; not an actual source record.",
};
const feat = (att,val) => ({att,val});
function wordEntry(id) {
  return {
    att:"id",val:String(id),feat:[feat("lexicalUnit","단어"),feat("partOfSpeech","명사"),feat("vocabularyLevel","초급")],
    Lemma:{feat:feat("writtenForm",`LM_SYNTHETIC_${id}`)},
    Sense:{att:"id",val:"1",feat:feat("definition","synthetic source definition"),Equivalent:[{feat:[
      feat("language","영어"),feat("lemma","LM_SYNTHETIC_EQUIVALENT"),feat("definition","synthetic English gloss"),
    ]}]},
  };
}
async function sandbox(){return mkdtemp(join(tmpdir(),"lingomingle-sqlite-pack-"));}
async function makeInput(parent, ids=[1001,1002]) {
  const writer=new ZipWriter(new BlobWriter());
  await writer.add("fixture-01.json",new TextReader(JSON.stringify({LexicalResource:{Lexicon:{LexicalEntry:ids.map(wordEntry)}}})),{compressionMethod:0});
  const blob=await writer.close(), archive=join(parent,"fixture.zip");
  await writeFile(archive,Buffer.from(await blob.arrayBuffer()));
  const output=join(parent,"jsonl");
  await importSyntheticArchive({archivePath:archive,outputDir:output,expectedMemberNames:["fixture-01.json"]});
  return {jsonlPath:join(output,"entries.jsonl"),inputManifestPath:join(output,"manifest.json")};
}
async function rewriteInput(bundle, lines) {
  await writeFile(bundle.jsonlPath,lines.join("\n")+"\n");
  const manifest=JSON.parse(await readFile(bundle.inputManifestPath,"utf8"));
  const bytes=await readFile(bundle.jsonlPath);
  manifest.counts={inputRecords:lines.length,accepted:lines.length,skipped:0};
  manifest.output.bytes=bytes.length;
  manifest.output.sha256=createHash("sha256").update(bytes).digest("hex");
  await writeFile(bundle.inputManifestPath,JSON.stringify(manifest,null,2)+"\n");
}
async function records(bundle){return (await readFile(bundle.jsonlPath,"utf8")).trim().split("\n").map(JSON.parse);}
const build=(bundle,out,extra={})=>buildSyntheticSqlitePack({...bundle,outputDir:out,sources:[SOURCE],...extra});

test("builds a normalized, indexed, verified and deterministic SQLite pack",async()=>{
  const parent=await sandbox();
  try{
    const bundle=await makeInput(parent);
    const a=await build(bundle,join(parent,"pack-a"));
    const b=await build(bundle,join(parent,"pack-b"));
    assert.deepEqual(a.manifest.counts,{sources:1,entries:2,surfaceForms:2,senses:2,senseLabels:0,domainLabels:0});
    assert.equal(a.manifest.schemaVersion,1);
    assert.equal(a.manifest.database.sha256,b.manifest.database.sha256);
    assert.equal(await readFile(join(a.outputDir,"manifest.json"),"utf8"),await readFile(join(b.outputDir,"manifest.json"),"utf8"));
    const db=new DatabaseSync(join(a.outputDir,"glossary.sqlite"),{readOnly:true});
    assert.equal(db.prepare("PRAGMA integrity_check").get().integrity_check,"ok");
    assert.deepEqual(db.prepare("PRAGMA foreign_key_check").all(),[]);
    assert.equal(db.prepare("PRAGMA user_version").get().user_version,1);
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM glossary_source").get().n,1);
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM glossary_sense").get().n,2);
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='index' AND name='idx_surface_lookup'").get().n,1);
    assert.equal(db.prepare("SELECT e.lemma FROM glossary_entry e JOIN glossary_surface_form s ON s.entry_id=e.id WHERE s.surface_form=?").get("LM_SYNTHETIC_1001").lemma,"LM_SYNTHETIC_1001");
    db.close();
  }finally{await rm(parent,{recursive:true,force:true});}
});

test("malformed JSONL, duplicate IDs and SQL constraint failures never publish partial output",async()=>{
  const parent=await sandbox();
  try{
    const malformed=await makeInput(parent,[2001]);
    await rewriteInput(malformed,["{bad-json"]);
    await assert.rejects(build(malformed,join(parent,"bad-json")),/invalid-jsonl/);

    const duplicate=await makeInput(parent,[2002,2003]);
    const rows=await records(duplicate);
    rows[1].id=rows[0].id;
    await rewriteInput(duplicate,rows.map(JSON.stringify));
    await assert.rejects(build(duplicate,join(parent,"duplicate-id")));

    const senseCollision=await makeInput(parent,[2004,2005]);
    const collision=await records(senseCollision);
    collision[1].senses[0].id=collision[0].senses[0].id;
    await rewriteInput(senseCollision,collision.map(JSON.stringify));
    await assert.rejects(build(senseCollision,join(parent,"constraint-rollback")));
    assert.deepEqual((await readdir(parent)).filter(x=>x.startsWith(".glossary-pack-")),[]);
    assert.equal((await readdir(parent)).some(x=>x==="constraint-rollback"),false);
  }finally{await rm(parent,{recursive:true,force:true});}
});

test("cancellation and existing-output refusal clean temporary files",async()=>{
  const parent=await sandbox();
  try{
    const bundle=await makeInput(parent,[3001,3002]);
    const controller=new AbortController();
    await assert.rejects(build(bundle,join(parent,"cancelled"),{
      signal:controller.signal,onProgress:({recordsProcessed})=>{if(recordsProcessed===1)controller.abort(new Error("fixture-cancel"));},
    }),/fixture-cancel|pack-aborted/);
    const existing=join(parent,"existing");
    await mkdir(existing);
    await assert.rejects(build(bundle,existing),/output-already-exists/);
    assert.deepEqual((await readdir(parent)).filter(x=>x.startsWith(".glossary-pack-")),[]);
  }finally{await rm(parent,{recursive:true,force:true});}
});
