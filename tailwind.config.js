/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter-Roman", "sans-serif"],
        mono: ["Cascadia", "monospace"],
      },
      colors: {
        midnight: "#1E1E1E",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
