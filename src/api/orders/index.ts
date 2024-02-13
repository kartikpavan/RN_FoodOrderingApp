import { useAuthContext } from "@/src/context/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { Order, OrderItem } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .in("status", statuses)
                .order("created_at", { ascending: false });
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

// Fetching single order by ID
export const useOrder = (id: number) => {
    return useQuery<Order>({
        queryKey: ["order", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*,order_items(*)")
                .eq("id", id)
                .single();
            if (error) throw new Error(error.message);
            return data;
        },
    });
};

type CreateOrderType = {
    id?: number;
    created_at?: string;
    status?: string;
    total_amount: number;
    user_id?: string | null;
};

// Creating Order by User
export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuthContext();
    const userId = session?.user.id;

    return useMutation({
        async mutationFn(data: CreateOrderType) {
            const { error, data: newOrder } = await supabase
                .from("orders")
                .insert({ ...data, user_id: userId })
                .select()
                .single();
            if (error) throw new Error(error.message);
            return newOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ["order"] });
        },
    });
};
