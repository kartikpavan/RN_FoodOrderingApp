import { StyleSheet, View } from "react-native";
import React from "react";
import { Link, Redirect, Stack } from "expo-router";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import { useAuthContext } from "../context/AuthProvider";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";

//? This is the main entry point of the app.
const RootIndex = () => {
  const { session, loading, isAdmin } = useAuthContext();

  if (loading) return <Loader />;

  // no session means , user is not signed-in
  if (!session) return <Redirect href={"/(auth)/sign-in"} />;

  if (!isAdmin) return <Redirect href={"/(user)"} />;

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Stack.Screen options={{ title: "Home", headerTitleAlign: "center" }} />
      <Link href={"/(user)"} asChild>
        <Button text="User" color="tomato" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" color={Colors.light.tint} />
      </Link>
      <Button text="Sign Out" color="red" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default RootIndex;

const styles = StyleSheet.create({});
