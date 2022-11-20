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
          DEFAULT: "#A04A40",
          900: "#A04A40",
          800: "#B95A50",
          600: "#C5766D",
          400: "#D0918A",
          200: "#DCADA7",
          100: "#E8C9C5",
          50: "#EED6D3",
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
          DEFAULT: "#0A0908",
          900: "#0A0908",
          800: "#171412",
          600: "#221E1B",
        },
        light: {
          DEFAULT: "#FCEEEC",
        },
      },
    },
  },
  plugins: [],
};