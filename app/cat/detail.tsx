import BaseCarousel from "@/src/components/general/ImageCarousel";
import { catEndpoints } from "@/src/domain/catEndpoints";
import { useTheme } from "@/src/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CatDetailParams = {
  catId: string;
};

export default function CatDetail() {
  const { catId } = useLocalSearchParams<CatDetailParams>();
  const { toggleTheme, theme } = useTheme();

  const {} = useQuery({
    queryKey: ["catBreedDetail", catId],
    queryFn: () => getBreedDetail(),
  });

  const { data: catImages = [] } = useQuery({
    queryKey: ["catBreedDetailImages", catId],
    queryFn: () => getCatBreedImages(),
  });

  const getBreedDetail = async () => {
    const response = await catEndpoints.getCatBreedDetail(catId);
    // console.log(response.data);
    return response.data;
  };

  const getCatBreedImages = async () => {
    const response = await catEndpoints.getCatBreedImages({
      limit: 3,
      breed_ids: catId,
    });
    // console.log("response", response);
    console.log(response.data[0]);
    return response.data.map((item) => item.url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <BaseCarousel data={catImages} style={{ flex: 0.5 }} />
      <Text onPress={() => toggleTheme()} style={{ color: theme.text }}>
        {catId}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 2,
  },
});
