import { useAuthContext } from "@/src/context/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { Order } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

// Fetching all orders for admin
export const useAdminOrderList = ({ archived = false }) => {
  let statuses: string[] = [];
  if (archived) {
    statuses = ["Delivered"];
  } else {
    statuses = ["New", "Cooking", "Delivering"];
  }
  return useQuery<Order[]>({
    queryKey: ["order", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").in("status", statuses);
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Fetching user orders
export const useMyOrderList = () => {
  const { session } = useAuthContext();
  const id = session?.user.id;
  return useQuery({
    queryKey: ["order", { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};
