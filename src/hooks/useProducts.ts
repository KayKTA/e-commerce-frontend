import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/product";

// Hook to fetch list of products
export function useProducts(autoLoad = true) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getProducts();
            setProducts(res);
        } catch (e: any) {
            setError(e?.response?.data?.error ?? e?.message ?? "Failed to load products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoLoad) reload();
    }, [autoLoad, reload]);

    return { products, loading, error, reload };
}
