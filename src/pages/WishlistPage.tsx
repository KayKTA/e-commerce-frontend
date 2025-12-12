import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useProducts } from "../hooks/useProducts";
import { useWishlistContext } from "../context/WishListContext";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
    const navigate = useNavigate();
    const { wishlist, loading, mutating, error, remove } = useWishlistContext();
    const { products } = useProducts(true);
    const cart = useCartContext();

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;

    const ids = wishlist?.productIds ?? [];
    const items = ids
        .map((id) => ({ id, product: products.find((p) => p.id === id) }))
        .filter((item) => item.product);

    const handleAddToCart = (productId: number) => {
        cart.add(productId, 1);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* Header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        My Wishlist
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {items.length} item{items.length !== 1 ? "s" : ""}
                    </Typography>
                </Stack>

                {items.length === 0 ? (
                    /* Empty Wishlist State */
                    <Card
                        sx={{
                            p: 8,
                            textAlign: "center",
                            borderRadius: 3,
                        }}
                    >
                        <FavoriteBorderIcon
                            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                        />
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                            Your wishlist is empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Save your favorite products for later
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/products")}
                            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                        >
                            Discover Products
                        </Button>
                    </Card>
                ) : (
                    /* Wishlist Grid */
                    <Grid container spacing={3}>
                        {items.map((item) => (
                            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    {/* Image Area */}
                                    <Box
                                        onClick={() => navigate(`/products/${item.id}`)}
                                        sx={{
                                            cursor: "pointer",
                                            bgcolor: "secondary.light",
                                            height: 240,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            p: 3,
                                        }}
                                    >
                                        {/* Remove Button */}
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                remove(item.id);
                                            }}
                                            disabled={mutating}
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                right: 12,
                                                bgcolor: "background.paper",
                                                boxShadow: 1,
                                                "&:hover": {
                                                    bgcolor: "error.light",
                                                    color: "error.contrastText",
                                                },
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>

                                        {/* Product Image Placeholder */}
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 2,
                                                bgcolor: "rgba(255, 255, 255, 0.6)",
                                                border: "2px dashed",
                                                borderColor: "divider",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="body2" color="text.secondary">
                                                Product Image
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Product Info */}
                                    <Box sx={{ p: 2.5 }}>
                                        <Stack spacing={1.5}>
                                            {/* Title and Category */}
                                            <Box
                                                onClick={() => navigate(`/products/${item.id}`)}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: "1.1rem",
                                                        mb: 0.5,
                                                        "&:hover": { color: "primary.main" },
                                                    }}
                                                >
                                                    {item.product?.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.product?.category}
                                                </Typography>
                                            </Box>

                                            {/* Rating */}
                                            {item.product && (
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            sx={{
                                                                fontSize: 16,
                                                                color:
                                                                    i < Math.floor(item.product!.rating)
                                                                        ? "warning.main"
                                                                        : "action.disabled",
                                                            }}
                                                        />
                                                    ))}
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ ml: 0.5 }}
                                                    >
                                                        {item.product.rating}
                                                    </Typography>
                                                </Stack>
                                            )}

                                            {/* Price */}
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "primary.main",
                                                    fontSize: "1.25rem",
                                                }}
                                            >
                                                {item.product?.price.toFixed(2)} €
                                            </Typography>

                                            {/* Add to Cart Button */}
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                startIcon={<ShoppingCartOutlinedIcon />}
                                                disabled={
                                                    cart.mutating ||
                                                    item.product?.inventoryStatus === "OUTOFSTOCK"
                                                }
                                                onClick={() => handleAddToCart(item.id)}
                                                sx={{
                                                    py: 1.25,
                                                    borderRadius: 2,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {item.product?.inventoryStatus === "OUTOFSTOCK"
                                                    ? "Out of Stock"
                                                    : "Add to Cart"}
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Stack>
        </Container>
    );
}
