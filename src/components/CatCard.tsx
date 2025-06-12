import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { CatBreed } from "../interfaces/cat";
import { getFlagEmoji } from "../lib/utils";
import cardStyles from "../styles/card.styles";

interface CatCardProps {
  cat: CatBreed;
}

export default function CatCard(props: CatCardProps) {
  const { cat } = props;
  const { theme } = useTheme();
  const { push } = useRouter();

  const catImageUrl = useMemo(() => {
    const { image } = cat;
    if (Boolean(image) && Boolean(image?.url)) return image?.url;
    return require("@/assets/images/cat-not-found.png");
  }, [cat]);

  const navigateToCatDetail = () => {
    const { id, name, image = { url: "" } } = cat;

    push({
      pathname: "/cat/detail",
      params: { catId: id, catName: name, catImage: image.url },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={navigateToCatDetail}
      style={[
        styles.card,
        cardStyles.shadow,
        { backgroundColor: theme.cardBackground },
      ]}
    >
      <Image contentFit="cover" source={catImageUrl} style={styles.image} />

      <View style={styles.container}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: theme.textTitle }]}
        >
          {cat.name}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MCIcon
            size={15}
            color={theme.textTitle}
            name="map-marker-radius"
            style={{ marginRight: 5 }}
          />
          <Text numberOfLines={1}>{getFlagEmoji(cat.country_code)}</Text>
          <Text
            numberOfLines={1}
            style={{ flex: 1, fontSize: 13, color: theme.textPrimary }}
          >
            {" "}
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
    borderRadius: 20,
    marginVertical: 10,
  },
  container: {
    gap: 5,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
