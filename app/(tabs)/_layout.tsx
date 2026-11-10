import { Tabs } from "expo-router";
import { colors } from "../../src/theme/tokens";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.ink,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
      tabBarLabelStyle: { fontSize: 11, fontWeight: "600" }
    }}>
      <Tabs.Screen name="index" options={{ title: "Songs", tabBarLabel: "Songs" }} />
      <Tabs.Screen name="alphabets" options={{ title: "Alphabets", tabBarLabel: "Alphabets" }} />
      <Tabs.Screen name="review" options={{ title: "Review", tabBarLabel: "Review" }} />
      <Tabs.Screen name="you" options={{ title: "You", tabBarLabel: "You" }} />
    </Tabs>
  );
}