import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#4f46e5" },
        background: {
            default: "#0b1020",
            paper: "#0f172a",
        },
    },
    shape: { borderRadius: 14 },
    typography: {
        fontFamily: "Inter, system-ui, Arial",
    },
});
