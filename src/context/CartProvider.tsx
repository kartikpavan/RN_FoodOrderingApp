import { useContext, createContext, useState, PropsWithChildren } from "react";
import { CartItem, Product } from "../types";

type CartContextType = {
  items: CartItem[];
  addItemToCart: (product: Product, size: CartItem["size"]) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: () => {},
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItemToCart = (product: Product, size: CartItem["size"]) => {
    const newCartItem = {
      id: "1",
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };
    setItems((prev) => [newCartItem, ...prev]);
  };

  return (
    <CartContext.Provider value={{ items, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
