import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        denim: {
          50: "#e8effa",
          100: "#cddbf2",
          200: "#9ab4e4",
          300: "#6b91d4",
          400: "#416fbe",
          500: "#2f58a8",
          600: "#254887",
          700: "#1e3a6b",
          800: "#1a325b",
          900: "#142642",
        },
        silver: {
          100: "#f5f7f8",
          200: "#eceff1",
          300: "#dfe4e8",
          400: "#c7d0d6",
          500: "#b0bbc2",
          600: "#98a4ab",
          700: "#7f8b92",
          800: "#6c767c",
          900: "#555d62",
        },
      },
      boxShadow: {
        diamond: "0 0 10px rgba(255,255,255,0.6), 0 0 24px rgba(173,216,230,0.35)",
      },
      backgroundImage: {
        denim: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), repeating-linear-gradient(45deg, #1e3a6b 0, #1e3a6b 2px, #142642 2px, #142642 12px)",
        sparkles: "radial-gradient( circle at 20% 30%, rgba(255,255,255,0.35) 0 2px, transparent 3px), radial-gradient( circle at 80% 40%, rgba(255,255,255,0.25) 0 2px, transparent 3px), radial-gradient( circle at 60% 80%, rgba(255,255,255,0.25) 0 2px, transparent 3px)",
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 2px rgba(255,255,255,0.6))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 6px rgba(255,255,255,1))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
