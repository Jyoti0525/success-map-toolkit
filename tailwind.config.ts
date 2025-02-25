import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          DEFAULT: "#1A365D",
          light: "#234681",
          dark: "#132849",
        },
        gold: {
          DEFAULT: "#FFD700",
          light: "#FFE03D",
          dark: "#CCB000",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        pulse: "pulse 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        spin: "spin 1.5s linear infinite",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".animation-delay-100": {
          "animation-delay": "0.1s",
        },
        ".animation-delay-200": {
          "animation-delay": "0.2s",
        },
        ".animation-delay-300": {
          "animation-delay": "0.3s",
        },
        ".animation-delay-400": {
          "animation-delay": "0.4s",
        },
        ".animation-delay-500": {
          "animation-delay": "0.5s",
        },
        ".animation-delay-600": {
          "animation-delay": "0.6s",
        },
        ".animation-delay-700": {
          "animation-delay": "0.7s",
        },
        ".animation-delay-800": {
          "animation-delay": "0.8s",
        },
        ".animation-play-paused": {
          "animation-play-state": "paused",
        },
        ".animation-fill-forwards": {
          "animation-fill-mode": "forwards",
        },
        ".backdrop-blur-xs": {
          "backdrop-filter": "blur(2px)",
        },
        ".transform-gpu": {
          "transform": "translateZ(0)",
        },
        ".shadow-card": {
          "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        },
        ".shadow-card-hover": {
          "box-shadow": "0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.12)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;