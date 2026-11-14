const REQUIRED_COLUMNS = {
  glossary_source:["id","name","version","source_url","license_id","license_url","attribution_text","retrieved_at","share_alike_required","modification_notes"],
  glossary_entry:["id","source_id","language","lemma","normalized_lemma","reading","normalized_reading","pos_scheme","pos_tag","source_pos_scheme","source_pos_tag","learner_level","frequency_rank","priority"],
  glossary_surface_form:["entry_id","ordinal","surface_form","normalized_form"],
  glossary_sense:["id","entry_id","ordinal","english_equivalent","english_gloss"],
  glossary_sense_label:["sense_id","ordinal","label"],
  glossary_domain_label:["entry_id","ordinal","label"],
};
const REQUIRED_TABLES = Object.keys(REQUIRED_COLUMNS);
export const GLOSSARY_PACK_DATABASE_NAME = "lingomingle-glossary-v1.sqlite";
export const GLOSSARY_PACK_STAGING_NAME = ".lingomingle-glossary-v1.sqlite.staging";
const active = new Map();
function fail(code) { throw new Error(code); }

export async function validateGlossaryPackDatabase(db) {
  if (!db || typeof db.getFirstAsync !== "function" || typeof db.getAllAsync !== "function"
    || typeof db.execAsync !== "function" || typeof db.closeAsync !== "function") fail("invalid-sqlite-database");
  const appId = await db.getFirstAsync("PRAGMA application_id");
  const version = await db.getFirstAsync("PRAGMA user_version");
  if (appId?.application_id !== 0x4c4d474c || version?.user_version !== 1) fail("unsupported-glossary-schema");
  if ((await db.getFirstAsync("PRAGMA integrity_check"))?.integrity_check !== "ok") fail("glossary-integrity-check-failed");
  if ((await db.getAllAsync("PRAGMA foreign_key_check")).length) fail("glossary-foreign-key-check-failed");
  const tables = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name IN (?,?,?,?,?,?)", ...REQUIRED_TABLES,
  );
  if (REQUIRED_TABLES.some((name) => !tables.some((row) => row.name === name))) fail("incomplete-glossary-schema");
  for (const [table, expected] of Object.entries(REQUIRED_COLUMNS)) {
    const columns = await db.getAllAsync(`PRAGMA table_info(${table})`);
    if (columns.map((row) => row.name).join("|") !== expected.join("|")) fail("glossary-table-shape-mismatch");
  }
  const counts = await db.getFirstAsync(
    "SELECT (SELECT COUNT(*) FROM glossary_source) AS sources, (SELECT COUNT(*) FROM glossary_entry) AS entries",
  );
  if (!counts || counts.sources < 1 || counts.entries < 1) fail("empty-glossary-pack");
  await db.execAsync("PRAGMA query_only=ON");
  if ((await db.getFirstAsync("PRAGMA query_only"))?.query_only !== 1) fail("glossary-readonly-mode-unavailable");
}
async function openValidated(openDatabase, name) {
  const db = await openDatabase(name);
  try { await validateGlossaryPackDatabase(db); return db; }
  catch (error) { try { await db.closeAsync(); } catch {} throw error; }
}
async function provision(options) {
  const { sourceFile, destinationFile, stagingFile, expectedSha256, openDatabase } = options;
  if (!/^[a-f0-9]{64}$/u.test(expectedSha256 ?? "")) fail("invalid-expected-sha256");
  if (destinationFile?.name !== GLOSSARY_PACK_DATABASE_NAME || stagingFile?.name !== GLOSSARY_PACK_STAGING_NAME
    || destinationFile.parentDirectory?.uri !== stagingFile.parentDirectory?.uri) fail("invalid-glossary-pack-paths");
  for (const file of [sourceFile,destinationFile,stagingFile]) {
    if (!file || typeof file.digest !== "function" || typeof file.copy !== "function"
      || typeof file.delete !== "function" || typeof file.exists !== "boolean") fail("invalid-glossary-pack-file");
  }
  if (typeof openDatabase !== "function") fail("open-database-required");
  if (stagingFile.exists) await stagingFile.delete();
  if (destinationFile.exists && await destinationFile.digest("SHA-256") === expectedSha256) {
    return {database:await openValidated(openDatabase,GLOSSARY_PACK_DATABASE_NAME),status:"reused"};
  }
  // Verify the bundled source before deleting an invalid app-owned destination.
  if (await sourceFile.digest("SHA-256") !== expectedSha256) fail("glossary-asset-sha256-mismatch");
  if (destinationFile.exists) await destinationFile.delete();
  try {
    await sourceFile.copy(stagingFile);
    if (!stagingFile.exists || await stagingFile.digest("SHA-256") !== expectedSha256) fail("glossary-staging-sha256-mismatch");
    const stagedDb=await openValidated(openDatabase,GLOSSARY_PACK_STAGING_NAME);
    await stagedDb.closeAsync();
    if (destinationFile.exists) fail("glossary-pack-destination-raced");
    await stagingFile.move(destinationFile);
    if (!destinationFile.exists || await destinationFile.digest("SHA-256") !== expectedSha256) fail("glossary-published-sha256-mismatch");
    return {database:await openValidated(openDatabase,GLOSSARY_PACK_DATABASE_NAME),status:"installed"};
  } catch (error) {
    if (stagingFile.exists) { try { await stagingFile.delete(); } catch {} }
    // Only the reserved app-owned filename may be automatically removed.
    if (destinationFile.exists) {
      let digest;
      try { digest=await destinationFile.digest("SHA-256"); } catch {}
      if (digest !== expectedSha256) { try { await destinationFile.delete(); } catch {} }
    }
    throw error;
  }
}
/**
 * Installs/reuses the immutable v1 pack. Supply Expo File instances in
 * SQLite.defaultDatabaseDirectory and openDatabaseAsync(name). Move atomicity
 * is not assumed: every open is gated by SHA-256 and SQLite validation.
 */
export function provisionGlossaryPack(options) {
  const key=options?.destinationFile?.uri;
  if (typeof key!=="string" || !key) return Promise.reject(new Error("invalid-glossary-pack-paths"));
  const pending=active.get(key);
  if (pending && pending.sha256!==options.expectedSha256) return Promise.reject(new Error("glossary-pack-provision-conflict"));
  const start=pending ? pending.promise.catch(()=>undefined) : Promise.resolve();
  const promise=start.then(()=>provision(options));
  const tracked=promise.finally(()=>{if(active.get(key)?.promise===tracked)active.delete(key);});
  active.set(key,{sha256:options.expectedSha256,promise:tracked});
  return tracked;
}
