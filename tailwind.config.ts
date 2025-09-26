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
          50: "#faf7f0",
          100: "#f5efe0",
          200: "#ead7b8",
          300: "#ddbf8b",
          400: "#c9a668",
          DEFAULT: "var(--primary)",
          500: "var(--primary)",
          600: "#a37c42",
          700: "#886138",
          800: "#6f4f33",
          900: "#5a412c",
          950: "#332319",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          DEFAULT: "var(--stone)",
          500: "var(--stone)",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        warm: {
          50: "#fefbf3",
          100: "#fef7e6",
          200: "#fcedcc",
          300: "#f9dfa8",
          400: "#f4ca73",
          DEFAULT: "var(--warm)",
          500: "var(--warm)",
          600: "#e09f30",
          700: "#bb8426",
          800: "#966923",
          900: "#7a5720",
          950: "#422e0f",
        },
        accent: {
          50: "#f9f7f4",
          100: "#f2ede6",
          200: "#e3d9cc",
          300: "#d4c5b1",
          400: "#b08968",
          DEFAULT: "var(--accent)",
          500: "var(--accent)",
          600: "#9d7a5d",
          700: "#846a52",
          800: "#6d5847",
          900: "#5a4a3d",
          950: "#2f261e",
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