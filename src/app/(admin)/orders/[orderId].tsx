import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { status } from "@/src/constants/Status";
import Colors from "@/src/constants/Colors";
import { OrderStatus } from "@/src/types";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | null>(null);

  const order = orders.find((item) => item.id.toString() === orderId);

  if (!order) {
    return <Text>Order Not Found</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${orderId}` }} />
      <FlatList
        ListHeaderComponent={() => <OrderListItem order={order} />}
        data={order.order_items}
        renderItem={(data) => <OrderItemListItem item={data.item} />}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Status</Text>
            <View style={styles.statusContainer}>
              {status.map((item) => {
                const isSelected = item === currentStatus;
                return (
                  <Pressable key={item} onPress={() => setCurrentStatus(item)}>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          backgroundColor: isSelected
                            ? Colors.light.tint
                            : undefined,
                          color: isSelected
                            ? Colors.light.background
                            : Colors.light.tint,
                        },
                      ]}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusText: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.light.tint,
    fontWeight: "500",
  },
});
