import { Text, View } from "react-native";
import { colors } from "../../src/theme/tokens";

export default function YouScreen() {
  return <View style={{ flex: 1, padding: 28, backgroundColor: colors.canvas, justifyContent: "center" }}>
    <Text style={{ color: colors.ink, fontSize: 30, fontWeight: "700" }}>Your learning</Text>
    <Text style={{ color: colors.muted, fontSize: 16, marginTop: 10 }}>Your saved words, practice history, preferences, and progress will live here.</Text>
  </View>;
}