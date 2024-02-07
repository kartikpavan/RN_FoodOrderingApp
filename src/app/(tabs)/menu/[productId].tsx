import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const SingleProductScreen = () => {
  const { productId } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <Text>Details for product Id: {productId}</Text>
    </View>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({});
