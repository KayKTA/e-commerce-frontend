import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useProducts } from "../hooks/useProducts";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate();
    const { cart, loading, mutating, error, setQuantity, remove } = useCartContext();
    const { products } = useProducts(true);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
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

    const subtotal = lines.reduce((sum, l) => sum + (l.product?.price ?? 0) * l.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* Header */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Shopping Cart
                </Typography>

                {lines.length === 0 ? (
                    /* Empty Cart State */
                    <Card
                        sx={{
                            p: 8,
                            textAlign: "center",
                            borderRadius: 3,
                        }}
                    >
                        <ShoppingBagOutlinedIcon
                            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                        />
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Add some products to get started
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/products")}
                            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                        >
                            Browse Products
                        </Button>
                    </Card>
                ) : (
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">
                        {/* Cart Items */}
                        <Box sx={{ flex: 1, width: "100%" }}>
                            <Stack spacing={2}>
                                {lines.map((l) => (
                                    <Card
                                        key={l.productId}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            transition: "box-shadow 0.2s",
                                            "&:hover": { boxShadow: 3 },
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            {/* Product Image Placeholder */}
                                            <Box
                                                onClick={() => navigate(`/products/${l.productId}`)}
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 2,
                                                    bgcolor: "secondary.light",
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    border: "2px dashed",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <Typography variant="caption" color="text.secondary">
                                                    IMG
                                                </Typography>
                                            </Box>

                                            {/* Product Info */}
                                            <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                        "&:hover": { color: "primary.main" },
                                                    }}
                                                    onClick={() => navigate(`/products/${l.productId}`)}
                                                >
                                                    {l.product?.name ?? `Product #${l.productId}`}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {l.product?.category}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    sx={{ fontWeight: 700, color: "primary.main" }}
                                                >
                                                    {l.product?.price.toFixed(2) ?? "—"} €
                                                </Typography>
                                            </Stack>

                                            {/* Quantity Controls */}
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                sx={{
                                                    bgcolor: "background.default",
                                                    borderRadius: 2,
                                                    p: 0.5,
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    disabled={mutating || l.quantity <= 1}
                                                    onClick={() =>
                                                        setQuantity(
                                                            l.productId,
                                                            Math.max(1, l.quantity - 1)
                                                        )
                                                    }
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography
                                                    sx={{
                                                        minWidth: 32,
                                                        textAlign: "center",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {l.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    disabled={mutating}
                                                    onClick={() =>
                                                        setQuantity(l.productId, l.quantity + 1)
                                                    }
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>

                                            {/* Remove Button */}
                                            <IconButton
                                                color="error"
                                                disabled={mutating}
                                                onClick={() => remove(l.productId)}
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </Card>
                                ))}
                            </Stack>
                        </Box>

                        {/* Order Summary */}
                        <Card
                            sx={{
                                width: { xs: "100%", md: 360 },
                                p: 3,
                                borderRadius: 3,
                                position: { md: "sticky" },
                                top: 80,
                            }}
                        >
                            <Stack spacing={2.5}>
                                <Typography variant="h6" fontWeight={700}>
                                    Order Summary
                                </Typography>

                                <Divider />

                                <Stack spacing={1.5}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1" color="text.secondary">
                                            Subtotal
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {subtotal.toFixed(2)} €
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body1" color="text.secondary">
                                            Shipping
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {shipping === 0 ? "Free" : `${shipping.toFixed(2)} €`}
                                        </Typography>
                                    </Stack>

                                    {subtotal < 50 && shipping > 0 && (
                                        <Typography variant="caption" color="text.secondary">
                                            Free shipping on orders over 50€
                                        </Typography>
                                    )}
                                </Stack>

                                <Divider />

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="h6" fontWeight={700}>
                                        Total
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        color="primary.main"
                                    >
                                        {total.toFixed(2)} €
                                    </Typography>
                                </Stack>

                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        py: 1.5,
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    variant="text"
                                    fullWidth
                                    onClick={() => navigate("/products")}
                                >
                                    Continue Shopping
                                </Button>
                            </Stack>
                        </Card>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}
