import CatCard from "@/src/components/CatCard";
import { catEndpoints } from "@/src/domain/catEndpoints";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useTheme } from "@/src/hooks/useTheme";
import inputStyles from "@/src/styles/input.styles";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const { theme, mode } = useTheme();

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText.trim(), 250);

  const { data: allCatBreeds = [] } = useQuery({
    queryKey: ["breeds"],
    queryFn: () => getCatBreeds(),
  });

  const { data: searchedCatBreeds = [] } = useQuery({
    queryKey: ["breeds/search", debouncedSearchText],
    queryFn: () => searchCatBreeds(),
  });

  const isLoading = useIsFetching();

  const getCatBreeds = async () => {
    const response = await catEndpoints.getCatBreeds();
    return response?.data || [];
  };

  const searchCatBreeds = async () => {
    const response = await catEndpoints.searchCatBreed({
      q: debouncedSearchText.trim(),
      attach_image: true,
    });
    return response.data;
  };

  const catBreeds = useMemo(() => {
    if (Boolean(searchText.trim())) return searchedCatBreeds;
    else return allCatBreeds;
  }, [searchText, allCatBreeds, searchedCatBreeds]);

  const inputColors = useMemo(() => {
    let colors = { background: theme.background };

    if (mode === "dark") colors = { background: theme.cardBackground };

    return colors;
  }, [theme]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TextInput
        value={searchText}
        placeholderTextColor={"gray"}
        style={[
          inputStyles.simpleInput,
          { backgroundColor: inputColors.background, color: theme.textPrimary },
        ]}
        placeholder="Buscar por raza"
        onChangeText={(text) => setSearchText(text)}
      />

      {isLoading > 0 && (
        <ActivityIndicator size={"large"} color={theme.textPrimary} />
      )}

      <FlatList
        numColumns={2}
        data={catBreeds}
        indicatorStyle={theme.scrollBar}
        style={{ paddingHorizontal: 20 }}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => <CatCard cat={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "center",
    alignSelf: "flex-start",
    gap: 15,
  },
});
