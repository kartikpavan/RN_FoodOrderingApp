import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

const SignInScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) Alert.alert("Error", error.message);
        } catch (err) {
            if (err instanceof Error) Alert.alert("Error", err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <FontAwesome name="user" size={80} color="black" style={{ alignSelf: "center", marginBottom: 20 }} />
            <Stack.Screen options={{ title: "Sign In" }} />
            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="john.doe@gmail.com" style={styles.input} />
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="*******"
                style={styles.input}
            />
            <Button
                text={`${isLoading ? "Signing In..." : "Sign In"}`}
                color="green"
                onPress={login}
                disabled={isLoading}
            />
            <Link href={"/(auth)/sign-up"} asChild>
                <Text style={styles.createAccountText}>Create an Account</Text>
            </Link>
        </View>
    );
};

export default SignInScreen;

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
    createAccountText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        color: "green",
    },
});
