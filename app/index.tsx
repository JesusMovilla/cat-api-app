import CatCard from "@/src/components/CatCard";
import { catEndpoints } from "@/src/domain/catEndpoints";
import { useTheme } from "@/src/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");

  const { data: catBreeds } = useQuery({
    queryKey: ["breeds", searchText],
    queryFn: () => getCatsBreeds(),
  });

  const getCatsBreeds = async () => {
    const response = await catEndpoints.getCatsBreeds();
    // console.log(response.data);
    return response.data;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
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
