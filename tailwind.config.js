/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgStripes: '#2c3440',
        shadowColor: '#141414',
        dark: {
          lighter: '#3c4757',
          base: '#222831',
          darker: '#1d222a',
        },
        light: '#FAFFFD',
        white: '#ffffff',
        color1: {
          lighter: '#59a1ea',
          base: '#3C91E6',
          darker: '#1c7bda',
        },
        color2: {
          lighter: '#b0dd49',
          base: '#A2D729',
          darker: '#8ab722',
        },
        color3: {
          lighter: '#fb9567',
          base: '#FA824C',
          darker: '#f9611c',
        },
      }
    },
  },
  plugins: [],
}
