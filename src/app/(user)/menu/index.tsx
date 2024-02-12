import { useProductList } from "@/src/api/products";
import { ProductListItem } from "@/src/components/ProductListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function FoodMenu() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch Products</Text>;

  return (
    <FlatList
      data={products}
      renderItem={(data) => <ProductListItem product={data.item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10, gap: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      numColumns={2}
    />
  );
}
