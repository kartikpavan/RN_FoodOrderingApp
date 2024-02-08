import { useColorScheme } from "@/src/components/useColorScheme.web";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  const colorScheme = useColorScheme();

  return (
    // On All screens this cart icon will be displayed at the top right
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors[colorScheme ? "light" : "dark"].text}
                  style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}>
      {/* menu/root screen settings */}
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
