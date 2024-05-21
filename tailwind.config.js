/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#a8a6e7',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

