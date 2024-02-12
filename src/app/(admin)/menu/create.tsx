import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { createProductValdation } from "@/src/validator";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useCreateProduct,
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const CreateProduct = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  // For update we need Id
  const { id } = useLocalSearchParams();
  const isUpdating = Boolean(id);
  const parseProductId = parseFloat(typeof id === "string" ? id : id?.[0]);

  const { mutate: insertProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: databaseProduct } = useProduct(parseProductId);
  const { mutate: deleteProduct } = useDeleteProduct();

  // Feeding the text input with original values from the DB
  useEffect(() => {
    if (databaseProduct) {
      setName(databaseProduct.name);
      setPrice(databaseProduct.price.toString());
      setImage(databaseProduct.image);
    }
  }, [databaseProduct]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const onSubmit = async () => {
    if (isUpdating) onUpdate();
    else onCreate();
  };

  const onCreate = () => {
    // Input Validation
    const { success, errMessage } = createProductValdation(name, price);
    if (success === false) {
      setError(errMessage);
      return;
    }
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          setName("");
          setPrice("");
          router.back();
        },
      }
    );
  };

  const onUpdate = () => {
    const { success, errMessage } = createProductValdation(name, price);
    if (success === false) {
      setError(errMessage);
      return;
    }
    updateProduct(
      { id: parseProductId, name, price: parseFloat(price), image },
      {
        onSuccess() {
          // Reset State value and navigate back
          setName("");
          setPrice("");
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    deleteProduct(parseProductId, {
      onSuccess() {
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product ?", [
      { text: "Cancel", style: "default" },
      { text: "OK", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        alt="Pizza Image"
        style={styles.image}
      />
      <Text style={styles.imageSelectBtn} onPress={pickImage}>
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
        text={`${isUpdating ? "Update" : "Create"} Product`}
        color={Colors.light.tint}
        onPress={onSubmit}
        style={{ backgroundColor: "yellow" }}
      />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.deleteBtn}>
          Delete Product
        </Text>
      )}
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
    marginBottom: 10,
    alignSelf: "center",
  },
  imageSelectBtn: {
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
  deleteBtn: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});
