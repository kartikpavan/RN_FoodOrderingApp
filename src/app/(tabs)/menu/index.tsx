import products from "@/assets/data/products";
import { ProductListItem } from "@/src/components/ProductListItem";
import { Stack } from "expo-router";
import { FlatList, View } from "react-native";

export default function FoodMenu() {
  return (
    <View>
      <Stack.Screen options={{ title: "Menu" }} />
      <FlatList
        data={products}
        renderItem={(data) => <ProductListItem product={data.item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        numColumns={2}
      />
    </View>
  );
}
