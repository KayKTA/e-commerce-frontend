import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../state/authStore";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

type Props = {
    appName?: string;
};

export default function NavBar({ appName = "Alten Shop" }: Props) {
    const navigate = useNavigate();

    const { cart } = useCart(true);
    const { wishlist } = useWishlist(true);

    const cartCount = cart?.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0;
    const wishCount = wishlist?.productIds?.length ?? 0;

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
            }}
        >
            <Toolbar>
                <Typography
                    component={Link}
                    to="/products"
                    variant="h6"
                    sx={{ color: "text.primary", textDecoration: "none", fontWeight: 900 }}
                >
                    {appName}
                </Typography>

                <Box sx={{ flex: 1 }} />

                <Button
                    component={Link}
                    to="/cart"
                    color="inherit"
                    startIcon={
                        <Badge badgeContent={cartCount} color="primary">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                >
                    Cart
                </Button>

                <Button
                    component={Link}
                    to="/wishlist"
                    color="inherit"
                    startIcon={
                        <Badge badgeContent={wishCount} color="primary">
                            <FavoriteIcon />
                        </Badge>
                    }
                >
                    Wishlist
                </Button>

                <Button component={Link} to="/contact" color="inherit">
                    Contact
                </Button>

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                        clearToken();
                        navigate("/login");
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
