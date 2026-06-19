import type { Config } from "tailwindcss";

/**
 * Paleta da marca (sobria, premium e moderna).
 * - "deep"   = azul profundo (cor principal da marca)
 * - "accent" = azul mais vivo (links e destaques)
 * - "signal" = vermelho usado de forma MUITO pontual (badges/detalhes)
 * Os tons de cinza usam a escala "slate" padrao do Tailwind.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          50: "#f0f5fa",
          100: "#dbe7f2",
          200: "#b8cfe5",
          300: "#8badd1",
          400: "#5784b6",
          500: "#36639a",
          600: "#284d7d",
          700: "#1f3c63",
          800: "#152b48",
          900: "#0a2540",
          950: "#06182b",
        },
        accent: {
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
        },
        signal: {
          DEFAULT: "#dc2626",
          dark: "#b91c1c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10, 37, 64, 0.04), 0 8px 24px -12px rgba(10, 37, 64, 0.18)",
        "soft-lg":
          "0 1px 2px rgba(10, 37, 64, 0.05), 0 24px 48px -16px rgba(10, 37, 64, 0.22)",
        glow: "0 18px 40px -12px rgba(37, 99, 235, 0.45)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
