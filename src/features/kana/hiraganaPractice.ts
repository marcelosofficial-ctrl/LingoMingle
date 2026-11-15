import { HIRAGANA, type HiraganaCharacter, type HiraganaRowId } from "./hiragana";

export type HiraganaQuestion = {
  readonly prompt: HiraganaCharacter;
  readonly choices: readonly HiraganaCharacter[];
  readonly correctRomaji: string;
  readonly questionIndex: number;
  readonly roundLength: number;
};

export function buildHiraganaQuestion(
  row: HiraganaRowId,
  questionIndex: number,
  characters: readonly HiraganaCharacter[] = HIRAGANA
): HiraganaQuestion {
  const rowCharacters = characters.filter((character) => character.row === row);
  if (rowCharacters.length < 2) {
    throw new Error("A practice row must contain at least two characters.");
  }
  if (!Number.isInteger(questionIndex) || questionIndex < 0) {
    throw new Error("Question index must be a non-negative integer.");
  }

  const prompt = rowCharacters[questionIndex % rowCharacters.length]!;
  const choiceCount = Math.min(4, rowCharacters.length);
  const orderedChoices = Array.from({ length: choiceCount }, (_, offset) =>
    rowCharacters[(questionIndex + offset) % rowCharacters.length]!
  );
  const rotation = questionIndex % choiceCount;
  const choices = [...orderedChoices.slice(rotation), ...orderedChoices.slice(0, rotation)];

  return {
    prompt,
    choices,
    correctRomaji: prompt.romaji,
    questionIndex,
    roundLength: rowCharacters.length
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
