import { ThemeProvider } from "@/src/context/ThemeContext";
import { useTheme } from "@/src/hooks/useTheme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

function LayoutWithTheme() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar barStyle={theme.statusBar} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Inicio" }} />
        <Stack.Screen
          name="cat/detail"
          options={{ title: "Detalle", headerBackTitle: "Volver" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutWithTheme />
    </ThemeProvider>
  );
}
