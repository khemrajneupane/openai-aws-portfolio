import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
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
