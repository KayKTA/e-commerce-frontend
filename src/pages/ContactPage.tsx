import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
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
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email";
        if (message.trim().length > 300) return "Message must be under 300 characters";
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
            await new Promise((r) => setTimeout(r, 300));
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ maxWidth: 640, mx: "auto" }}>
            <Stack spacing={2}>
                <Typography variant="h4" fontWeight={900}>
                    Contact
                </Typography>

                <Paper variant="outlined" sx={{ p: 2, borderColor: "divider" }}>
                    <Stack component="form" spacing={2} onSubmit={onSubmit}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">Demande de contact envoyée avec succès</Alert>}

                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField
                            label="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            multiline
                            minRows={4}
                        />

                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? "Envoi en cours..." : "Envoyer"}
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}
