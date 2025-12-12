import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishListContext";
import ProductCard from "./ProductCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function FeaturedProducts() {
    const navigate = useNavigate();
    const { products, loading } = useProducts(true);
    const cart = useCartContext();
    const wishlist = useWishlistContext();

    // Get first 4 products
    const featured = products.slice(0, 4);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* Section Header */}
                <Stack spacing={1} alignItems="center" textAlign="center">
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.75rem", md: "2.5rem" },
                            color: "text.primary",
                        }}
                    >
                        Our Products
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600 }}
                    >
                        Premium fitness wear and accessories crafted for performance
                    </Typography>
                </Stack>

                {/* Products Grid */}
                <Grid container spacing={3}>
                    {featured.map((product) => (
                        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                            <ProductCard
                                product={product}
                                inWishlist={wishlist.has(product.id)}
                                disableCart={cart.mutating}
                                disableWishlist={wishlist.mutating}
                                onAddToCart={(id) => cart.add(id, 1)}
                                onToggleWishlist={(id, next) =>
                                    next ? wishlist.add(id) : wishlist.remove(id)
                                }
                                onOpenDetails={(id) => navigate(`/products/${id}`)}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* See More CTA */}
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate("/products")}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: "1rem",
                        }}
                    >
                        See More Products
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}
