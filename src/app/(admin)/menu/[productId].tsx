import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useProduct } from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/CartListItem";

const SingleProductScreen = () => {
  const { productId } = useLocalSearchParams();
  const parseProductId = parseFloat(
    typeof productId === "string" ? productId : productId[0]
  );
  const { data: product, isLoading, error } = useProduct(parseProductId);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch Products</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${productId}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}>Name: {product?.name}</Text>
      <Text style={styles.price}>Price: ₹ {product?.price}</Text>
    </View>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1 },
  price: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
});
