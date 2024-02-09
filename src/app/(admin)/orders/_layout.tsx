import { Stack } from "expo-router";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="lists" options={{ headerShown: false }} />
    </Stack>
  );
}
