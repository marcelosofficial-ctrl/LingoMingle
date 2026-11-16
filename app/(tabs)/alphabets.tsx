import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { HIRAGANA, HIRAGANA_ROWS, type HiraganaCharacter, type HiraganaRowId } from "../../src/features/kana/hiragana";
import { KATAKANA, KATAKANA_ROWS } from "../../src/features/kana/katakana";
import {
  buildHiraganaPracticeResult,
  buildHiraganaQuestion,
  getHiraganaRetryCharacters,
  getNextHiraganaQuestionIndex,
  isCorrectHiraganaAnswer,
  type HiraganaPracticeAttempt
} from "../../src/features/kana/hiraganaPractice";
import { colors } from "../../src/theme/tokens";
import KatakanaPractice from "../../src/features/kana/KatakanaPractice";

type KanaScript = "hiragana" | "katakana";

export default function AlphabetsScreen() {
  const [selectedId, setSelectedId] = useState("hiragana-a");
  const [script, setScript] = useState<KanaScript>("hiragana");
  const [practiceRow, setPracticeRow] = useState<HiraganaRowId>("vowels");
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<HiraganaPracticeAttempt[]>([]);
  const [roundCharacters, setRoundCharacters] = useState<readonly HiraganaCharacter[] | null>(null);
  const activeCharacters = script === "hiragana" ? HIRAGANA : KATAKANA;
  const activeRows = script === "hiragana" ? HIRAGANA_ROWS : KATAKANA_ROWS;
  const selected = activeCharacters.find((character) => character.id === selectedId) ?? activeCharacters[0]!;
  const question = practiceStarted && !practiceComplete
    ? buildHiraganaQuestion(practiceRow, questionIndex, HIRAGANA, roundCharacters ?? undefined)
    : null;
  const practiceRows = HIRAGANA_ROWS.filter((row) => HIRAGANA.filter((character) => character.row === row.id).length >= 3);
  const result = buildHiraganaPracticeResult(attempts);
  const freshRowCharacters = HIRAGANA.filter((character) => character.row === practiceRow);

  function switchScript(nextScript: KanaScript) {
    if (nextScript === script) return;
    const nextCharacters = nextScript === "hiragana" ? HIRAGANA : KATAKANA;
    const nextSelected = nextCharacters.find((character) =>
      character.rowIndex === selected.rowIndex && character.columnIndex === selected.columnIndex
    ) ?? nextCharacters[0]!;
    setSelectedId(nextSelected.id);
    setScript(nextScript);
  }

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
      accessibilityLabel={script === "hiragana" ? "Hiragana character lessons" : "Katakana character lessons"}
    >
      <Text style={{ color: colors.ink, fontSize: 30, fontWeight: "700" }}>{script === "hiragana" ? "Hiragana" : "Katakana"}</Text>
      <Text style={{ color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 8 }}>
        Explore the 46 basic characters. Select one to see its sound.
      </Text>
      <View accessibilityLabel="Choose writing system" style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
        {(["hiragana", "katakana"] as const).map((option) => {
          const active = script === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityLabel={option === "hiragana" ? "Hiragana chart" : "Katakana chart"}
              accessibilityState={{ selected: active }}
              onPress={() => switchScript(option)}
              style={{ backgroundColor: active ? colors.accent : colors.surface, borderColor: active ? colors.accent : colors.line, borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10 }}
            >
              <Text style={{ color: active ? colors.surface : colors.ink, fontSize: 14, fontWeight: "700" }}>
                {option === "hiragana" ? "Hiragana" : "Katakana"}
              </Text>
            </Pressable>
          );
        })}
      </View>

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

      {activeRows.map((row) => {
        const characters = activeCharacters.filter((character) => character.row === row.id);
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
        Reading note: {script === "hiragana" ? "を is shown as “wo” and ん as “n”." : "ヲ is shown as “wo” and ン as “n”."}
      </Text>

      <View style={{ display: script === "katakana" ? "flex" : "none" }}><KatakanaPractice /></View>

      {script === "hiragana" ? (
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
      ) : null}
    </ScrollView>
  );
}
