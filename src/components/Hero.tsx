import { Box, Button, Stack, Typography, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <Box
            sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                py: { xs: 6, md: 10 },
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* Left side - Content */}
                    <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "500px" } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: "2rem", md: "3rem" },
                                lineHeight: 1.2,
                            }}
                        >
                            Elevate Your Performance,
                            <br />
                            With Style & Comfort
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                opacity: 0.9,
                                fontSize: { xs: "0.95rem", md: "1rem" },
                            }}
                        >
                            Discover our premium collection of fitness wear and accessories designed for athletes who demand both performance and style. Quality crafted, performance tested.
                        </Typography>

                        <Stack spacing={1} sx={{ mb: 4 }}>
                            {[
                                "Premium Quality Materials",
                                "Designed for Performance",
                                "Sustainable Manufacturing",
                                "Award Winning Design",
                            ].map((item) => (
                                <Stack
                                    key={item}
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                                    <Typography variant="body2">{item}</Typography>
                                </Stack>
                            ))}
                        </Stack>

                        <Button
                            component={Link}
                            to="/products"
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "primary.contrastText",
                                color: "primary.main",
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                "&:hover": {
                                    bgcolor: "rgba(255, 255, 255, 0.9)",
                                },
                            }}
                        >
                            SHOP NOW
                        </Button>
                    </Box>

                    {/* Right side - Product showcase */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            minHeight: { xs: 300, md: 450 },
                        }}
                    >
                        {/* Background decorative elements */}
                        <Box
                            sx={{
                                position: "absolute",
                                right: { xs: "10%", md: "20%" },
                                top: "10%",
                                width: 200,
                                height: 280,
                                bgcolor: "secondary.main",
                                borderRadius: 3,
                                transform: "rotate(-5deg)",
                                zIndex: 1,
                            }}
                        />

                        {/* Product placeholder */}
                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 2,
                                width: { xs: 250, md: 350 },
                                height: { xs: 300, md: 400 },
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: 3,
                                border: "2px dashed rgba(255, 255, 255, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                Hero Product Image
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
