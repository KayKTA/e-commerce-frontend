import { Alert, Box, Button, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";

export default function CartPage() {
    const { cart, loading, mutating, error, setQuantity, remove } = useCart(true);
    const { products } = useProducts(true);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;

    const items = cart?.items ?? [];
    const lines = items.map((it) => {
        const p = products.find((x) => x.id === it.productId);
        return { ...it, product: p };
    });

    const total = lines.reduce((sum, l) => sum + (l.product?.price ?? 0) * l.quantity, 0);

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
                Cart
            </Typography>

            {lines.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 2, borderColor: "divider" }}>
                    <Typography color="text.secondary">Your cart is empty.</Typography>
                </Paper>
            ) : (
                <Paper variant="outlined" sx={{ p: 2, borderColor: "divider" }}>
                    <Stack spacing={2}>
                        {lines.map((l, idx) => (
                            <Stack key={l.productId} spacing={1}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                                    <Stack sx={{ minWidth: 0 }}>
                                        <Typography fontWeight={800} noWrap>
                                            {l.product?.name ?? `Product #${l.productId}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {l.product ? `${l.product.price.toFixed(2)} €` : "—"}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            disabled={mutating || l.quantity <= 1}
                                            onClick={() => setQuantity(l.productId, Math.max(1, l.quantity - 1))}
                                        >
                                            −
                                        </Button>
                                        <Typography sx={{ width: 24, textAlign: "center" }}>{l.quantity}</Typography>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            disabled={mutating}
                                            onClick={() => setQuantity(l.productId, l.quantity + 1)}
                                        >
                                            +
                                        </Button>

                                        <Button
                                            size="small"
                                            variant="text"
                                            disabled={mutating}
                                            onClick={() => remove(l.productId)}
                                        >
                                            Remove
                                        </Button>
                                    </Stack>
                                </Stack>

                                {idx < lines.length - 1 && <Divider />}
                            </Stack>
                        ))}

                        <Divider />

                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="text.secondary">Total</Typography>
                            <Typography fontWeight={900}>{total.toFixed(2)} €</Typography>
                        </Stack>
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}
