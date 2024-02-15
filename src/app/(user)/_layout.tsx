import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Redirect, Tabs } from "expo-router";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue.web";
import { useAuthContext } from "@/src/context/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>["name"]; color: string }) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { session } = useAuthContext();

  if (!session) return <Redirect href={"/"} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* Hiding the default index.tsx file */}
      <Tabs.Screen name="index" options={{ href: null }} />
      {/* Menu Tab */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false, // we are rendering multiple stacks on top of each other
          tabBarIcon: ({ color }) => <TabBarIcon name="pizza-slice" color={color} />,
        }}
      />
      {/* Orders Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false, // we are rendering multiple stacks on top of each other
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      {/* Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false, // we are rendering multiple stacks on top of each other
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
