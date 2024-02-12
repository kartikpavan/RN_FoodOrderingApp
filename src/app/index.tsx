import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import { useAuthContext } from "../context/AuthProvider";
import { supabase } from "../lib/supabase";

//? This is the main entry point of the app.
const RootIndex = () => {
  const { session, loading } = useAuthContext();

  if (loading) {
    return <ActivityIndicator />;
  }
  // no session means , user is not signed-in
  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Stack.Screen options={{ title: "Home", headerTitleAlign: "center" }} />
      <Link href={"/(user)"} asChild>
        <Button text="User" color="tomato" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" color={Colors.light.tint} />
      </Link>
      <Link href={"/(auth)/sign-in"} asChild>
        <Button text="Sign In" color="green" />
      </Link>
      <Button
        text="Sign Out"
        color="red"
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
};

export default RootIndex;

const styles = StyleSheet.create({});
