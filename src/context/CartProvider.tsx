import { useContext, createContext, useState, PropsWithChildren } from "react";
import { CartItem, Product } from "../types";

type CartContextType = {
  items: CartItem[];
  addItemToCart: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: () => {},
  updateQuantity: () => {},
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add new Item to cart
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
  // If item already in cart, increment the quantity

  // Update Quantity of item
  const updateQuantity = (productId: string, quantity: number) => {};
  // Remove item from cart

  return (
    <CartContext.Provider value={{ items, addItemToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
