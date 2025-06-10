import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import { Platform, Text, View } from "react-native";

export default function Index() {
  const { push } = useRouter();

  const navigteToCatDetail = () => {
    push({ pathname: "/cat/detail", params: { catId: "abys" } });
  };

  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}

      <View
        style={{
          padding: 10,
          backgroundColor: theme.card,
          borderRadius: 10,
          ...Platform.select({
            ios: {
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowOffset: {
                height: 2,
                width: 0,
              },
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        <Text onPress={navigteToCatDetail} style={{ color: theme.text }}>
          Hola
        </Text>
      </View>
    </View>
  );
}
