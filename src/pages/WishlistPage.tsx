import { Alert, Box, Button, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useWishlistContext } from "../context/WishListContext";

export default function WishlistPage() {
    const { wishlist, loading, mutating, error, remove } = useWishlistContext();
    const { products } = useProducts(true);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;

    const ids = wishlist?.productIds ?? [];
    const items = ids.map((id) => ({ id, product: products.find((p) => p.id === id) }));

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
                Wishlist
            </Typography>

            {items.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 2, borderColor: "divider" }}>
                    <Typography color="text.secondary">Your wishlist is empty.</Typography>
                </Paper>
            ) : (
                <Paper variant="outlined" sx={{ p: 2, borderColor: "divider" }}>
                    <Stack spacing={2}>
                        {items.map((it, idx) => (
                            <Stack key={it.id} spacing={1}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                                    <Stack sx={{ minWidth: 0 }}>
                                        <Typography fontWeight={800} noWrap>
                                            {it.product?.name ?? `Product #${it.id}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {it.product ? `${it.product.price.toFixed(2)} € • ${it.product.category}` : "—"}
                                        </Typography>
                                    </Stack>

                                    <Button
                                        size="small"
                                        variant="text"
                                        disabled={mutating}
                                        onClick={() => remove(it.id)}
                                    >
                                        Remove
                                    </Button>
                                </Stack>

                                {idx < items.length - 1 && <Divider />}
                            </Stack>
                        ))}
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}
