import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../api/products";
import type { Product } from "../types/product";

// Hook to fetch a single product by ID
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
