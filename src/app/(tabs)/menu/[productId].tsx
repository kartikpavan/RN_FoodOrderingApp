import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { sizes } from "@/src/constants/Sizes";
import { PizzaSize } from "@/src/types";
import Button from "@/src/components/Button";
import { useCartContext } from "@/src/context/CartProvider";

const SingleProductScreen = () => {
  const { addItemToCart } = useCartContext();
  const { productId } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const product = products.find((item) => item.id.toString() === productId);

  // Add to Cart
  const addToCart = () => {
    if (!product) return;
    addItemToCart(product, selectedSize);
  };

  if (!product) {
    return <Text>Oops! No Product Found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.sizeTitle}>Select Size</Text>
      <View style={styles.sizesContainer}>
        {sizes.map((item) => {
          const isSelected = item === selectedSize;
          return (
            <Pressable
              key={item}
              onPress={() => setSelectedSize(item)}
              style={[
                styles.size,
                {
                  backgroundColor: isSelected ? "tomato" : "gainsboro",
                  opacity: isSelected ? 1 : 0.8,
                },
              ]}>
              <Text
                style={[
                  styles.sizeText,
                  { color: isSelected ? "#fff1e6" : "#232023" },
                ]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.price}>Price: ₹ {product.price}</Text>
      <Button text="Add To Cart" onPress={addToCart} />
    </View>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  image: { width: "100%", aspectRatio: 1 },
  sizeTitle: { fontWeight: "500" },
  sizesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: "gainsboro",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  sizeText: { fontSize: 20, fontWeight: "bold" },
  price: { fontSize: 22, fontWeight: "bold", marginTop: "auto" },
});
