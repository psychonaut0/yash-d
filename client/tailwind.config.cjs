/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        primary: ["Inter", "sans-serif"],
        accent: ["Space Grotesk", "sans-serif"],
        mono: ["Fragment Mono", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#cc3000",
          900: "#cc3000",
          800: "#e14010",
          600: "#ef5124",
          400: "#f96238",
          200: "#fc6b42",
          100: "#fc6b42",
          50: "#ffab94",
        },
        accent: {
          DEFAULT: "#00805E",
          900: "#00805E",
          800: "#08a774",
          600: "#1ec588",
          400: "#39dc9b",
          200: "#56ecad",
          100: "#75f6be",
          50: "#84fbc6",
        },
        dark: {
          DEFAULT: "#030100",
          900: "#030100",
          800: "#0b0502",
          600: "#140905",
        },
        light: {
          DEFAULT: "#ffe7e0",
        },
      },
    },
  },
  plugins: [],
};