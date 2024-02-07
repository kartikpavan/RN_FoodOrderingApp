import { StyleSheet, Platform, Text, View, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCartContext } from "../context/CartProvider";
import CartListItem from "../components/CartListItem";

const CartScreen = () => {
  const { items } = useCartContext();
  return (
    <View>
      {items.length === 0 ? (
        <Text>No Items in Cart</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={(data) => <CartListItem cartItem={data.item} />}
          keyExtractor={(item) => item.product_id.toString()}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
