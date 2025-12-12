import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <NavBar />
            <Container sx={{ py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}
