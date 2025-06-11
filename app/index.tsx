import CatCard from "@/src/components/CatCard";
import { catEndpoints } from "@/src/domain/catEndpoints";
import { useTheme } from "@/src/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");

  const { data: catBreeds } = useQuery({
    queryKey: ["breeds", searchText],
    queryFn: () => getCatsBreeds(),
  });

  const getCatsBreeds = async () => {
    const response = await catEndpoints.getCatsBreeds();
    return response.data;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TextInput
        value={searchText}
        placeholder="Buscar por nombre"
        onChangeText={(text) => setSearchText(text)}
        placeholderTextColor={"gray"}
        style={{
          marginTop: 5,
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
          height: 35,
          marginHorizontal: 20,
          // ...textStyles().body9,
          paddingHorizontal: 10,
          backgroundColor: "white",
        }}
      />

      <FlatList
        numColumns={2}
        data={catBreeds}
        style={{ paddingHorizontal: 20 }}
        indicatorStyle="black"
        contentContainerStyle={{ paddingBottom: 50 }}
        columnWrapperStyle={{
          justifyContent: "center",
          alignSelf: "flex-start",
          gap: 15,
        }}
        renderItem={({ item }) => <CatCard cat={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: 200,
    height: 200,
  },
});
