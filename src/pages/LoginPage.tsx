import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { setToken, getToken } from "../state/authStore";
import { useEffect } from "react";

type TokenResponse = { token: string };

export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => { // Redirect if already logged in
      if (getToken()) navigate("/products");
    }, [navigate]);

    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("admin123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data } = await api.post<TokenResponse>("/token", { email, password });
            setToken(data.token);
            navigate("/products");
        } catch (err: any) {
            const msg = err?.response?.data?.error ?? "Unauthorized";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
            <Card>
                <CardContent>
                    <Stack spacing={2} component="form" onSubmit={onSubmit}>
                        <Typography variant="h5" fontWeight={800}>
                            Login
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />

                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
