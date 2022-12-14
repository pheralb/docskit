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
      },
      fontSize: {
        mini: "15px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
