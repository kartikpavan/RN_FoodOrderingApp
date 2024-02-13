import { useProductList } from "@/src/api/products";
import Loader from "@/src/components/Loader";
import { ProductListItem } from "@/src/components/ProductListItem";
import { FlatList, Text } from "react-native";

export default function FoodMenu() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) return <Loader />;
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
