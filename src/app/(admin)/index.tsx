import { Redirect } from "expo-router";

//? This is the main entry file for the admin tab
export default function TabIndex() {
  return <Redirect href={"/(admin)/menu/"} />;
}
