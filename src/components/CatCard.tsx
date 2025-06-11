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
    return require("@/assets/images/image-404.png");
  }, [cat]);

  return (
    <TouchableOpacity
      onPress={navigateToCatDetail}
      style={[styles.card, { backgroundColor: theme.card }]}
    >
      <View key={cat.id} style={styles.container}>
        <Image contentFit="cover" source={catImageUrl} style={styles.image} />
        <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
          {cat.name}
        </Text>
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
    gap: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
  },
});
