import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { HIRAGANA, HIRAGANA_ROWS, type HiraganaCharacter, type HiraganaRowId } from "../../src/features/kana/hiragana";
import {
  buildHiraganaPracticeResult,
  buildHiraganaQuestion,
  getHiraganaRetryCharacters,
  getNextHiraganaQuestionIndex,
  isCorrectHiraganaAnswer,
  type HiraganaPracticeAttempt
} from "../../src/features/kana/hiraganaPractice";
import { colors } from "../../src/theme/tokens";

export default function AlphabetsScreen() {
  const [selectedId, setSelectedId] = useState("hiragana-a");
  const [practiceRow, setPracticeRow] = useState<HiraganaRowId>("vowels");
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<HiraganaPracticeAttempt[]>([]);
  const [roundCharacters, setRoundCharacters] = useState<readonly HiraganaCharacter[] | null>(null);
  const selected = HIRAGANA.find((character) => character.id === selectedId) ?? HIRAGANA[0]!;
  const question = practiceStarted && !practiceComplete
    ? buildHiraganaQuestion(practiceRow, questionIndex, HIRAGANA, roundCharacters ?? undefined)
    : null;
  const practiceRows = HIRAGANA_ROWS.filter((row) => HIRAGANA.filter((character) => character.row === row.id).length >= 3);
  const result = buildHiraganaPracticeResult(attempts);
  const freshRowCharacters = HIRAGANA.filter((character) => character.row === practiceRow);

  function startPractice(characters?: readonly HiraganaCharacter[]) {
    setQuestionIndex(0);
    setAnswer(null);
    setAttempts([]);
    setRoundCharacters(characters ?? null);
    setPracticeComplete(false);
    setPracticeStarted(true);
  }

  function advancePractice() {
    const nextIndex = getNextHiraganaQuestionIndex(questionIndex, question?.roundLength ?? 0);
    setAnswer(null);
    if (nextIndex === null) {
      setPracticeComplete(true);
    } else {
      setQuestionIndex(nextIndex);
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.canvas }}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 40 }}
      accessibilityLabel="Hiragana character lessons"
    >
      <Text style={{ color: colors.ink, fontSize: 30, fontWeight: "700" }}>Hiragana</Text>
      <Text style={{ color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 8 }}>
        Explore the 46 basic characters. Select one to see its sound.
      </Text>

      <View
        accessibilityLabel={`Selected character ${selected.kana}, ${selected.romaji}`}
        style={{
          alignItems: "center",
          backgroundColor: colors.surface,
          borderColor: colors.line,
          borderRadius: 20,
          borderWidth: 1,
          marginTop: 22,
          marginBottom: 26,
          paddingVertical: 18
        }}
      >
        <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600", letterSpacing: 1.2 }}>
          SELECTED CHARACTER
        </Text>
        <Text accessibilityLabel={selected.kana} style={{ color: colors.ink, fontSize: 64, lineHeight: 82, marginTop: 2 }}>
          {selected.kana}
        </Text>
        <Text style={{ color: colors.accent, fontSize: 22, fontWeight: "700", marginTop: 2 }}>
          {selected.romaji}
        </Text>
      </View>

      {HIRAGANA_ROWS.map((row) => {
        const characters = HIRAGANA.filter((character) => character.row === row.id);
        return (
          <View key={row.id} style={{ marginBottom: 18 }}>
            <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 9 }}>
              {row.label.toUpperCase()}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {characters.map((character) => {
                const isSelected = character.id === selected.id;
                return (
                  <Pressable
                    key={character.id}
                    accessibilityRole="button"
                    accessibilityLabel={`${character.kana}, ${character.romaji}`}
                    accessibilityHint="Shows this character in the detail panel"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedId(character.id)}
                    style={{
                      alignItems: "center",
                      aspectRatio: 1,
                      backgroundColor: isSelected ? colors.accent : colors.surface,
                      borderColor: isSelected ? colors.accent : colors.line,
                      borderRadius: 14,
                      borderWidth: 1,
                      justifyContent: "center",
                      maxWidth: 64,
                      minWidth: 44,
                      width: "18%"
                    }}
                  >
                    <Text style={{ color: isSelected ? colors.surface : colors.ink, fontSize: 25, fontWeight: "600" }}>
                      {character.kana}
                    </Text>
                    <Text style={{ color: isSelected ? colors.surface : colors.muted, fontSize: 10, marginTop: 1 }}>
                      {character.romaji}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      <Text style={{ color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 2 }}>
        Reading note: を is shown as “wo” and ん as “n” in this learning chart.
      </Text>

      <View style={{ borderTopColor: colors.line, borderTopWidth: 1, marginTop: 28, paddingTop: 24 }}>
        <Text style={{ color: colors.ink, fontSize: 23, fontWeight: "700" }}>Quick practice</Text>
        <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 6 }}>
          Choose a row, then match each character to its romaji.
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {practiceRows.map((row) => {
            const active = practiceRow === row.id;
            return (
              <Pressable
                key={row.id}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => {
                  setPracticeRow(row.id);
                  setPracticeStarted(false);
                  setPracticeComplete(false);
                  setQuestionIndex(0);
                  setAnswer(null);
                  setAttempts([]);
                  setRoundCharacters(null);
                }}
                style={{
                  backgroundColor: active ? colors.accent : colors.surface,
                  borderColor: active ? colors.accent : colors.line,
                  borderRadius: 12,
                  borderWidth: 1,
                  paddingHorizontal: 12,
                  paddingVertical: 9
                }}
              >
                <Text style={{ color: active ? colors.surface : colors.ink, fontSize: 13, fontWeight: "600" }}>
                  {row.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {!practiceStarted || practiceComplete ? (
          <View style={{ marginTop: 16 }}>
            {practiceComplete ? (
              <View accessibilityLiveRegion="polite" style={{ marginBottom: 14 }}>
                <Text style={{ color: colors.accent, fontSize: 19, fontWeight: "700" }}>
                  {result.correct} / {result.total} correct
                </Text>
                {result.missedCharacters.length > 0 ? (
                  <>
                    <Text style={{ color: colors.muted, fontSize: 13, marginTop: 8 }}>
                      Review these characters:
                    </Text>
                    <Text style={{ color: colors.ink, fontSize: 16, lineHeight: 25, marginTop: 4 }}>
                      {result.missedCharacters.map((character) => `${character.kana} (${character.romaji})`).join(" · ")}
                    </Text>
                  </>
                ) : (
                  <Text style={{ color: colors.muted, fontSize: 13, marginTop: 8 }}>
                    Perfect round. Try a fresh round to keep practising.
                  </Text>
                )}
              </View>
            ) : null}
            <Pressable
              accessibilityRole="button"
              onPress={() => startPractice(
                practiceComplete
                  ? getHiraganaRetryCharacters(result.missedCharacters, freshRowCharacters)
                  : undefined
              )}
              style={{ alignItems: "center", backgroundColor: colors.accent, borderRadius: 14, padding: 15 }}
            >
              <Text style={{ color: colors.surface, fontSize: 15, fontWeight: "700" }}>
                {practiceComplete
                  ? result.missedCharacters.length > 0 ? `Retry missed (${result.missedCharacters.length})` : "Start fresh round"
                  : "Start practice"}
              </Text>
            </Pressable>
          </View>
        ) : question ? (
          <View style={{ marginTop: 18 }}>
            <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600" }}>
              QUESTION {questionIndex + 1} OF {question.roundLength}
            </Text>
            <View style={{ alignItems: "center", backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 18, borderWidth: 1, marginTop: 10, padding: 18 }}>
              <Text style={{ color: colors.ink, fontSize: 56, lineHeight: 70 }}>{question.prompt.kana}</Text>
              <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>Which romaji matches?</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 14 }}>
              {question.choices.map((choice) => {
                const chosen = answer === choice.romaji;
                const correct = choice.romaji === question.correctRomaji;
                return (
                  <Pressable
                    key={choice.id}
                    accessibilityRole="button"
                    accessibilityLabel={choice.romaji}
                    accessibilityState={{ selected: chosen, disabled: answer !== null }}
                    disabled={answer !== null}
                    onPress={() => {
                      const isCorrect = isCorrectHiraganaAnswer(question, choice.romaji);
                      setAnswer(choice.romaji);
                      setAttempts((current) => [...current, { character: question.prompt, correct: isCorrect }]);
                    }}
                    style={{
                      alignItems: "center",
                      backgroundColor: answer !== null && correct ? colors.accent : colors.surface,
                      borderColor: chosen ? colors.accent : colors.line,
                      borderRadius: 13,
                      borderWidth: chosen ? 2 : 1,
                      flexGrow: 1,
                      minWidth: "21%",
                      paddingVertical: 15
                    }}
                  >
                    <Text style={{ color: answer !== null && correct ? colors.surface : colors.ink, fontSize: 17, fontWeight: "700" }}>
                      {choice.romaji}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {answer !== null ? (
              <View style={{ marginTop: 14 }}>
                <Text accessibilityLiveRegion="polite" style={{ color: isCorrectHiraganaAnswer(question, answer) ? colors.accent : colors.ink, fontSize: 15, fontWeight: "700" }}>
                  {isCorrectHiraganaAnswer(question, answer) ? "Correct!" : `Not quite — ${question.prompt.kana} is ${question.correctRomaji}.`}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={advancePractice}
                  style={{ alignItems: "center", backgroundColor: colors.accent, borderRadius: 14, marginTop: 12, padding: 15 }}
                >
                  <Text style={{ color: colors.surface, fontSize: 15, fontWeight: "700" }}>
                    {questionIndex + 1 === question.roundLength ? "Finish round" : "Next question"}
                  </Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
