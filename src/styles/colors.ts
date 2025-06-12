import { StatusBarStyle } from "react-native";

export type ThemeType = {
  background: string;
  textPrimary: string;
  textTitle: string;
  cardBackground: string;
  cardAccent: string;
  statusBar: StatusBarStyle;
  scrollBar: "white" | "black";
};

export const lightTheme: ThemeType = {
  background: "#FFFFFF",
  textPrimary: "#111111",
  textTitle: "#865785",
  cardBackground: "#FCECD5",
  cardAccent: "#E2AA5D",
  statusBar: "dark-content",
  scrollBar: "black",
};

export const darkTheme: ThemeType = {
  background: "#111111",
  textPrimary: "#FFFFFF",
  textTitle: "#a77ba0",
  cardBackground: "#211723",
  cardAccent: "#E2AA5D",
  statusBar: "light-content",
  scrollBar: "white",
};
