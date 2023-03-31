/** @type {import('tailwindcss').Config} */
export default {
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
  corePlugins: {
    preflight: false,
  },
  prefix: "button-",
};
