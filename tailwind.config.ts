import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        "sm": { min: "200px", max: "600px" },
        "md": { min: "601px", max: "1050px" },
        "lg": "1050px",
        "xl": "1280px",
        "2xl": "1536px",
        "4k": "2050px"
      },
    },
  },
  plugins: [],
} satisfies Config;
