import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { createProductValdation } from "@/src/validator";

const CreateProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [error, setError] = useState<string | null>("");

  const onCreate = () => {
    // Save Values to Db and reset State
    // Input Validation
    const { success, errMessage } = createProductValdation(name, price);
    if (success === false) {
      setError(errMessage);
      return;
    }
    console.log(`${name} : ${price}`);
    setName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Parmesan Pizza"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="₹ 499"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      {error && <Text style={{ color: "tomato" }}>{error}</Text>}
      <Button
        text="Create Product"
        color={Colors.light.tint}
        onPress={onCreate}
        style={{ backgroundColor: "yellow" }}
      />
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
});
