import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "../components/Button";

const RootIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="Login as User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Login as Admin" />
      </Link>
    </View>
  );
};

export default RootIndex;

const styles = StyleSheet.create({});
