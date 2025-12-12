import { useCallback, useEffect, useState } from "react";
import type { Wishlist } from "../types/wishlist";
import { addToWishlist, getWishlist, removeFromWishlist } from "../api/wishlist";

/**
 * Hook for managing the user's wishlist.
 *
 * - Fetches the wishlist from the API (optionally on mount).
 * - Provides helpers to add/remove items and check membership.
 *
 * @param autoLoad - If true (default) the wishlist will be loaded automatically on mount.
 * @returns An object containing wishlist state, status flags, and action helpers.
 *
 * @example
 * const { wishlist, loading, add, remove, has } = useWishlist();
 * useEffect(() => {
 *   if (!loading && wishlist) console.log(wishlist.productIds);
 * }, [loading, wishlist]);
 */
export type UseWishlistResult = {
    wishlist: Wishlist | null;
    loading: boolean;
    mutating: boolean;
    error: string | null;
    reload: () => Promise<void>;
    add: (productId: number) => Promise<void>;
    remove: (productId: number) => Promise<void>;
    has: (productId: number) => boolean;
};
export function useWishlist(autoLoad = true) {
    const [wishlist, setWishlist] = useState<Wishlist | null>(null);
    const [loading, setLoading] = useState(false);
    const [mutating, setMutating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getWishlist();
            setWishlist(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoLoad) reload();
    }, [autoLoad, reload]);

    const add = useCallback(async (productId: number) => {
        setMutating(true);
        setError(null);
        try {
            const res = await addToWishlist(productId);
            setWishlist(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to add to wishlist");
        } finally {
            setMutating(false);
        }
    }, []);

    const remove = useCallback(async (productId: number) => {
        setMutating(true);
        setError(null);
        try {
            const res = await removeFromWishlist(productId);
            setWishlist(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to remove from wishlist");
        } finally {
            setMutating(false);
        }
    }, []);

    const has = useCallback(
        (productId: number) => Boolean(wishlist?.productIds?.includes(productId)),
        [wishlist]
    );

    return { wishlist, loading, mutating, error, reload, add, remove, has };
}
