import EntypoIcon from "@expo/vector-icons/Entypo";
import FAIcon from "@expo/vector-icons/FontAwesome6";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { CatBreed } from "../interfaces/cat";
import { getFlagEmoji } from "../lib/utils";

interface CatCardProps {
  cat: CatBreed;
}

export default function CatCard(props: CatCardProps) {
  const { cat } = props;
  const { theme } = useTheme();
  const { push } = useRouter();

  const navigateToCatDetail = () => {
    push({ pathname: "/cat/detail", params: { catId: cat.id } });
  };

  const catImageUrl = useMemo(() => {
    const { image } = cat;
    if (Boolean(image) && Boolean(image?.url)) return image?.url;
    return require("@/assets/images/cat-not-found.png");
  }, [cat]);

  return (
    <TouchableOpacity
      onPress={navigateToCatDetail}
      activeOpacity={0.5}
      style={[styles.card, { backgroundColor: theme.card }]}
    >
      <Image contentFit="cover" source={catImageUrl} style={styles.image} />
      <View style={styles.container}>
        <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
          {cat.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MCIcon
            size={15}
            color="black"
            name="map-marker-radius"
            style={{ marginRight: 5 }}
          />
          <Text numberOfLines={1}>{getFlagEmoji(cat.country_code)}</Text>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: 13 }}>
            {cat.origin}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 10,
    marginVertical: 10,
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
  },
  container: {
    gap: 5,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // borderRadius: 10,
    // borderWidth: 2,
  },
  title: {
    // textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
