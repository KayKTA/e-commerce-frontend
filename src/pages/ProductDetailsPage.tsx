import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;
    if (!product) return <Alert severity="warning">Product not found</Alert>;

    return (
        <Stack spacing={2}>
            <Button component={Link} to="/products" variant="text">
                ← Back
            </Button>

            <Paper variant="outlined" sx={{ p: 2, borderColor: "divider" }}>
                <Stack spacing={0.75}>
                    <Typography variant="h5" fontWeight={900}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.category} - {product.inventoryStatus}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>{product.description}</Typography>

                    <Typography fontWeight={900} sx={{ mt: 2 }}>
                        {product.price.toFixed(2)} €
                    </Typography>
                </Stack>
            </Paper>
        </Stack>
    );
}
