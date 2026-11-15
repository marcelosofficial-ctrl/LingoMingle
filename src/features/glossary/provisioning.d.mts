import type { SQLiteDatabase } from "expo-sqlite";

export interface GlossaryPackFile {
  readonly name: string; readonly uri: string; readonly exists: boolean;
  readonly parentDirectory: { readonly uri: string };
  digest(algorithm: "SHA-256"): Promise<string>;
  copy(destination: GlossaryPackFile): Promise<void>;
  move(destination: GlossaryPackFile): Promise<void>;
  delete(): void | Promise<void>;
}
export type GlossaryPackDatabase = SQLiteDatabase;
export declare const GLOSSARY_PACK_DATABASE_NAME: "lingomingle-glossary-v1.sqlite";
export declare const GLOSSARY_PACK_STAGING_NAME: ".lingomingle-glossary-v1.sqlite.staging";
export declare function validateGlossaryPackDatabase(db: GlossaryPackDatabase): Promise<void>;
export declare function provisionGlossaryPack(options: {
  sourceFile: GlossaryPackFile; destinationFile: GlossaryPackFile; stagingFile: GlossaryPackFile;
  expectedSha256: string; openDatabase(name: string): Promise<GlossaryPackDatabase>;
}): Promise<{ database: GlossaryPackDatabase; status: "installed" | "reused" }>;
