import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";
import Loader from "@/src/components/Loader";

const ArchivedOrdersScreen = () => {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: true });

  if (isLoading) return <Loader />;
  if (error) return <Text>Failed to fetch Products</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
};

export default ArchivedOrdersScreen;

const styles = StyleSheet.create({});
