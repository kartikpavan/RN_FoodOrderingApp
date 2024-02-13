import { useContext, createContext, useState, PropsWithChildren } from "react";
import { CartItem, Order, Product } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type CartContextType = {
    addItemToCart: (product: Product, size: CartItem["size"]) => void;
    updateQuantity: (productId: string, amount: 1 | -1) => void;
    clearCart: () => void;
    checkout: () => void;
    items: CartItem[];
    totalAmount: number;
};

const CartContext = createContext<CartContextType>({
    addItemToCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    checkout: () => {},
    items: [],
    totalAmount: 0,
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const { mutate: placeOrder } = useInsertOrder();
    const { mutate: insertOrderItems } = useInsertOrderItems();

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

    // Calculate total Cart amount
    const totalAmount = items.reduce((total, current) => {
        return (total += current.product.price * current.quantity);
    }, 0);

    // Checkout Cart
    const checkout = () => {
        // order table
        placeOrder({ total_amount: totalAmount }, { onSuccess: saveOrderItems });
    };

    // Saving order items in respective to order-items table
    const saveOrderItems = (orders: Order) => {
        insertOrderItems(
            { items, order_id: orders.id },
            {
                onSuccess: () => {
                    clearCart();
                    router.push(`/(user)/orders/${orders?.id}`);
                },
            }
        );
    };

    return (
        <CartContext.Provider
            value={{
                addItemToCart,
                updateQuantity,
                clearCart,
                items,
                totalAmount,
                checkout,
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
