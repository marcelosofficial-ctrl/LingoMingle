import { Text, View } from "react-native";
import { colors } from "../../src/theme/tokens";

export default function ReviewScreen() {
  return <View style={{ flex: 1, padding: 28, backgroundColor: colors.canvas, justifyContent: "center" }}>
    <Text style={{ color: colors.ink, fontSize: 30, fontWeight: "700" }}>Review</Text>
    <Text style={{ color: colors.muted, fontSize: 16, marginTop: 10 }}>A calm daily review queue will bring back characters and words just before you forget them.</Text>
  </View>;
}