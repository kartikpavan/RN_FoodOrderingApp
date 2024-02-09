import { useAuthContext } from "@/src/context/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  // signed in users cannot access the login and register screens
  const { session } = useAuthContext();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
