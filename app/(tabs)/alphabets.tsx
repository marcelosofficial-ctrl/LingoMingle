import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { HIRAGANA, HIRAGANA_ROWS } from "../../src/features/kana/hiragana";
import { colors } from "../../src/theme/tokens";

export default function AlphabetsScreen() {
  const [selectedId, setSelectedId] = useState("hiragana-a");
  const selected = HIRAGANA.find((character) => character.id === selectedId) ?? HIRAGANA[0]!;

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
    </ScrollView>
  );
}
