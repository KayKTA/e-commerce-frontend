import {
    Alert,
    Box,
    Button,
    Card,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function validate() {
        if (!name.trim()) return "Name is required";
        if (!email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
        if (!message.trim()) return "Message is required";
        if (message.trim().length > 500) return "Message must be under 500 characters";
        return null;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSuccess(false);
        const v = validate();
        if (v) return setError(v);

        setError(null);
        setLoading(true);

        try {
            // Simulate API call
            await new Promise((r) => setTimeout(r, 800));
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Card
                sx={{
                    overflow: "hidden",
                    borderRadius: 2,
                    // boxShadow: 3,
                }}
            >
                <Grid container>
                    {/* Left side - Form */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Box sx={{ p: { xs: 3, md: 5 } }}>
                            <Stack component="form" spacing={3} onSubmit={onSubmit}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: "1.75rem", md: "2rem" },
                                    }}
                                >
                                    Contact Us
                                </Typography>

                                {error && <Alert severity="error">{error}</Alert>}
                                {success && (
                                    <Alert severity="success">
                                        Message sent successfully! We'll get back to you soon.
                                    </Alert>
                                )}

                                <Stack spacing={2.5}>
                                    <TextField
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        required
                                        size="small"
                                    />

                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        required
                                        size="small"
                                    />

                                    <TextField
                                        label="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        multiline
                                        rows={5}
                                        fullWidth
                                        required
                                    />
                                </Stack>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    fullWidth
                                    sx={{
                                        py: 1.5,
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {loading ? "Sending..." : "Submit"}
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Right side - Decorative */}
                    <Grid
                        size={{ xs: 0, md: 5 }}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            bgcolor: "primary.main",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Decorative circles */}
                        <Box
                            sx={{
                                position: "absolute",
                                width: 300,
                                height: 300,
                                borderRadius: "50%",
                                bgcolor: "rgba(255, 255, 255, 0.08)",
                                top: -100,
                                right: -100,
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                bgcolor: "rgba(255, 255, 255, 0.05)",
                                bottom: -50,
                                left: -50,
                            }}
                        />

                        <Stack
                            spacing={2}
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                textAlign: "center",
                                color: "primary.contrastText",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1.75rem",
                                    lineHeight: 1.3,
                                }}
                            >
                                We'd love to
                                <br />
                                hear from you
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    opacity: 0.9,
                                    fontSize: "0.95rem",
                                }}
                            >
                                Get in touch and let us know
                                <br />
                                how we can help
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}
