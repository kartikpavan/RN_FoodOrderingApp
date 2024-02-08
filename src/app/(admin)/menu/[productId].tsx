import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const SingleProductScreen = () => {
  const { productId } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const product = products.find((item) => item.id.toString() === productId);

  if (!product) {
    return <Text>Oops! No Product Found</Text>;
  }

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
                    color={Colors[colorScheme ? "light" : "dark"].text}
                    style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.price}>Name: {product.name}</Text>
      <Text style={styles.price}>Price: ₹ {product.price}</Text>
    </View>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1 },
  price: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
});
