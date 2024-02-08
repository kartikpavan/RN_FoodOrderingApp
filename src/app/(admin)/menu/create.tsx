import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { createProductValdation } from "@/src/validator";
import * as ImagePicker from "expo-image-picker";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const CreateProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCreate = () => {
    // Input Validation
    const { success, errMessage } = createProductValdation(name, price);
    if (success === false) {
      setError(errMessage);
      return;
    }
    // Save Values to Db and reset State
    console.log(`${name} : ${price}`);
    // Reset State value
    setName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image || defaultPizzaImage }}
        alt="Pizza Image"
        style={styles.image}
      />
      <Text style={styles.textBtn} onPress={pickImage}>
        Select Image
      </Text>
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
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textBtn: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.light.tint,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 5,
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
