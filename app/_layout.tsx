import { ThemeProvider } from "@/src/context/ThemeContext";
import { useTheme } from "@/src/hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const queryClient = new QueryClient();

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
          options={{ title: "", headerBackTitle: "Volver" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LayoutWithTheme />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
