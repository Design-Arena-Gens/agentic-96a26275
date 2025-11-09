import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5ff",
          100: "#d9e7ff",
          200: "#b0cfff",
          300: "#83b3ff",
          400: "#5896ff",
          500: "#387bff",
          600: "#1a5fff",
          700: "#0e4adb",
          800: "#1039a7",
          900: "#112d7f",
          950: "#0b1b4b"
        }
      }
    }
  },
  plugins: []
};

export default config;
