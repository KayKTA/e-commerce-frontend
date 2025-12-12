import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/login", element: <LoginPage /> },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <ProductsPage /> },
                    { path: "/products", element: <ProductsPage /> },
                ],
            },
        ],
    },
]);
