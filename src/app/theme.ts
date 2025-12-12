import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: ["Inter", "Roboto", "system-ui", "sans-serif"].join(","),
        h1: { fontWeight: 700, letterSpacing: -1.2 },
        h2: { fontWeight: 700, letterSpacing: -1 },
        h3: { fontWeight: 700, letterSpacing: -0.8 },
        h4: { fontWeight: 700, letterSpacing: -0.6 },
        h5: { fontWeight: 700, letterSpacing: -0.4 },
        h6: { fontWeight: 600, letterSpacing: -0.2 },
        button: { textTransform: "none", fontWeight: 600 },
        body1: { lineHeight: 1.6 },
        body2: { lineHeight: 1.5 },
    },
    palette: {
        mode: "light",
        background: {
            default: "#fafafa",
            paper: "#ffffff",
        },
        primary: {
            main: "#2d5f5d",
            light: "#4a8280",
            dark: "#1e4241",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#e8c4b8",
            light: "#f1d9d0",
            dark: "#d4a899",
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#6b6b6b",
        },
        divider: "rgba(0,0,0,0.08)",
        success: {
            main: "#4caf50",
        },
        warning: {
            main: "#ff9800",
        },
        error: {
            main: "#f44336",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: "#d4d4d4 transparent",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        width: 8,
                    },
                    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
                        background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#d4d4d4",
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "10px 24px",
                    fontSize: "0.95rem",
                },
                sizeLarge: {
                    padding: "14px 32px",
                    fontSize: "1rem",
                },
                contained: {
                    boxShadow: "0 2px 8px rgba(45, 95, 93, 0.2)",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(45, 95, 93, 0.3)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        boxShadow: "0 0 0 3px rgba(45, 95, 93, 0.1)",
                    },
                },
            },
        },
    },
});
