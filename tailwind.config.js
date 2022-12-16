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
        midnight: "#191919",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
