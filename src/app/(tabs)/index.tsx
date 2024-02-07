import { Redirect } from "expo-router";

// This is the default screen wich will render insider (tabs) folder
export default function TabIndex() {
  return <Redirect href={"/menu/"} />;
}
