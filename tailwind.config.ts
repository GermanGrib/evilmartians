import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "18px",
        sm: "18px",
        md: "18px",
        lg: "18px",
        xl: "20px",
        "2xl": "20px",
      },
      screens: {
        DEFAULT: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "em-main": "#ffffff",
        "em-main-hover": "#a8c7fa",
        "em-main-active": "#7da6f0",
        "em-main-inactive": "#DDDDDD",
        "em-outline": "#4b4b4b",
        "em-secondary": "#005fcc",
        "em-secondary-hover": "#0077e1",
      },
    },
  },
  plugins: [],
} satisfies Config;
