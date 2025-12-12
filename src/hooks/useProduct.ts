import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../api/products";
import type { Product } from "../types/product";

/**
 * React hook to fetch a Product by id.
 *
 * Fetches the product on mount and when `id` changes. Exposes loading and error
 * states and a `reload` callback that can be called to re-fetch the product.
 *
 * @param id - The product id to fetch. If falsy, no request is made.
 * @returns An object with:
 *   - product: Product | null
 *   - loading: boolean
 *   - error: string | null
 *   - reload: () => Promise<void>
 *
 * @example
 * const { product, loading, error, reload } = useProduct("abc123");
 */
export function useProduct(id?: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const res = await getProductById(id);
            setProduct(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to load product");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        reload();
    }, [reload]);

    return { product, loading, error, reload };
}
