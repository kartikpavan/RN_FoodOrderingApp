import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();

  const order = orders.find((item) => item.id.toString() === orderId);

  if (!order) {
    return <Text>Order Not Found</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${orderId}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={(data) => <OrderItemListItem item={data.item} />}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});
