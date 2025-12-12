import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Grid,
    InputAdornment,
    Pagination,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishListContext";
import { useProducts } from "../hooks/useProducts";

const PAGE_SIZE = 8;

export default function ProductsPage() {
    const navigate = useNavigate();
    const { products, loading, error } = useProducts(true);
    const cart = useCartContext();
    const wishlist = useWishlistContext();

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) =>
            `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)
        );
    }, [products, query]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const visible = useMemo(() => {
        const safe = Math.min(page, pageCount);
        const start = (safe - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, page, pageCount]);

    const onQueryChange = (v: string) => {
        setQuery(v);
        setPage(1);
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* Header with Search */}
                <Stack spacing={3}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        All Products
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Search products, categories..."
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            maxWidth: 600,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />
                </Stack>

                {/* Errors */}
                {(error || cart.error || wishlist.error) && (
                    <Stack spacing={1}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {cart.error && <Alert severity="error">{cart.error}</Alert>}
                        {wishlist.error && <Alert severity="error">{wishlist.error}</Alert>}
                    </Stack>
                )}

                {/* Results Count */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ py: 1 }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {query ? "Search Results" : "Our Collection"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                    </Typography>
                </Stack>

                {/* Products Grid */}
                {filtered.length === 0 ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            px: 2,
                        }}
                    >
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No products found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Try adjusting your search terms
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {visible.map((p) => (
                            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <ProductCard
                                    product={p}
                                    inWishlist={wishlist.has(p.id)}
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
                )}

                {/* Pagination */}
                {filtered.length > PAGE_SIZE && (
                    <Stack direction="row" justifyContent="center" sx={{ pt: 2 }}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={(_, v) => setPage(v)}
                            color="primary"
                            size="large"
                        />
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}
