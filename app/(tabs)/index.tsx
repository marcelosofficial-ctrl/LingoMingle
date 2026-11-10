import { Text, View } from "react-native";
import { colors } from "../../src/theme/tokens";

export default function SongsScreen() {
  return <View style={{ flex: 1, padding: 28, justifyContent: "center", backgroundColor: colors.canvas }}>
    <Text style={{ color: colors.muted, fontSize: 13, fontWeight: "700", letterSpacing: 2 }}>LINGOMINGLE</Text>
    <Text style={{ color: colors.ink, fontSize: 34, fontWeight: "700", marginTop: 12 }}>Learn through what you love.</Text>
    <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 12 }}>Your songs and scenes will become language lessons. Add your first study text when you are ready.</Text>
  </View>;
}