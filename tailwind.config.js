/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f8f8f8",
        "secondary": "#585858",
        }
    },
  },
  plugins: [require("daisyui")],
}

