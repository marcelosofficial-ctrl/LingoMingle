import type { GlossEntry } from "./types.js";

export type NiklNormalizeResult =
  | { status: "accepted"; entry: GlossEntry }
  | { status: "skipped"; reason: "non-word" | "incomplete-english" }
  | {
      status: "rejected";
      reason:
        | "invalid-entry"
        | "duplicate-entry-id"
        | "invalid-entry-metadata"
        | "invalid-lemma"
        | "missing-senses"
        | "invalid-sense"
        | "duplicate-sense-order"
        | "duplicate-english-equivalent"
        | "invalid-english-translation";
    };

export function normalizeNiklEntry(record: unknown): NiklNormalizeResult;

/**
 * Create one normalizer per import stream. Duplicate word-entry IDs are rejected;
 * the caller must abort the data-pack build if any duplicate is reported.
 */
export function createNiklEntryNormalizer(): (record: unknown) => NiklNormalizeResult;
