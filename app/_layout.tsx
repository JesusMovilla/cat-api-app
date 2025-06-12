import { ThemeProvider } from "@/src/context/ThemeContext";
import { useTheme } from "@/src/hooks/useTheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";

const queryClient = new QueryClient();

SplashScreen.setOptions({ duration: 1500, fade: true });

function LayoutWithTheme() {
  const { mode, theme, toggleTheme } = useTheme();

  const iconName = mode === "light" ? "dark-mode" : "light-mode";

  return (
    <>
      <StatusBar barStyle={theme.statusBar} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.cardBackground },
          headerRight() {
            return (
              <MaterialIcons
                size={20}
                name={iconName}
                color={theme.textPrimary}
                onPress={toggleTheme}
                style={{ marginRight: 5 }}
              />
            );
          },
          headerTintColor: theme.textPrimary,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Razas de Gatos" }} />
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
