/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          light: "#1a1a1a",
          dark: "#000000",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          light: "#2a2a2a",
          dark: "#0a0a0a",
        },
        accent: {
          DEFAULT: "#333333",
          light: "#4a4a4a",
          dark: "#262626",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cccccc",
          muted: "#999999",
        },
      },
      backgroundColor: {
        dark: "#000000",
        "dark-lighter": "#1a1a1a",
        "dark-lightest": "#2a2a2a",
      },
    },
  },
  plugins: [],
};
