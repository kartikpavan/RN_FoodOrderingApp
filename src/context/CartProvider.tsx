import { useContext, createContext, useState, PropsWithChildren } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartContextType = {
  items: CartItem[];
  addItemToCart: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (productId: string, amount: 1 | -1) => void;
  clearCart: () => void;
  totalAmount: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalAmount: 0,
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add new Item to cart
  const addItemToCart = (product: Product, size: CartItem["size"]) => {
    const newCartItem = {
      id: randomUUID(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems((prev) => {
      // Check for the exsiting item
      const existingItemIndex = prev.findIndex(
        (item) => item.product_id === product.id && item.size === size
      );
      // If item already in cart, increment the quantity
      if (existingItemIndex !== -1) {
        const updatedItem = prev.map((item, idx) => {
          if (idx === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        return updatedItem;
      } else {
        return [newCartItem, ...prev];
      }
    });
  };

  // Update Quantity of item
  const updateQuantity = (productId: string, amount: 1 | -1) => {
    // get the product whose qty is to be updated
    setItems((prev) => {
      const newItems = prev
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + amount };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0);
      return newItems;
    });
  };

  // Clear cart
  const clearCart = () => setItems([]);

  const totalAmount = items.reduce((total, current) => {
    return (total += current.product.price * current.quantity);
  }, 0);
  return (
    <CartContext.Provider
      value={{
        addItemToCart,
        updateQuantity,
        clearCart,
        items,
        totalAmount,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
