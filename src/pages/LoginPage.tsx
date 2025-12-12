import { useState, useEffect } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { api } from "../api/client";
import { setToken, getToken } from "../state/authStore";

type TokenResponse = { token: string };

export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in
        if (getToken()) navigate("/");
    }, [navigate]);

    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("admin");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data } = await api.post<TokenResponse>("/token", { email, password });
            setToken(data.token);
            navigate("/");
        } catch (err: any) {
            const msg = err?.response?.data?.error ?? "Invalid credentials";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                bgcolor: "background.default",
                py: 8,
            }}
        >
            <Container maxWidth="sm">
                <Stack spacing={4} alignItems="center">
                    {/* Logo/Brand */}
                    <Stack spacing={2} alignItems="center">
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                bgcolor: "primary.main",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FitnessCenterIcon
                                sx={{ fontSize: 40, color: "primary.contrastText" }}
                            />
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                textAlign: "center",
                            }}
                        >
                            ALTEN SHOP
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center">
                            Sign in to access your account
                        </Typography>
                    </Stack>

                    {/* Login Card */}
                    <Card
                        sx={{
                            width: "100%",
                            borderRadius: 3,
                            boxShadow: 3,
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Stack spacing={3} component="form" onSubmit={onSubmit}>
                                <Typography variant="h5" fontWeight={700}>
                                    Welcome back
                                </Typography>

                                {error && <Alert severity="error">{error}</Alert>}

                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    fullWidth
                                    required
                                />

                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    fullWidth
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        py: 1.5,
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Demo Credentials Info */}
                    <Box
                        sx={{
                            bgcolor: "info.lighter",
                            borderRadius: 2,
                            p: 2,
                            width: "100%",
                        }}
                    >
                        <Typography variant="body2" color="info.dark" textAlign="center">
                            <strong>Demo credentials:</strong> admin@admin.com / admin
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
