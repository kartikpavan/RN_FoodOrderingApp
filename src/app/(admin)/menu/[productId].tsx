import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";

const SingleProductScreen = () => {
  const { productId } = useLocalSearchParams();
  const product = products.find((item) => item.id.toString() === productId);

  if (!product) {
    return <Text>Oops! No Product Found</Text>;
  }

  return (
    <View style={styles.container}>
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
