import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearToken, isAuthed } from "../state/authStore";

export default function Layout() {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/products"
                        variant="h6"
                        sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}
                    >
                        Alten Shop
                    </Typography>

                    <Box sx={{ flex: 1 }} />

                    {isAuthed() ? (
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
                    ) : (
                        <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}
