import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { useProduct } from "../hooks/useProduct";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishListContext";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const cart = useCartContext();
    const wishlist = useWishlistContext();

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;
    if (!product) return <Alert severity="warning">Product not found</Alert>;

    const inWishlist = wishlist.has(product.id);
    const out = product.inventoryStatus === "OUTOFSTOCK";

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* Back Button */}
                <Button
                    component={Link}
                    to="/products"
                    startIcon={<ArrowBackIcon />}
                    sx={{ alignSelf: "flex-start" }}
                >
                    Back to products
                </Button>

                {/* Main Content */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                    alignItems="flex-start"
                >
                    {/* Left: Image */}
                    <Box
                        sx={{
                            flex: 1,
                            width: "100%",
                            position: "sticky",
                            top: 80,
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: "secondary.light",
                                borderRadius: 3,
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            {/* Wishlist Heart */}
                            <IconButton
                                onClick={() =>
                                    inWishlist
                                        ? wishlist.remove(product.id)
                                        : wishlist.add(product.id)
                                }
                                disabled={wishlist.mutating}
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    bgcolor: "background.paper",
                                    boxShadow: 2,
                                    zIndex: 1,
                                    "&:hover": {
                                        bgcolor: "background.paper",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                {inWishlist ? (
                                    <FavoriteIcon sx={{ color: "error.main" }} />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>

                            {/* Image Placeholder */}
                            <Box
                                sx={{
                                    height: { xs: 400, md: 600 },
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    p: 4,
                                }}
                            >
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
                                    <Typography variant="body1" color="text.secondary">
                                        Product Image
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right: Product Info */}
                    <Box sx={{ flex: 1, width: "100%" }}>
                        <Stack spacing={3}>
                            {/* Category */}
                            <Typography
                                variant="overline"
                                color="text.secondary"
                                sx={{ fontWeight: 600, letterSpacing: 1 }}
                            >
                                {product.category}
                            </Typography>

                            {/* Product Name */}
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "2rem", md: "2.5rem" },
                                    lineHeight: 1.2,
                                }}
                            >
                                {product.name}
                            </Typography>

                            {/* Rating */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        sx={{
                                            fontSize: 24,
                                            color:
                                                i < Math.floor(product.rating)
                                                    ? "warning.main"
                                                    : "action.disabled",
                                        }}
                                    />
                                ))}
                                <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                                    {product.rating}/5
                                </Typography>
                            </Stack>

                            {/* Price */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: "primary.main",
                                }}
                            >
                                {product.price.toFixed(2)} €
                            </Typography>

                            {/* Stock Status */}
                            <Box>
                                {product.inventoryStatus === "INSTOCK" && (
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "success.main", fontWeight: 600 }}
                                    >
                                        ✓ In Stock
                                    </Typography>
                                )}
                                {product.inventoryStatus === "LOWSTOCK" && (
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "warning.main", fontWeight: 600 }}
                                    >
                                        ⚠ Low Stock
                                    </Typography>
                                )}
                                {out && (
                                    <Typography
                                        variant="body1"
                                        sx={{ color: "error.main", fontWeight: 600 }}
                                    >
                                        ✕ Out of Stock
                                    </Typography>
                                )}
                            </Box>

                            {/* Description */}
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {product.description}
                            </Typography>

                            <Divider />

                            {/* Action Buttons */}
                            <Stack direction="row" spacing={2}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={cart.mutating || out}
                                    onClick={() => cart.add(product.id, 1)}
                                    sx={{
                                        py: 1.75,
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                >
                                    {out ? "Out of Stock" : "Add to Cart"}
                                </Button>
                            </Stack>

                            <Divider />

                            {/* Product Details */}
                            <Stack spacing={2}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Product Details
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Product Code
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {product.code}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Internal Reference
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {product.internalReference}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Shell ID
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {product.shellId}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>

                            <Divider />

                            {/* Features */}
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <LocalShippingOutlinedIcon color="primary" />
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>
                                            Free Shipping
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            On orders over 50€
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <VerifiedUserOutlinedIcon color="primary" />
                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>
                                            Quality Guaranteed
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Premium performance materials
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
}
