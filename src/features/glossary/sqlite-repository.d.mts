import type { SQLiteDatabase } from "expo-sqlite";
import type { GlossLookupKey, GlossMatch } from "./types";

export interface GlossaryRepository {
  lookupGlosses(key: GlossLookupKey): Promise<GlossMatch[]>;
  /** Closes the dedicated SQLite connection transferred to the repository. */
  close(): Promise<void>;
}

/** Validates schema v1 and enables connection-level query-only mode; never opens or migrates a file. */
export function createGlossaryRepository(db: SQLiteDatabase): Promise<GlossaryRepository>;
