import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrder } from "@/src/api/orders";
import Loader from "@/src/components/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";

const OrderDetailsScreen = () => {
    const { orderId } = useLocalSearchParams();
    const parseOrderId = parseFloat(typeof orderId === "string" ? orderId : orderId[0]);

    const { data: order, isLoading, error } = useOrder(parseOrderId);

    if (isLoading) return <Loader />;
    if (error) return <Text>Failed to fetch Products</Text>;

    // Subscribe to real-time Updation of order status
    useEffect(() => {
        const queryClient = useQueryClient();
        const updateOrderSubscription = supabase
            .channel("custom-filter-channel")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "orders",
                    filter: `id=eq.${parseOrderId}`,
                },
                (payload) => {
                    queryClient.invalidateQueries({ queryKey: ["order", parseOrderId] });
                }
            )
            .subscribe();

        return () => {
            updateOrderSubscription.unsubscribe();
        };
    }, []);
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
