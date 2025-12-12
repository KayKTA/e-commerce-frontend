import {
    Alert,
    Box,
    CircularProgress,
    Pagination,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishListContext";

const PAGE_SIZE = 8;

export default function ProductsPage() {
    const { products, loading, error } = useProducts(true);

    const cart = useCartContext();
    const wishlist = useWishlistContext();

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;

        return products.filter((p) => {
            const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase();
            return hay.includes(q);
        });
    }, [products, query]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

    const visible = useMemo(() => {
        const safePage = Math.min(page, pageCount);
        const start = (safePage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, page, pageCount]);

    // send back to page 1 on query change
    function onChangeQuery(v: string) {
        setQuery(v);
        setPage(1);
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
                <Typography variant="h4" fontWeight={900} sx={{ flex: 1 }}>
                    Products
                </Typography>

                <TextField
                    size="small"
                    label="Search"
                    value={query}
                    onChange={(e) => onChangeQuery(e.target.value)}
                    sx={{ width: { xs: "100%", sm: 320 } }}
                />
            </Stack>

            {error && <Alert severity="error">{error}</Alert>}
            {cart.error && <Alert severity="error">{cart.error}</Alert>}
            {wishlist.error && <Alert severity="error">{wishlist.error}</Alert>}

            <Stack spacing={1.5}>
                {visible.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        inWishlist={wishlist.has(p.id)}
                        disableCart={cart.mutating}
                        disableWishlist={wishlist.mutating}
                        onAddToCart={(id) => cart.add(id, 1)}
                        onToggleWishlist={(id, next) => (next ? wishlist.add(id) : wishlist.remove(id))}
                    />
                ))}
            </Stack>

            <Stack direction="row" justifyContent="center" sx={{ pt: 1 }}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                {filtered.length} product(s)
            </Typography>
        </Stack>
    );
}
