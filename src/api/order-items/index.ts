import { supabase } from "@/src/lib/supabase";
import { CartItem } from "@/src/types";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
    return useMutation({
        async mutationFn({ items, order_id }: { items: CartItem[]; order_id: number }) {
            const { data, error } = await supabase.from("order_items").insert(
                items.map((item) => ({
                    size: item.size,
                    quantity: item.quantity,
                    order_id: order_id,
                    product_id: item.product_id,
                }))
            );

            if (error) {
                throw new Error("Failed to insert order items");
            }
            return data;
        },
        onError(error) {
            console.log(error);
        },
    });
};
