import { supabase } from "@/src/lib/supabase";
import { Order } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

// Fetching Home screen Products
export const useAdminOrderList = () => {
  return useQuery<Order[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
