function normalize(value) {
  return value.normalize("NFKC").trim().toLowerCase();
}

function samePos(left, right) {
  return Boolean(left && right && left.scheme === right.scheme && left.tag === right.tag);
}

/**
 * Deterministic dictionary lookup only. Language-specific morphology,
 * transliteration, tokenization and context ranking belong to adapters.
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

    const analysis = key.analysis;
    if (!analysis || normalize(analysis.surfaceForm) !== surface) continue;

    if (key.language === "ja") {
      if (!entry.reading || normalize(entry.reading) !== normalize(analysis.reading)) {
        continue;
      }
      if (analysis.lemma && normalize(entry.lemma) !== normalize(analysis.lemma)) continue;
      if (analysis.partOfSpeech && entry.partOfSpeech &&
          !samePos(entry.partOfSpeech, analysis.partOfSpeech)) continue;
      matches.push({
        entry,
        matchedBy: analysis.lemma ? "lemma-reading" : "reading",
        matchedForm: entry.reading,
      });
      continue;
    }

    if (/\s/u.test(analysis.surfaceForm.trim())) continue;
    if (normalize(entry.lemma) !== normalize(analysis.lemma)) continue;
    if (!samePos(entry.partOfSpeech, analysis.partOfSpeech)) continue;
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
