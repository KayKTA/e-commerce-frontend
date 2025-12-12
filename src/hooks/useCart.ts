import { useCallback, useEffect, useState } from "react";
import type { Cart } from "../types/cart";
import { addToCart, getCart, removeFromCart, setCartQuantity } from "../api/cart";

/**
 * useCart - React hook to manage the user's shopping cart.
 *
 * Behavior:
 * - Automatically fetches the cart on mount when `autoLoad` is true.
 * - Exposes `loading` for the initial load and `mutating` for any mutation in progress.
 * - Returns `error` as a human-readable message when API calls fail.
 *
 * API:
 * - reload(): Promise<void> - refetch the cart.
 * - add(productId: number, quantity?: number): Promise<void> - add an item to the cart.
 * - setQuantity(productId: number, quantity: number): Promise<void> - set an item's quantity.
 * - remove(productId: number): Promise<void> - remove an item from the cart.
 *
 * @param autoLoad - If true (default), the hook will load the cart on mount.
 * @returns {{ cart: Cart | null, loading: boolean, mutating: boolean, error: string | null, reload: () => Promise<void>, add: (productId: number, quantity?: number) => Promise<void>, setQuantity: (productId: number, quantity: number) => Promise<void>, remove: (productId: number) => Promise<void> }}
 */
export function useCart(autoLoad = true) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const [mutating, setMutating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getCart();
            setCart(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to load cart");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoLoad) reload();
    }, [autoLoad, reload]);

    const add = useCallback(async (productId: number, quantity = 1) => {
        setMutating(true);
        setError(null);
        try {
            const res = await addToCart(productId, quantity);
            setCart(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to add to cart");
        } finally {
            setMutating(false);
        }
    }, []);

    const setQuantity = useCallback(async (productId: number, quantity: number) => {
        setMutating(true);
        setError(null);
        try {
            const res = await setCartQuantity(productId, quantity);
            setCart(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to update cart");
        } finally {
            setMutating(false);
        }
    }, []);

    const remove = useCallback(async (productId: number) => {
        setMutating(true);
        setError(null);
        try {
            const res = await removeFromCart(productId);
            setCart(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to remove from cart");
        } finally {
            setMutating(false);
        }
    }, []);

    return { cart, loading, mutating, error, reload, add, setQuantity, remove };
}
