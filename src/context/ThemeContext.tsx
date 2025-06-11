import React, { createContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, ThemeType } from "../theme/colors";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  mode: "light" | "dark";
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  mode: "light",
});

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  const systemScheme = "light";
  // const systemScheme = useColorScheme() || "light";
  const [mode, setMode] = useState<"light" | "dark">(systemScheme);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = mode === "light" ? lightTheme : darkTheme;

  const value = useMemo(() => ({ theme, toggleTheme, mode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
