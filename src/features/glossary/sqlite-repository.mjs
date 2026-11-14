const APPLICATION_ID = 0x4c4d474c;
const SCHEMA_VERSION = 1;
const REQUIRED_TABLES = ["glossary_source","glossary_entry","glossary_surface_form","glossary_sense","glossary_sense_label","glossary_domain_label"];
const normalize = (value) => value.normalize("NFKC").trim().toLowerCase();
const placeholders = (count) => Array.from({length:count},()=>"?").join(",");

function lookupInput(key) {
  if (!key || !["ja","ko"].includes(key.language) || typeof key.surfaceForm !== "string") {
    throw new TypeError("invalid-glossary-lookup-key");
  }
  const surface=normalize(key.surfaceForm);
  if (!surface) return null;
  const analysis=key.analysis;
  if (!analysis || typeof analysis.surfaceForm!=="string" || normalize(analysis.surfaceForm)!==surface) {
    return {surface,analysis:null};
  }
  if (key.language==="ja" && typeof analysis.reading==="string" && normalize(analysis.reading)) {
    if (analysis.lemma!==undefined && typeof analysis.lemma!=="string") return {surface,analysis:null};
    return {surface,analysis};
  }
  if (key.language==="ko" && typeof analysis.lemma==="string" && normalize(analysis.lemma)
    && !/\\s/u.test(analysis.surfaceForm.trim())
    && typeof analysis.partOfSpeech?.scheme==="string" && analysis.partOfSpeech.scheme
    && typeof analysis.partOfSpeech?.tag==="string" && analysis.partOfSpeech.tag) {
    return {surface,analysis};
  }
  return {surface,analysis:null};
}
function mapEntry(row,surfaceMap,senseMap,labelMap,domainMap) {
  const entry={id:row.id,sourceId:row.source_id,language:row.language,
    surfaceForms:surfaceMap.get(row.id)??[],lemma:row.lemma,senses:senseMap.get(row.id)??[],priority:row.priority};
  if(row.reading!==null) entry.reading=row.reading;
  if(row.pos_scheme!==null) {
    entry.partOfSpeech={scheme:row.pos_scheme,tag:row.pos_tag};
    if(row.source_pos_scheme!==null) entry.partOfSpeech.source={scheme:row.source_pos_scheme,tag:row.source_pos_tag};
  }
  if(row.learner_level!==null) entry.learnerLevel=row.learner_level;
  if(row.frequency_rank!==null) entry.frequencyRank=row.frequency_rank;
  if(domainMap.has(row.id)) entry.domainLabels=domainMap.get(row.id);
  for(const sense of entry.senses) if(labelMap.has(sense.id)) sense.labels=labelMap.get(sense.id);
  return entry;
}

/**
 * Takes ownership of a dedicated, already-open Expo SQLite connection.
 * It never opens, creates, migrates, copies, or writes a database file.
 */
export async function createGlossaryRepository(db) {
  if(!db||typeof db.getFirstAsync!=="function"||typeof db.getAllAsync!=="function"
    ||typeof db.execAsync!=="function"||typeof db.closeAsync!=="function") {
    throw new TypeError("invalid-sqlite-database");
  }
  const appId=await db.getFirstAsync("PRAGMA application_id");
  const version=await db.getFirstAsync("PRAGMA user_version");
  if(appId?.application_id!==APPLICATION_ID||version?.user_version!==SCHEMA_VERSION) {
    throw new Error("unsupported-glossary-schema");
  }
  const tables=await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name IN (?,?,?,?,?,?)",...REQUIRED_TABLES,
  );
  if(REQUIRED_TABLES.some((name)=>!tables.some((row)=>row.name===name))) {
    throw new Error("incomplete-glossary-schema");
  }
  await db.execAsync("PRAGMA query_only=ON");
  if((await db.getFirstAsync("PRAGMA query_only"))?.query_only!==1) {
    throw new Error("glossary-readonly-mode-unavailable");
  }

  let closed=false;
  async function lookupGlosses(key) {
    if(closed) throw new Error("glossary-repository-closed");
    const input=lookupInput(key);
    if(!input) return [];
    const {surface,analysis}=input, candidates=new Map();
    const exact=await db.getAllAsync(
      "SELECT e.id FROM glossary_entry e WHERE e.language=? AND EXISTS ("+
      "SELECT 1 FROM glossary_surface_form sf WHERE sf.entry_id=e.id AND sf.normalized_form=?)",
      key.language,surface,
    );
    for(const row of exact) candidates.set(row.id,"surface");
    if(analysis&&key.language==="ja") {
      const lemma=typeof analysis.lemma==="string"&&analysis.lemma?normalize(analysis.lemma):null;
      const pos=analysis.partOfSpeech;
      if(pos&&(typeof pos.scheme!=="string"||typeof pos.tag!=="string")) return [];
      const rows=await db.getAllAsync(
        "SELECT e.id FROM glossary_entry e WHERE e.language='ja' AND e.normalized_reading=? "+
        "AND (? IS NULL OR e.normalized_lemma=?) "+
        "AND (? IS NULL OR e.pos_scheme IS NULL OR (e.pos_scheme=? AND e.pos_tag=?))",
        normalize(analysis.reading),lemma,lemma,pos?.scheme??null,pos?.scheme??null,pos?.tag??null,
      );
      for(const row of rows) if(!candidates.has(row.id)) candidates.set(row.id,"reading");
    } else if(analysis&&key.language==="ko") {
      const rows=await db.getAllAsync(
        "SELECT e.id FROM glossary_entry e WHERE e.language='ko' AND e.normalized_lemma=? "+
        "AND e.pos_scheme=? AND e.pos_tag=?",
        normalize(analysis.lemma),analysis.partOfSpeech.scheme,analysis.partOfSpeech.tag,
      );
      for(const row of rows) if(!candidates.has(row.id)) candidates.set(row.id,"lemma-pos");
    }
    if(!candidates.size) return [];
    const ids=[...candidates.keys()],marks=placeholders(ids.length);
    const entries=await db.getAllAsync(`SELECT * FROM glossary_entry WHERE id IN (${marks}) ORDER BY priority,id`,...ids);
    const surfaces=await db.getAllAsync(`SELECT entry_id,surface_form FROM glossary_surface_form WHERE entry_id IN (${marks}) ORDER BY entry_id,ordinal`,...ids);
    const senses=await db.getAllAsync(`SELECT id,entry_id,english_equivalent,english_gloss FROM glossary_sense WHERE entry_id IN (${marks}) ORDER BY entry_id,ordinal`,...ids);
    const labels=await db.getAllAsync(`SELECT sl.sense_id,sl.label FROM glossary_sense_label sl JOIN glossary_sense s ON s.id=sl.sense_id WHERE s.entry_id IN (${marks}) ORDER BY sl.sense_id,sl.ordinal`,...ids);
    const domains=await db.getAllAsync(`SELECT entry_id,label FROM glossary_domain_label WHERE entry_id IN (${marks}) ORDER BY entry_id,ordinal`,...ids);
    const surfaceMap=new Map(),senseMap=new Map(),labelMap=new Map(),domainMap=new Map();
    for(const row of surfaces) surfaceMap.set(row.entry_id,[...(surfaceMap.get(row.entry_id)??[]),row.surface_form]);
    for(const row of senses) {
      const sense={id:row.id,englishGloss:row.english_gloss};
      if(row.english_equivalent!==null) sense.englishEquivalent=row.english_equivalent;
      senseMap.set(row.entry_id,[...(senseMap.get(row.entry_id)??[]),sense]);
    }
    for(const row of labels) labelMap.set(row.sense_id,[...(labelMap.get(row.sense_id)??[]),row.label]);
    for(const row of domains) domainMap.set(row.entry_id,[...(domainMap.get(row.entry_id)??[]),row.label]);
    return entries.map((row)=>{
      const entry=mapEntry(row,surfaceMap,senseMap,labelMap,domainMap),matchedBy=candidates.get(row.id);
      let matchedForm=entry.lemma;
      if(matchedBy==="surface") matchedForm=entry.surfaceForms.find((form)=>normalize(form)===surface)??entry.surfaceForms[0];
      else if(key.language==="ja") matchedForm=entry.reading;
      return {entry,matchedBy,matchedForm};
    });
  }
  return {
    lookupGlosses,
    async close(){if(closed)return;closed=true;await db.closeAsync();},
  };
}
