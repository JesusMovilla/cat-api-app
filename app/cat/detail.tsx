import BaseCarousel from "@/src/components/general/ImageCarousel";
import ProgressBar from "@/src/components/general/ProgressBar";
import { catEndpoints } from "@/src/domain/catEndpoints";
import { useTheme } from "@/src/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type CatDetailParams = {
  catId: string;
};

export default function CatDetail() {
  const { catId } = useLocalSearchParams<CatDetailParams>();
  const { toggleTheme, theme } = useTheme();
  const navigtion = useNavigation();

  const { data: catBreedInfo } = useQuery({
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
    console.log("first", response.data);
    navigtion.setOptions({ title: response.data.name });
    return response.data;
  };

  const getCatBreedImages = async () => {
    const response = await catEndpoints.getCatBreedImages({
      limit: 3,
      breed_ids: catId,
    });
    // console.log("response", response);
    // console.log(response.data[0]);
    return response.data.map((item) => item.url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BaseCarousel data={catImages} style={{ flex: 1 }} />
      <View style={styles.container}>
        {/* <Text style={{ color: theme.text }}>{catBreedInfo?.name}</Text> */}
        <ScrollView
          bounces={false}
          indicatorStyle="black"
          contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
        >
          <Text style={{ color: theme.text }}>{catBreedInfo?.description}</Text>

          <View>
            <Text style={{ fontSize: 13 }}>País de Origen </Text>
            <Text>{catBreedInfo?.origin}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 13 }}>Temperamento</Text>
            <Text>{catBreedInfo?.temperament}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 13 }}>Peso</Text>
            <Text>{JSON.stringify(catBreedInfo?.weight)}</Text>
          </View>

          <View>
            <ProgressBar
              label="Adaptabilidad"
              progress={catBreedInfo?.adaptability || 0}
              total={5}
            />

            <ProgressBar
              label="Afecto"
              progress={catBreedInfo?.affection_level || 0}
              total={5}
            />

            <ProgressBar
              label="Amistosos con niños"
              progress={catBreedInfo?.child_friendly || 0}
              total={5}
            />

            <ProgressBar
              label="Amistoso con perros"
              progress={catBreedInfo?.dog_friendly || 0}
              total={5}
            />

            <ProgressBar
              label="Nivel de energía"
              progress={catBreedInfo?.energy_level || 0}
              total={5}
            />

            <ProgressBar
              label="Experimental"
              progress={catBreedInfo?.experimental || 0}
              total={5}
            />

            <ProgressBar
              label="Aseo"
              progress={catBreedInfo?.grooming || 0}
              total={5}
            />

            <ProgressBar
              label="Pelaje"
              progress={catBreedInfo?.hairless || 0}
              total={5}
            />

            <ProgressBar
              label="Problemas de salud"
              progress={catBreedInfo?.health_issues || 0}
              total={5}
            />

            <ProgressBar
              label="Propenso a alergias"
              progress={catBreedInfo?.hypoallergenic || 0}
              total={5}
            />

            <ProgressBar
              label="Interior"
              progress={catBreedInfo?.indoor || 0}
              total={5}
            />

            <ProgressBar
              label="Inteligencia"
              progress={catBreedInfo?.intelligence || 0}
              total={5}
            />

            <ProgressBar
              label="Necesidades sociales"
              progress={catBreedInfo?.social_needs || 0}
              total={5}
            />

            <ProgressBar
              label="Amistoso con extraños"
              progress={catBreedInfo?.stranger_friendly || 0}
              total={5}
            />

            <ProgressBar
              label="Vocalización"
              progress={catBreedInfo?.vocalisation || 0}
              total={5}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 2,
  },
});
