import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

import {
  GLOSSARY_PACK_DATABASE_NAME,
  GLOSSARY_PACK_STAGING_NAME,
  provisionGlossaryPack,
  type GlossaryPackFile,
} from "./provisioning.mjs";
import { createGlossaryRepository, type GlossaryRepository } from "./sqlite-repository.mjs";

const EXPECTED_SYNTHETIC_PACK_SHA256 = "29e3d4fb5db7ba262328cab6350d25f82510ff8bd29dc9f0ca70efad8aa4e404";
const SYNTHETIC_PACK_MODULE_ID = require("../../../assets/glossary-synthetic-v1.db");
const ALLOWED_DATABASE_NAMES = new Set<string>([
  GLOSSARY_PACK_DATABASE_NAME,
  GLOSSARY_PACK_STAGING_NAME,
]);

export interface GlossaryContextValue {
  status: "loading" | "ready" | "error";
  repository: GlossaryRepository | null;
  error: Error | null;
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null);

class ExpoGlossaryPackFile implements GlossaryPackFile {
  constructor(readonly native: File) {}

  get name(): string { return this.native.name; }
  get uri(): string { return this.native.uri; }
  get exists(): boolean { return this.native.exists; }
  get parentDirectory(): { readonly uri: string } {
    return { uri: this.native.parentDirectory.uri };
  }

  digest(algorithm: "SHA-256"): Promise<string> {
    return this.native.digest(algorithm);
  }

  async copy(destination: GlossaryPackFile): Promise<void> {
    await this.native.copy(unwrapExpoFile(destination));
  }

  async move(destination: GlossaryPackFile): Promise<void> {
    await this.native.move(unwrapExpoFile(destination));
  }

  async delete(): Promise<void> {
    await this.native.delete();
  }
}

function unwrapExpoFile(file: GlossaryPackFile): File {
  if (!(file instanceof ExpoGlossaryPackFile)) {
    throw new TypeError("invalid-expo-glossary-file-adapter");
  }
  return file.native;
}

function toPackFile(file: File): GlossaryPackFile {
  return new ExpoGlossaryPackFile(file);
}

export function useGlossaryContext(): GlossaryContextValue {
  const value = useContext(GlossaryContext);
  if (!value) throw new Error("useGlossaryContext must be used within GlossaryProvider");
  return value;
}

/**
 * Owns one dedicated query-only connection to the verified bundled glossary.
 * The cache URI from Expo Asset is only a temporary source; T015 copies it
 * into SQLite's persistent database directory before opening either database.
 */
export function GlossaryProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState<GlossaryContextValue>({
    status: "loading",
    repository: null,
    error: null,
  });

  useEffect(() => {
    let disposed = false;
    let repository: GlossaryRepository | null = null;
    let unownedDatabase: SQLite.SQLiteDatabase | null = null;

    async function initialise(): Promise<void> {
      try {
        const asset = await Asset.fromModule(SYNTHETIC_PACK_MODULE_ID).downloadAsync();
        if (!asset.localUri) throw new Error("glossary-asset-local-uri-unavailable");
        if (disposed) return;

        const sourceFile = toPackFile(new File(asset.localUri));
        const destinationFile = toPackFile(
          new File(SQLite.defaultDatabaseDirectory, GLOSSARY_PACK_DATABASE_NAME),
        );
        const stagingFile = toPackFile(
          new File(SQLite.defaultDatabaseDirectory, GLOSSARY_PACK_STAGING_NAME),
        );

        const result = await provisionGlossaryPack({
          sourceFile,
          destinationFile,
          stagingFile,
          expectedSha256: EXPECTED_SYNTHETIC_PACK_SHA256,
          openDatabase: (name) => {
            if (!ALLOWED_DATABASE_NAMES.has(name)) {
              return Promise.reject(new Error("invalid-glossary-database-name"));
            }
            return SQLite.openDatabaseAsync(
              name,
              { useNewConnection: true },
              SQLite.defaultDatabaseDirectory,
            );
          },
        });
        unownedDatabase = result.database;
        if (disposed) return;

        const nextRepository = await createGlossaryRepository(result.database);
        repository = nextRepository;
        unownedDatabase = null;
        if (disposed) {
          await nextRepository.close();
          repository = null;
          return;
        }

        setValue({ status: "ready", repository: nextRepository, error: null });
      } catch (cause) {
        const error = cause instanceof Error ? cause : new Error("glossary-initialization-failed");
        if (!disposed) setValue({ status: "error", repository: null, error });
      } finally {
        if (unownedDatabase) {
          try {
            await unownedDatabase.closeAsync();
          } catch {
            // Preserve the initialization error; teardown is best-effort.
          }
          unownedDatabase = null;
        }
      }
    }

    void initialise();
    return () => {
      disposed = true;
      if (repository) {
        void repository.close().catch(() => undefined);
        repository = null;
      }
    };
  }, []);

  return <GlossaryContext.Provider value={value}>{children}</GlossaryContext.Provider>;
}
