import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                grissito: "#F5F5F5",
                azulito: "#1E48D2",
            },
            fontFamily: {
                sans: ["Menlo", ...fontFamily.sans],
                mono: ["Menlo", ...fontFamily.mono],
            },
        },
    },
    plugins: [typography],
} satisfies Config;
