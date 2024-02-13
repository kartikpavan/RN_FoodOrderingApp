import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Please Wait...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
