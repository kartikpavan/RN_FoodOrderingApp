import { FlatList, Text } from "react-native";
import React, { useEffect } from "react";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";
import Loader from "@/src/components/Loader";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

const OrdersScreen = () => {
    const queryClient = useQueryClient();
    const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

    if (isLoading) return <Loader />;
    if (error) return <Text>Failed to fetch Products</Text>;

    // Subscribe to real-time insertion
    useEffect(() => {
        const ordersSubscription = supabase
            .channel("custom-insert-channel")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
                queryClient.invalidateQueries({ queryKey: ["order"] });
            })
            .subscribe();

        return () => {
            ordersSubscription.unsubscribe();
        };
    }, []);

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 10, gap: 10 }}
        />
    );
};

export default OrdersScreen;
