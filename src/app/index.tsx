import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "../components/Button";
import Colors from "../constants/Colors";

//? This is the main entry point of the app.
const RootIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" color="tomato" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" color={Colors.light.tint} />
      </Link>
      <Link href={"/(auth)/sign-in"} asChild>
        <Button text="Sign In" color="green" />
      </Link>
    </View>
  );
};

export default RootIndex;

const styles = StyleSheet.create({});
