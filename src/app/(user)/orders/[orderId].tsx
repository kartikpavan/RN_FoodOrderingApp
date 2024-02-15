import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrder } from "@/src/api/orders";
import Loader from "@/src/components/Loader";

const OrderDetailsScreen = () => {
    const { orderId } = useLocalSearchParams();
    const parseOrderId = parseFloat(typeof orderId === "string" ? orderId : orderId[0]);

    const { data: order, isLoading, error } = useOrder(parseOrderId);

    if (isLoading) return <Loader />;
    if (error) return <Text>Failed to fetch Products</Text>;

    return (
        <View style={{ padding: 10, gap: 20 }}>
            <Stack.Screen options={{ title: `Order #${orderId}` }} />
            <OrderListItem order={order} />
            <FlatList
                data={order?.order_items}
                renderItem={(data) => <OrderItemListItem item={data.item} />}
                contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
            />
        </View>
    );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});
