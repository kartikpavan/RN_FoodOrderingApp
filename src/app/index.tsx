import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "../components/Button";
import Colors from "../constants/Colors";

const RootIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="Login as User" color="tomato" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Login as Admin" color={Colors.light.tint} />
      </Link>
    </View>
  );
};

export default RootIndex;

const styles = StyleSheet.create({});
