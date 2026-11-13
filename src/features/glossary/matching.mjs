function normalize(value) {
  return value.normalize("NFKC").trim().toLowerCase();
}

/**
 * Deterministic dictionary lookup only. Transliteration, morphology and
 * context ranking are separate adapters and are intentionally not performed here.
 */
export function lookupGlosses(entries, key) {
  const surface = normalize(key.surfaceForm);
  if (!surface) return [];

  const matches = [];
  for (const entry of entries) {
    if (entry.language !== key.language) continue;

    const exactForm = entry.surfaceForms.find((form) => normalize(form) === surface);
    if (exactForm) {
      matches.push({ entry, matchedBy: "surface", matchedForm: exactForm });
      continue;
    }

    if (key.language === "ja") {
      if (!key.reading || !entry.reading || normalize(entry.reading) !== normalize(key.reading)) {
        continue;
      }
      if (key.lemma && normalize(entry.lemma) !== normalize(key.lemma)) continue;
      matches.push({
        entry,
        matchedBy: key.lemma ? "lemma-reading" : "reading",
        matchedForm: entry.reading,
      });
      continue;
    }

    if (!key.lemma || !key.partOfSpeech) continue;
    if (normalize(entry.lemma) !== normalize(key.lemma)) continue;
    if (entry.partOfSpeech !== key.partOfSpeech) continue;
    matches.push({ entry, matchedBy: "lemma-pos", matchedForm: entry.lemma });
  }

  return matches.sort((left, right) => {
    const priorityOrder = left.entry.priority - right.entry.priority;
    if (priorityOrder !== 0) return priorityOrder;
    if (left.entry.id < right.entry.id) return -1;
    if (left.entry.id > right.entry.id) return 1;
    return 0;
  });
}
