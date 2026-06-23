/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#ffcc13",
        navy: "#071121",
        purpleDark: "#160f2c",
        panelDark: "#17192d"
      }
    }
  },
  plugins: []
};
