import { Box } from "@mui/material";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

export default function HomePage() {
    return (
        <Box>
            <Hero />
            <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
                <FeaturedProducts />
            </Box>
        </Box>
    );
}
