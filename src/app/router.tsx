import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../components/HomePage";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/login", element: <LoginPage /> },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <HomePage /> },
                    { path: "/products", element: <ProductsPage /> },
                    { path: "/products/:id", element: <ProductDetailsPage /> },
                    { path: "/cart", element: <CartPage /> },
                    { path: "/wishlist", element: <WishlistPage />},
                    { path: "/contact", element: <ContactPage />}
                ],
            },
        ],
    },
]);
