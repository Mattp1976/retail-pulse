import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1D1D1F",
        slate: "#6E6E73",
        mist: "#F5F5F7",
        accent: "#0A84FF",
        lemon: "#F9D65C",
        warn: "#B23A48",
        cloud: "#FFFFFF",
        line: "#D2D2D7"
      },
      fontFamily: {
        display: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "sans-serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
