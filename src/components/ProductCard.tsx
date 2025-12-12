import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

type Props = {
    product: Product;
    inWishlist: boolean;
    disableCart?: boolean;
    disableWishlist?: boolean;
    onAddToCart: (productId: number) => void;
    onToggleWishlist: (productId: number, next: boolean) => void; // next=true => add
};

export default function ProductCard({
    product,
    inWishlist,
    disableCart,
    disableWishlist,
    onAddToCart,
    onToggleWishlist,
}: Props) {
    return (
        <Paper variant="outlined" sx={{ p: 2, borderColor: "divider", bgcolor: "background.paper" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                {/* Left clickable area */}
                <Stack
                    component={Link}
                    to={`/products/${product.id}`}
                    spacing={0.25}
                    sx={{
                        minWidth: 0,
                        textDecoration: "none",
                        color: "inherit",
                        flex: 1,
                        "&:hover .title": { textDecoration: "underline" },
                    }}
                >
                    <Typography className="title" fontWeight={800} noWrap>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.category} - {product.inventoryStatus}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {product.description}
                    </Typography>
                </Stack>

                {/* Right actions */}
                <Stack spacing={1} alignItems="flex-end">
                    <Typography fontWeight={800} sx={{ whiteSpace: "nowrap" }}>
                        {product.price.toFixed(2)} €
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Button
                            size="small"
                            variant="outlined"
                            disabled={disableCart || product.inventoryStatus === "OUTOFSTOCK"}
                            onClick={() => onAddToCart(product.id)}
                        >
                            Add to cart
                        </Button>

                        <Button
                            size="small"
                            variant={inWishlist ? "contained" : "text"}
                            disabled={disableWishlist}
                            onClick={() => onToggleWishlist(product.id, !inWishlist)}
                        >
                            {inWishlist ? "Wishlisted" : "Wishlist"}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}
