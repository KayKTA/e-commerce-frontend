import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../state/authStore";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishListContext";

export default function NavBar() {
    const navigate = useNavigate();
    const cart = useCartContext();
    const wishlist = useWishlistContext();

    const cartCount = cart.cart?.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0;
    const wishCount = wishlist.wishlist?.productIds?.length ?? 0;

    return (
        <AppBar position="sticky" elevation={0} color="primary">
            <Toolbar sx={{ gap: 1 }}>
                <Typography
                    component={Link}
                    to="/products"
                    variant="h6"
                    sx={{
                        color: "primary.contrastText",
                        textDecoration: "none",
                        fontWeight: 900,
                        letterSpacing: -0.2,
                    }}
                >
                    ALTEN SHOP
                </Typography>

                <Box sx={{ flex: 1 }} />

                <Button
                    component={Link}
                    to="/cart"
                    sx={{ color: "primary.contrastText" }}
                    startIcon={
                        <Badge badgeContent={cartCount} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                >
                    Cart
                </Button>

                <Button
                    component={Link}
                    to="/wishlist"
                    sx={{ color: "primary.contrastText" }}
                    startIcon={
                        <Badge badgeContent={wishCount} color="secondary">
                            <FavoriteIcon />
                        </Badge>
                    }
                >
                    Wishlist
                </Button>

                <Button
                    component={Link}
                    to="/contact"
                    sx={{ color: "primary.contrastText" }}
                    startIcon={<MailOutlineIcon />}
                >
                    Contact
                </Button>

                <Button
                    variant="outlined"
                    sx={{
                        color: "primary.contrastText",
                        borderColor: "rgba(255,255,255,0.45)",
                        "&:hover": { borderColor: "rgba(255,255,255,0.8)" },
                    }}
                    startIcon={<LogoutIcon />}
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
