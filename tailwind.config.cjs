/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        action: {
          focus: '#3073F5',
          hover: '#b3ceff'
        },
        text: {
          primary: '#606060',
          secondary: '#8A8A8A'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
