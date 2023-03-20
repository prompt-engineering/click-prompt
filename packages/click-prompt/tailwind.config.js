/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // generate by https://huemint.com/website-magazine/
        white: "#ffffff",
        // Pohutukawa
        black: "#16245d",
        light: "#F8F4EA",
        blue: "#0A5CD6",
      },
    },
  },
  plugins: [],
};
