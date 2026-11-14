import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { DatabaseSync } from "node:sqlite";
import { buildSyntheticSqlitePack } from "../tools/nikl-importer/src/sqlite-pack.mjs";
import { createGlossaryRepository } from "../src/features/glossary/sqlite-repository.mjs";

const source={id:"synthetic-source",name:"Synthetic only",version:"fixture-v1",
  sourceUrl:"https://example.invalid/source",licenseId:"NO-LICENSE-SYNTHETIC",
  licenseUrl:"https://example.invalid/license",attributionText:"Invented fixture data.",
  retrievedAt:"2026-11-14T00:00:00.000Z",shareAlikeRequired:false,modificationNotes:"Synthetic records only."};
const entries=[
  {id:"ja-1",sourceId:source.id,language:"ja",surfaceForms:["暑い"],lemma:"暑い",reading:"あつい",
    partOfSpeech:{scheme:"synthetic-pos-v1",tag:"adjective",source:{scheme:"synthetic-ja-v1",tag:"adj"}},
    senses:[{id:"ja-s1",englishEquivalent:"hot",englishGloss:"hot weather",labels:["common"]}],
    learnerLevel:"beginner",frequencyRank:4,domainLabels:["weather"],priority:2},
  {id:"ja-2",sourceId:source.id,language:"ja",surfaceForms:["暑い"],lemma:"暑い",reading:"あつい",
    partOfSpeech:{scheme:"synthetic-pos-v1",tag:"adjective"},
    senses:[{id:"ja-s2",englishGloss:"high temperature"}],priority:1},
  {id:"ko-1",sourceId:source.id,language:"ko",surfaceForms:["먹다"],lemma:"먹다",
    partOfSpeech:{scheme:"lingomingle-pos-v1",tag:"verb",source:{scheme:"kiwi-postag-v0.24.1",tag:"VV"}},
    senses:[{id:"ko-s1",englishEquivalent:"eat",englishGloss:"to eat"}],
    learnerLevel:"초급",frequencyRank:12,domainLabels:["food"],priority:1},
];
async function makeFixture(){
  const dir=await mkdtemp(join(tmpdir(),"lingomingle-repository-"));
  const jsonlPath=join(dir,"entries.jsonl"),inputManifestPath=join(dir,"manifest.json");
  const bytes=Buffer.from(entries.map(JSON.stringify).join("\n")+"\n");
  await writeFile(jsonlPath,bytes);
  await writeFile(inputManifestPath,JSON.stringify({format:"lingomingle-nikl-jsonl-v1",sourceKind:"synthetic-only",
    memberNames:["fixture-01.json"],counts:{accepted:entries.length},
    output:{file:"entries.jsonl",bytes:bytes.length,sha256:createHash("sha256").update(bytes).digest("hex")}}));
  const outputDir=join(dir,"pack");
  await buildSyntheticSqlitePack({jsonlPath,inputManifestPath,outputDir,sources:[source]});
  return {dir,dbPath:join(outputDir,"glossary.sqlite")};
}
function expoAdapter(db){
  return {
    async getFirstAsync(sql,...params){return db.prepare(sql).get(...params)??null;},
    async getAllAsync(sql,...params){return db.prepare(sql).all(...params);},
    async execAsync(sql){db.exec(sql);},
    async closeAsync(){db.close();},
  };
}

test("read-only repository maps all metadata and preserves lookup order",async()=>{
  const pack=await makeFixture();
  try{
    const db=new DatabaseSync(pack.dbPath,{readOnly:true}),repo=await createGlossaryRepository(expoAdapter(db));
    assert.equal(db.prepare("PRAGMA query_only").get().query_only,1);
    const surface=await repo.lookupGlosses({language:"ja",surfaceForm:" 暑い "});
    assert.deepEqual(surface.map((x)=>x.entry.id),["ja-2","ja-1"]);
    assert.ok(surface.every((x)=>x.matchedBy==="surface"&&x.matchedForm==="暑い"));
    const reading=await repo.lookupGlosses({language:"ja",surfaceForm:"暑かった",
      analysis:{surfaceForm:"暑かった",lemma:"暑い",reading:"あつい",
        partOfSpeech:{scheme:"synthetic-pos-v1",tag:"adjective"}}});
    assert.deepEqual(reading.map((x)=>x.entry.id),["ja-2","ja-1"]);
    assert.ok(reading.every((x)=>x.matchedBy==="lemma-reading"&&x.matchedForm==="あつい"));
    const readingOnly=await repo.lookupGlosses({language:"ja",surfaceForm:"あつかった",
      analysis:{surfaceForm:"あつかった",reading:"あつい"}});
    assert.ok(readingOnly.every((x)=>x.matchedBy==="reading"));
    const korean=await repo.lookupGlosses({language:"ko",surfaceForm:"먹어요",
      analysis:{surfaceForm:"먹어요",lemma:"먹다",partOfSpeech:{scheme:"lingomingle-pos-v1",tag:"verb"}}});
    assert.equal(korean.length,1);
    assert.equal(korean[0].matchedBy,"lemma-pos");
    assert.deepEqual(korean[0].entry.partOfSpeech.source,{scheme:"kiwi-postag-v0.24.1",tag:"VV"});
    assert.equal(korean[0].entry.senses[0].englishEquivalent,"eat");
    assert.equal(korean[0].entry.senses[0].englishGloss,"to eat");
    assert.deepEqual(korean[0].entry.domainLabels,["food"]);
    assert.equal(korean[0].entry.learnerLevel,"초급");
    assert.equal(korean[0].entry.frequencyRank,12);
    assert.deepEqual(korean[0].entry.senses[0].labels,undefined);
    assert.deepEqual(await repo.lookupGlosses({language:"ko",surfaceForm:"unknown"}),[]);
    await repo.close();await repo.close();
    await assert.rejects(repo.lookupGlosses({language:"ko",surfaceForm:"먹다"}),/repository-closed/);
  }finally{await rm(pack.dir,{recursive:true,force:true});}
});

test("repository rejects unsupported or incomplete schema before enabling query-only mode",async()=>{
  let queryOnlySet=false;
  const wrongVersion={
    async getFirstAsync(sql){return sql.includes("application_id")?{application_id:0x4c4d474c}:{user_version:99};},
    async getAllAsync(){return[];},async execAsync(){queryOnlySet=true;},async closeAsync(){},
  };
  await assert.rejects(createGlossaryRepository(wrongVersion),/unsupported-glossary-schema/);
  assert.equal(queryOnlySet,false);
  const missingTables={
    async getFirstAsync(sql){return sql.includes("application_id")?{application_id:0x4c4d474c}:{user_version:1};},
    async getAllAsync(){return[{name:"glossary_entry"}];},
    async execAsync(){queryOnlySet=true;},async closeAsync(){},
  };
  await assert.rejects(createGlossaryRepository(missingTables),/incomplete-glossary-schema/);
  assert.equal(queryOnlySet,false);
});

test("stale analyzer tokens and Korean POS mismatches cannot create false matches",async()=>{
  const pack=await makeFixture();
  try{
    const repo=await createGlossaryRepository(expoAdapter(new DatabaseSync(pack.dbPath,{readOnly:true})));
    const stale=await repo.lookupGlosses({language:"ja",surfaceForm:"暑かった",
      analysis:{surfaceForm:"熱かった",lemma:"暑い",reading:"あつい"}});
    assert.deepEqual(stale,[]);
    const wrongPos=await repo.lookupGlosses({language:"ko",surfaceForm:"먹어요",
      analysis:{surfaceForm:"먹어요",lemma:"먹다",partOfSpeech:{scheme:"lingomingle-pos-v1",tag:"noun"}}});
    assert.deepEqual(wrongPos,[]);
    const spaced=await repo.lookupGlosses({language:"ko",surfaceForm:"먹 어요",
      analysis:{surfaceForm:"먹 어요",lemma:"먹다",partOfSpeech:{scheme:"lingomingle-pos-v1",tag:"verb"}}});
    assert.deepEqual(spaced,[]);
    await repo.close();
  }finally{await rm(pack.dir,{recursive:true,force:true});}
});
