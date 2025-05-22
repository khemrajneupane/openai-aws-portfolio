import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#9d50bb",
        aws: {
          orange: "#FF9900",
          blue: "#00A1E0",
          dark: "#232F3E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
