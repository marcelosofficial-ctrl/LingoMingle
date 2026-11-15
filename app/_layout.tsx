import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GlossaryProvider } from "../src/features/glossary/GlossaryProvider";
import { colors } from "../src/theme/tokens";

export default function RootLayout() {
  return (
    <GlossaryProvider>
      <>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }} />
      </>
    </GlossaryProvider>
  );
}
