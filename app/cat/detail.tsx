import { useTheme } from "@/src/hooks/useTheme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

type CatDetailParams = {
  catId: string;
};

export default function CatDetail() {
  const { catId } = useLocalSearchParams<CatDetailParams>();
  const { toggleTheme, theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text onPress={() => toggleTheme()} style={{ color: theme.text }}>
        {catId}
      </Text>
    </View>
  );
}
