import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import type { Product } from "../types/product";

type Props = {
    product: Product;
    inWishlist: boolean;
    disableCart?: boolean;
    disableWishlist?: boolean;
    onAddToCart: (productId: number) => void;
    onToggleWishlist: (productId: number, next: boolean) => void;
    onOpenDetails: (productId: number) => void;
};

export default function ProductCard({
    product,
    inWishlist,
    disableCart,
    disableWishlist,
    onAddToCart,
    onToggleWishlist,
    onOpenDetails,
}: Props) {
    const out = product.inventoryStatus === "OUTOFSTOCK";

    return (
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
                role="button"
                onClick={() => onOpenDetails(product.id)}
                sx={{
                    cursor: "pointer",
                    bgcolor: "secondary.light",
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    p: 3,
                }}
            >
                {/* Wishlist Heart */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id, !inWishlist);
                    }}
                    disabled={disableWishlist}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "background.paper",
                        boxShadow: 1,
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

                {/* Stock Badge */}
                {product.inventoryStatus === "LOWSTOCK" && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: "warning.main",
                            color: "warning.contrastText",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        LOW STOCK
                    </Box>
                )}

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

            <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={1.5}>
                    {/* Title and Category */}
                    <Box onClick={() => onOpenDetails(product.id)} sx={{ cursor: "pointer" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                mb: 0.5,
                                "&:hover": { color: "primary.main" },
                            }}
                        >
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.category}
                        </Typography>
                    </Box>

                    {/* Rating */}
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                sx={{
                                    fontSize: 16,
                                    color: i < Math.floor(product.rating) ? "warning.main" : "action.disabled",
                                }}
                            />
                        ))}
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                            {product.rating}
                        </Typography>
                    </Stack>

                    {/* Price */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            fontSize: "1.25rem",
                        }}
                    >
                        {product.price.toFixed(2)} €
                    </Typography>

                    {/* Add to Cart Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={disableCart || out}
                        onClick={() => onAddToCart(product.id)}
                        sx={{
                            py: 1.25,
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            textTransform: "uppercase",
                        }}
                    >
                        {out ? "Out of Stock" : "Add to Cart"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
