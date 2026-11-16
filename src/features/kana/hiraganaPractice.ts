import { HIRAGANA, type HiraganaCharacter, type HiraganaRowId } from "./hiragana";

export type HiraganaQuestion = {
  readonly prompt: HiraganaCharacter;
  readonly choices: readonly HiraganaCharacter[];
  readonly correctRomaji: string;
  readonly questionIndex: number;
  readonly roundLength: number;
};

export type HiraganaPracticeAttempt = {
  readonly character: HiraganaCharacter;
  readonly correct: boolean;
};

export type HiraganaPracticeResult = {
  readonly correct: number;
  readonly total: number;
  readonly missedCharacters: readonly HiraganaCharacter[];
};

function matchesCharacter(left: HiraganaCharacter, right: HiraganaCharacter): boolean {
  return left.id === right.id &&
    left.kana === right.kana &&
    left.romaji === right.romaji &&
    left.row === right.row &&
    left.column === right.column;
}

export function buildHiraganaQuestion(
  row: HiraganaRowId,
  questionIndex: number,
  characters: readonly HiraganaCharacter[] = HIRAGANA,
  roundCharacters?: readonly HiraganaCharacter[]
): HiraganaQuestion {
  const rowCharacters = characters.filter((character) => character.row === row);
  if (rowCharacters.length < 2) {
    throw new Error("A practice row must contain at least two characters.");
  }
  if (!Number.isInteger(questionIndex) || questionIndex < 0) {
    throw new Error("Question index must be a non-negative integer.");
  }

  const rowById = new Map(rowCharacters.map((character) => [character.id, character]));
  const supplied = roundCharacters ?? rowCharacters;
  if (
    supplied.length === 0 ||
    new Set(supplied.map((character) => character.id)).size !== supplied.length
  ) {
    throw new Error("Retry characters must be unique members of the selected row.");
  }
  const promptPool = supplied.map((character) => {
    const canonical = rowById.get(character.id);
    if (!canonical || !matchesCharacter(character, canonical)) {
      throw new Error("Retry characters must match canonical members of the selected row.");
    }
    return canonical;
  });

  const prompt = promptPool[questionIndex % promptPool.length]!;
  const choiceCount = Math.min(4, rowCharacters.length);
  const isRetryRound = roundCharacters !== undefined && promptPool.length < rowCharacters.length;
  let choices: HiraganaCharacter[];
  if (isRetryRound) {
    choices = [
      prompt,
      ...rowCharacters.filter((character) => character.id !== prompt.id).slice(0, choiceCount - 1)
    ];
  } else {
    const orderedChoices = Array.from({ length: choiceCount }, (_, offset) =>
      rowCharacters[(questionIndex + offset) % rowCharacters.length]!
    );
    const rotation = questionIndex % choiceCount;
    choices = [...orderedChoices.slice(rotation), ...orderedChoices.slice(0, rotation)];
  }

  return {
    prompt,
    choices,
    correctRomaji: prompt.romaji,
    questionIndex,
    roundLength: promptPool.length
  };
}

export function isCorrectHiraganaAnswer(question: HiraganaQuestion, answer: string): boolean {
  return answer === question.correctRomaji;
}

export function getNextHiraganaQuestionIndex(currentIndex: number, roundLength: number): number | null {
  if (!Number.isInteger(currentIndex) || !Number.isInteger(roundLength) || currentIndex < 0 || roundLength < 1) {
    throw new Error("Round progress values must be valid non-negative integers.");
  }
  return currentIndex + 1 < roundLength ? currentIndex + 1 : null;
}

export function buildHiraganaPracticeResult(
  attempts: readonly HiraganaPracticeAttempt[]
): HiraganaPracticeResult {
  const canonicalById = new Map(HIRAGANA.map((character) => [character.id, character]));
  const missedCharacters = new Map<string, HiraganaCharacter>();
  let correct = 0;
  for (const attempt of attempts) {
    if (typeof attempt.correct !== "boolean") {
      throw new Error("Practice attempts must contain a boolean result.");
    }
    const canonical = canonicalById.get(attempt.character.id);
    if (!canonical || !matchesCharacter(attempt.character, canonical)) {
      throw new Error("Practice attempts must reference canonical hiragana characters.");
    }
    if (attempt.correct) {
      correct += 1;
    } else if (!missedCharacters.has(canonical.id)) {
      missedCharacters.set(canonical.id, canonical);
    }
  }
  return {
    correct,
    total: attempts.length,
    missedCharacters: [...missedCharacters.values()]
  };
}

export function getHiraganaRetryCharacters(
  missedCharacters: readonly HiraganaCharacter[],
  freshCharacters: readonly HiraganaCharacter[]
): readonly HiraganaCharacter[] {
  const source = missedCharacters.length > 0 ? missedCharacters : freshCharacters;
  const canonicalById = new Map(HIRAGANA.map((character) => [character.id, character]));
  const unique = new Map<string, HiraganaCharacter>();
  for (const character of source) {
    const canonical = canonicalById.get(character.id);
    if (!canonical || !matchesCharacter(character, canonical)) {
      throw new Error("Retry selection must use canonical hiragana characters.");
    }
    if (!unique.has(canonical.id)) unique.set(canonical.id, canonical);
  }
  return [...unique.values()];
}
