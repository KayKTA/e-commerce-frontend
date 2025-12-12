import { Alert, Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
    const { products, loading, error } = useProducts(true);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
                Products
            </Typography>

            <Stack spacing={1.5}>
                {products.map((prod) => (
                    <Paper
                        key={prod.id}
                        variant="outlined"
                        component={Link}
                        to={`/products/${prod.id}`}
                        sx={{
                            p: 2,
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            textDecoration: "none",
                            color: "inherit",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                            <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                                <Typography fontWeight={800} noWrap>
                                    {prod.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {prod.category} - {prod.inventoryStatus}
                                </Typography>
                            </Stack>

                            <Typography fontWeight={800} sx={{ whiteSpace: "nowrap" }}>
                                {prod.price.toFixed(2)} €
                            </Typography>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Stack>
    );
}
