/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFEB3B',
        lightgray: '#CCCCCC',
        danger: '#D2001A',
        dark: {
          primary: '#0F172A'
        },
        test: '#0F172A'
      },
    },
  },
  plugins: [],
}