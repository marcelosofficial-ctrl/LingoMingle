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

  const promptPool = roundCharacters ?? rowCharacters;
  const validIds = new Set(rowCharacters.map((character) => character.id));
  if (
    promptPool.length === 0 ||
    new Set(promptPool.map((character) => character.id)).size !== promptPool.length ||
    promptPool.some((character) => !validIds.has(character.id))
  ) {
    throw new Error("Retry characters must be unique members of the selected row.");
  }

  const prompt = promptPool[questionIndex % promptPool.length]!;
  const choiceCount = Math.min(4, rowCharacters.length);
  let choices: HiraganaCharacter[];
  if (roundCharacters) {
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
  const missedCharacters = new Map<string, HiraganaCharacter>();
  let correct = 0;
  for (const attempt of attempts) {
    if (attempt.correct) {
      correct += 1;
    } else if (!missedCharacters.has(attempt.character.id)) {
      missedCharacters.set(attempt.character.id, attempt.character);
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
  const unique = new Map<string, HiraganaCharacter>();
  for (const character of source) {
    if (!unique.has(character.id)) unique.set(character.id, character);
  }
  return [...unique.values()];
}
