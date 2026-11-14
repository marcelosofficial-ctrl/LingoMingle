import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { copyFile, existsSync, mkdir, mkdtemp, readFile, rename, rm, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { DatabaseSync } from "node:sqlite";
import { buildSyntheticSqlitePack } from "../tools/nikl-importer/src/sqlite-pack.mjs";
import { createGlossaryRepository } from "../src/features/glossary/sqlite-repository.mjs";
import { GLOSSARY_PACK_DATABASE_NAME, GLOSSARY_PACK_STAGING_NAME, provisionGlossaryPack } from "../src/features/glossary/provisioning.mjs";

const source={id:"synthetic-source",name:"Synthetic only",version:"fixture-v1",sourceUrl:"https://example.invalid/source",
  licenseId:"NO-LICENSE-SYNTHETIC",licenseUrl:"https://example.invalid/license",attributionText:"Invented fixture data.",
  retrievedAt:"2026-11-14T00:00:00.000Z",shareAlikeRequired:false,modificationNotes:"Synthetic records only."};
const entries=[
  {id:"ja-1",sourceId:source.id,language:"ja",surfaceForms:["暑い"],lemma:"暑い",reading:"あつい",
    partOfSpeech:{scheme:"synthetic-pos-v1",tag:"adjective"},senses:[{id:"ja-s1",englishGloss:"hot weather"}],priority:1},
  {id:"ko-1",sourceId:source.id,language:"ko",surfaceForms:["먹다"],lemma:"먹다",
    partOfSpeech:{scheme:"lingomingle-pos-v1",tag:"verb"},senses:[{id:"ko-s1",englishGloss:"to eat"}],priority:1},
];
function localFile(path,overrides={}) {
  return {name:basename(path),uri:path,parentDirectory:{uri:dirname(path)},
    get exists(){return existsSync(path);},
    async digest(algorithm){return createHash(algorithm).update(await readFile(path)).digest("hex");},
    async copy(destination){await copyFile(path,destination.uri);},
    async move(destination){await rename(path,destination.uri);},
    async delete(){await unlink(path);},...overrides};
}
async function fixture() {
  const root=await mkdtemp(join(tmpdir(),"lingomingle-provision-"));
  const input=join(root,"entries.jsonl"),inputManifest=join(root,"input-manifest.json");
  const bytes=Buffer.from(entries.map((entry)=>JSON.stringify(entry)).join("\n")+"\n");
  await writeFile(input,bytes);
  await writeFile(inputManifest,JSON.stringify({format:"lingomingle-nikl-jsonl-v1",sourceKind:"synthetic-only",
    memberNames:["fixture-01.json"],counts:{accepted:entries.length},
    output:{file:"entries.jsonl",bytes:bytes.length,sha256:createHash("sha256").update(bytes).digest("hex")}}));
  const packDir=join(root,"pack");
  await buildSyntheticSqlitePack({jsonlPath:input,inputManifestPath:inputManifest,outputDir:packDir,sources:[source]});
  const dbDir=join(root,"app-sqlite");await mkdir(dbDir);
  const sourcePath=join(root,"bundled.sqlite");await copyFile(join(packDir,"glossary.sqlite"),sourcePath);
  const sourceFile=localFile(sourcePath),destinationFile=localFile(join(dbDir,GLOSSARY_PACK_DATABASE_NAME));
  const stagingFile=localFile(join(dbDir,GLOSSARY_PACK_STAGING_NAME));
  const expectedSha256=await sourceFile.digest("sha256");
  const openDatabase=async(name)=>expoAdapter(new DatabaseSync(join(dbDir,name),{readOnly:true}));
  return {root,sourceFile,destinationFile,stagingFile,expectedSha256,openDatabase};
}
function expoAdapter(db) {
  return {async getFirstAsync(sql,...params){return db.prepare(sql).get(...params)??null;},
    async getAllAsync(sql,...params){return db.prepare(sql).all(...params);},
    async execAsync(sql){db.exec(sql);},async closeAsync(){db.close();}};
}
test("stages, verifies and hands off a read-only pack to the repository",async()=>{
  const f=await fixture();
  try{
    const result=await provisionGlossaryPack(f);
    assert.equal(result.status,"installed");assert.equal(f.destinationFile.exists,true);assert.equal(f.stagingFile.exists,false);
    const repo=await createGlossaryRepository(result.database);
    assert.equal((await repo.lookupGlosses({language:"ja",surfaceForm:"暑い"}))[0].entry.id,"ja-1");
    await repo.close();
    const repeated=await provisionGlossaryPack(f);assert.equal(repeated.status,"reused");await repeated.database.closeAsync();
  }finally{await rm(f.root,{recursive:true,force:true});}
});
test("reuses valid existing pack without touching bundled source",async()=>{
  const f=await fixture();
  try{
    await copyFile(f.sourceFile.uri,f.destinationFile.uri);let copies=0;
    const sourceFile=localFile(f.sourceFile.uri,{async digest(){throw new Error("source-should-not-be-read");},async copy(){copies++;}});
    const result=await provisionGlossaryPack({...f,sourceFile});
    assert.equal(result.status,"reused");assert.equal(copies,0);await result.database.closeAsync();
  }finally{await rm(f.root,{recursive:true,force:true});}
});
test("rejects bad asset hash before deleting an existing destination",async()=>{
  const f=await fixture();
  try{
    await writeFile(f.destinationFile.uri,"existing-file");await writeFile(f.sourceFile.uri,"tampered-source");
    await assert.rejects(provisionGlossaryPack(f),/asset-sha256-mismatch/);
    assert.equal(await readFile(f.destinationFile.uri,"utf8"),"existing-file");
  }finally{await rm(f.root,{recursive:true,force:true});}
});
test("rejects wrong-schema asset and cleans staging",async()=>{
  const f=await fixture();
  try{
    const bad=join(f.root,"wrong-schema.sqlite"),db=new DatabaseSync(bad);
    db.exec("CREATE TABLE not_a_glossary(id INTEGER);");db.close();await copyFile(bad,f.sourceFile.uri);
    const expectedSha256=await f.sourceFile.digest("sha256");
    await assert.rejects(provisionGlossaryPack({...f,expectedSha256}),/unsupported-glossary-schema/);
    assert.equal(f.stagingFile.exists,false);assert.equal(f.destinationFile.exists,false);
  }finally{await rm(f.root,{recursive:true,force:true});}
});
test("cleans interrupted copy and move, then recovers",async()=>{
  const f=await fixture();
  try{
    const interruptedSource=localFile(f.sourceFile.uri,{async copy(destination){await writeFile(destination.uri,"partial");throw new Error("copy-interrupted");}});
    await assert.rejects(provisionGlossaryPack({...f,sourceFile:interruptedSource}),/copy-interrupted/);
    assert.equal(f.stagingFile.exists,false);assert.equal(f.destinationFile.exists,false);
    const interruptedStage=localFile(f.stagingFile.uri,{async move(destination){await writeFile(destination.uri,"partial");throw new Error("move-interrupted");}});
    await assert.rejects(provisionGlossaryPack({...f,stagingFile:interruptedStage}),/move-interrupted/);
    assert.equal(f.stagingFile.exists,false);assert.equal(f.destinationFile.exists,false);
    const recovered=await provisionGlossaryPack(f);assert.equal(recovered.status,"installed");await recovered.database.closeAsync();
  }finally{await rm(f.root,{recursive:true,force:true});}
});
test("cleans stale staging and rebuilds a mismatched reserved destination",async()=>{
  const f=await fixture();
  try{
    await writeFile(f.stagingFile.uri,"stale-stage");await writeFile(f.destinationFile.uri,"partial-destination");
    const result=await provisionGlossaryPack(f);assert.equal(result.status,"installed");
    assert.equal(f.stagingFile.exists,false);assert.equal(await f.destinationFile.digest("sha256"),f.expectedSha256);
    await result.database.closeAsync();
  }finally{await rm(f.root,{recursive:true,force:true});}
});
