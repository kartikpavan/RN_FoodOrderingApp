import { useProductList } from "@/src/api/products";
import Loader from "@/src/components/Loader";
import { ProductListItem } from "@/src/components/ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

//? Admin Menu Screen
export default function FoodMenu() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) return <Loader />;
  if (error) return <Text>Failed to fetch Products</Text>;

  return (
    <View>
      {/* Stack Info is added here to set the title or else add inside _layout.tsx */}
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square"
                    size={25}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
