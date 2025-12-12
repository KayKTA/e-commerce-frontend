import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./app/theme";
import { router } from "./app/router";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishListContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                <WishlistProvider>
                    <RouterProvider router={router} />
                </WishlistProvider>
            </CartProvider>
        </ThemeProvider>
    </React.StrictMode>
);
