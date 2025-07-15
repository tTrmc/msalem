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
        // Using CSS variables for theme switching
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#faf7f0",
          100: "#f5efe0",
          200: "#ead7b8",
          300: "#ddbf8b",
          400: "#c9a668",
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
          300: "#d2c0a8",
          400: "#bfa282",
          500: "var(--accent)",
          600: "#a37a5d",
          700: "#88654e",
          800: "#6e5242",
          900: "#594338",
          950: "#2f221c",
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #faf7f0 0%, #f5efe0 50%, #ead7b8 100%)',
        'stone-gradient': 'linear-gradient(135deg, #fafaf9 0%, #e7e5e4 50%, #d6d3d1 100%)',
        'dark-warm-gradient': 'linear-gradient(135deg, #2d2a24 0%, #44403c 50%, #57534e 100%)',
      },
    },
  },
  plugins: [],
}

export default config
