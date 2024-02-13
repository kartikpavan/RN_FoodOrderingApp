import { StyleSheet, Platform, Text, View, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCartContext } from "../context/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {
  const { items, totalAmount, checkout } = useCartContext();
  return (
    <View style={{ padding: 10, flex: 1 }}>
      {items.length === 0 ? (
        <Text>No Items in Cart</Text>
      ) : (
        <View>
          <FlatList
            data={items}
            renderItem={(data) => <CartListItem cartItem={data.item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10, gap: 10 }}
          />
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.totalPrice}>Delivery Cost :</Text>
              <Text style={styles.totalPrice}>Taxes and Charges :</Text>
              <Text style={styles.totalPrice}>Total Price :</Text>
            </View>
            <View>
              <Text
                style={[
                  styles.totalPrice,
                  { color: "green", textAlign: "right" },
                ]}>
                FREE
              </Text>
              <Text
                style={[
                  styles.totalPrice,
                  { color: "tomato", textAlign: "right" },
                ]}>
                + ₹50
              </Text>
              <Text style={[styles.totalPrice, { color: "tomato" }]}>
                ₹{totalAmount + 50}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: "auto" }}>
            <Button text="Checkout" color="tomato" onPress={checkout} />
          </View>
        </View>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    borderStyle: "dotted",
    borderColor: "#D3d3d3",
    borderWidth: 2,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666666",
    marginVertical: 10,
  },
});
