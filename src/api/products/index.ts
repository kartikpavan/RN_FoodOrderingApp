import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetching Home screen Products
export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Fetching single product by ID
export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// ADMIN: Create new Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error } = await supabase
        .from("products")
        .insert({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .single();
      if (error) throw new Error(error.message);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

// ADMIN: Update Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({ id, ...update }: Product) {
      const { data, error } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["product"] });
      await queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

// ADMIN: Delete Product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
