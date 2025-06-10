import { StatusBarStyle } from "react-native";

export type ThemeType = {
  background: string;
  text: string;
  primary: string;
  card: string;
  statusBar: StatusBarStyle;
};

export const lightTheme: ThemeType = {
  background: "#FFFFFF",
  text: "#111111",
  primary: "#2e78b7",
  card: "#f2f2f2",
  statusBar: "dark-content",
};

export const darkTheme: ThemeType = {
  background: "#000000",
  text: "#FFFFFF",
  primary: "#2e78b7",
  card: "#1c1c1c",
  statusBar: "light-content",
};
