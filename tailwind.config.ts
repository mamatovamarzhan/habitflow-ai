import type { Config } from "tailwindcss";

const config: Config = {
  // Class-based dark mode so next-themes can toggle by adding "dark" to <html>.
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wired up via next/font CSS variables in app/layout.tsx
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      colors: {
        // Warm-neutral surface palette
        surface: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          800: "#27272a",
          900: "#18181b",
          950: "#0a0a0b",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            // Articles use Lora serif for body, generous line-height
            fontFamily: "var(--font-lora), Georgia, serif",
            maxWidth: "65ch",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
