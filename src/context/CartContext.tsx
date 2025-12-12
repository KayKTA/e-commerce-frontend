import { createContext, useContext, useMemo } from "react";
import { useCart } from "../hooks/useCart";

const CartCtx = createContext<ReturnType<typeof useCart> | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const cart = useCart(true);
    const value = useMemo(() => cart, [cart.cart, cart.loading, cart.mutating, cart.error]);
    return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCartContext() {
    const ctx = useContext(CartCtx);
    if (!ctx) throw new Error("useCartContext must be used within CartProvider");
    return ctx;
}
