import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#fff7f2",
          100: "#fee8dc",
          200: "#fbd4c0",
          300: "#f5bea4",
          400: "#eda78c",
          DEFAULT: "var(--primary)",
          500: "var(--primary)",
          600: "#d69373",
          700: "#b3765b",
          800: "#8f5947",
          900: "#734639",
          950: "#40241f",
        },
        stone: {
          50: "#f6ede6",
          100: "#ead7ca",
          200: "#ddc1b0",
          300: "#d0aa96",
          400: "#c09882",
          DEFAULT: "var(--stone)",
          500: "var(--stone)",
          600: "#a67f6c",
          700: "#896658",
          800: "#6c4f43",
          900: "#4a342d",
          950: "#2a1c1a",
        },
        warm: {
          50: "#fdeeea",
          100: "#f9d6cd",
          200: "#f3b2a3",
          300: "#ea8d7d",
          400: "#dc6c5d",
          DEFAULT: "var(--warm)",
          500: "var(--warm)",
          600: "#b95548",
          700: "#934239",
          800: "#6f302b",
          900: "#4b1f1d",
          950: "#2a1011",
        },
        accent: {
          50: "#f4ece7",
          100: "#e6d2c9",
          200: "#d3b4a8",
          300: "#bd9488",
          400: "#a77971",
          DEFAULT: "var(--accent)",
          500: "var(--accent)",
          600: "#896057",
          700: "#6c4a43",
          800: "#503631",
          900: "#372421",
          950: "#211513",
        }
      },
      fontFamily: {
        display: ['var(--font-supply)', 'serif'],
        body: ['var(--font-grotesque)', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

export default config
