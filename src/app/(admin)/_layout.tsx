import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/src/components/useColorScheme.web";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue.web";
import Colors from "@/src/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: "gainsboro",
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
      }}>
      {/* Hiding the default index.tsx file */}
      <Tabs.Screen name="index" options={{ href: null }} />
      {/* Menu Tab */}
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false, // we are rendering multiple stacks on top of each other
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pizza-slice" color={color} />
          ),
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
    </Tabs>
  );
}
