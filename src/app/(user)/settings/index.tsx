import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

const Settings = () => {
  return (
    <View>
      <Button text="Sign Out" color="red" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
