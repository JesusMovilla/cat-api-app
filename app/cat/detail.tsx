import ProgressBar from "@/src/components/general/ProgressBar";
import { catEndpoints } from "@/src/domain/catEndpoints";
import { useTheme } from "@/src/hooks/useTheme";
import { getFlagEmoji } from "@/src/lib/utils";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CatDetailParams = {
  catId: string;
  catName: string;
  catImage: string;
};

export default function CatDetail() {
  const { catId, catName, catImage } = useLocalSearchParams<CatDetailParams>();
  const { theme } = useTheme();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: catName });
  }, []);

  const { data: catBreedInfo } = useQuery({
    queryKey: ["catBreedDetail", catId],
    queryFn: () => getBreedDetail(),
  });

  const catImageUrl = useMemo(() => {
    if (Boolean(catImage)) return catImage;
    return require("@/assets/images/cat-not-found.png");
  }, [catImage]);

  const getBreedDetail = async () => {
    const response = await catEndpoints.getCatBreedDetail(catId);
    return response.data;
  };

  const goToWikipedia = () => {
    Linking.openURL(catBreedInfo?.wikipedia_url || "");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Image source={catImageUrl} style={{ flex: 1 }} />

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          bounces={false}
          indicatorStyle={theme.scrollBar}
          contentContainerStyle={styles.scrollContent}
        >
          <View
            style={[
              styles.titleCard,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.title, { color: theme.textTitle }]}
            >
              {catBreedInfo?.name}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MCIcon
                size={35}
                color={theme.textTitle}
                name="map-marker-radius"
                style={{ marginRight: 5 }}
              />
              <View>
                <Text style={{ fontSize: 13, color: theme.textPrimary }}>
                  País de Origen
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 16, color: theme.textPrimary }}
                >
                  {getFlagEmoji(catBreedInfo?.country_code || "")}{" "}
                  {catBreedInfo?.origin}
                </Text>
              </View>
            </View>

            {catBreedInfo?.wikipedia_url && (
              <TouchableOpacity
                onPress={goToWikipedia}
                style={[
                  styles.buttonContainer,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <FontAwesome6
                  size={16}
                  name="wikipedia-w"
                  color={theme.textTitle}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={[
              styles.descriptionContainer,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Text style={{ color: theme.textPrimary }}>
              {catBreedInfo?.description}
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <Text style={[styles.subtitle, { color: theme.textTitle }]}>
              Características
            </Text>

            <View style={{ flexDirection: "row", gap: 20 }}>
              <ProgressBar
                total={5}
                color={theme.textTitle}
                label="Inteligencia"
                progress={catBreedInfo?.intelligence || 0}
              />

              <ProgressBar
                total={5}
                label="Afecto"
                color={theme.cardAccent}
                progress={catBreedInfo?.affection_level || 0}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 20 }}>
              <ProgressBar
                total={5}
                color={theme.cardAccent}
                label="Amistosos con niños"
                progress={catBreedInfo?.child_friendly || 0}
              />

              <ProgressBar
                total={5}
                color={theme.textTitle}
                label="Amistoso con perros"
                progress={catBreedInfo?.dog_friendly || 0}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 20 }}>
              <ProgressBar
                total={5}
                color={theme.textTitle}
                label="Adaptabilidad"
                progress={catBreedInfo?.adaptability || 0}
              />

              <ProgressBar
                total={5}
                color={theme.cardAccent}
                label="Problemas de salud"
                progress={catBreedInfo?.health_issues || 0}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 20 }}>
              <ProgressBar
                total={5}
                color={theme.cardAccent}
                label="Propenso a alergias"
                progress={catBreedInfo?.hypoallergenic || 0}
              />

              <ProgressBar
                total={5}
                color={theme.textTitle}
                label="Nivel de energía"
                progress={catBreedInfo?.energy_level || 0}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -20,
    borderRadius: 20,
  },
  scrollContent: {
    gap: 15,
    padding: 20,
    paddingBottom: 25,
  },
  titleCard: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  descriptionContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
