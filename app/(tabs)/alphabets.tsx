import { Text, View } from "react-native";
import { colors } from "../../src/theme/tokens";

export default function AlphabetsScreen() {
  return <View style={{ flex: 1, padding: 28, backgroundColor: colors.canvas, justifyContent: "center" }}>
    <Text style={{ color: colors.ink, fontSize: 30, fontWeight: "700" }}>Alphabets</Text>
    <Text style={{ color: colors.muted, fontSize: 16, marginTop: 10 }}>Start with hiragana. Learn each character through its sound, shape, and a visual memory hook.</Text>
    <Text style={{ color: colors.ink, fontSize: 54, marginTop: 28 }}>あ　い　う　え　お</Text>
    <Text style={{ color: colors.muted, marginTop: 8 }}>Japanese · Hiragana</Text>
  </View>;
}