import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";
import { useMyOrderList } from "@/src/api/orders";
import Loader from "@/src/components/Loader";

const OrdersScreen = () => {
    const { data: orders, isLoading, error } = useMyOrderList();

    if (isLoading) return <Loader />;
    if (error) return <Text>Failed to fetch Orders</Text>;

    return (
        <View>
            <Stack.Screen options={{ title: "Orders" }} />
            <FlatList
                data={orders}
                renderItem={({ item }) => <OrderListItem order={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
        </View>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
