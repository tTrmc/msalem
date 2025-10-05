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
          50: "#fffbed",
          100: "#fdf5d9",
          200: "#f8edc0",
          300: "#f2e4a7",
          400: "#eddb91",
          DEFAULT: "var(--primary)",
          500: "var(--primary)",
          600: "#d6c775",
          700: "#b3a75a",
          800: "#918742",
          900: "#726831",
          950: "#403a1a",
        },
        stone: {
          50: "#f4efe4",
          100: "#e8dcc5",
          200: "#d7c6a5",
          300: "#c3b18d",
          400: "#ae9b74",
          DEFAULT: "var(--stone)",
          500: "var(--stone)",
          600: "#8f7f58",
          700: "#736648",
          800: "#574d37",
          900: "#3b3426",
          950: "#221d17",
        },
        warm: {
          50: "#f9ece5",
          100: "#f3d7cb",
          200: "#e6b7a4",
          300: "#d79882",
          400: "#c47a66",
          DEFAULT: "var(--warm)",
          500: "var(--warm)",
          600: "#a85c4e",
          700: "#88463e",
          800: "#69342f",
          900: "#4c231f",
          950: "#2a110f",
        },
        accent: {
          50: "#f1ede5",
          100: "#e1d7c7",
          200: "#cbbd9f",
          300: "#b49f7b",
          400: "#9b8763",
          DEFAULT: "var(--accent)",
          500: "var(--accent)",
          600: "#7f6d4d",
          700: "#64553c",
          800: "#4b3f2d",
          900: "#332a1f",
          950: "#1f1913",
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
