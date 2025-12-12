import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
    const { products, loading, error } = useProducts(true);
    const cart = useCart(false);
    const wishlist = useWishlist(true);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
                Products
            </Typography>

            {/* 👇 IMPORTANT : on affiche les erreurs mutation (sinon tu “ne vois rien”) */}
            {error && <Alert severity="error">{error}</Alert>}
            {cart.error && <Alert severity="error">{cart.error}</Alert>}
            {wishlist.error && <Alert severity="error">{wishlist.error}</Alert>}

            <Stack spacing={1.5}>
                {products.map((p) => (
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
        </Stack>
    );
}
