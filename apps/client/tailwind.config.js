/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('ui/tailwind.config'),
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#eef4fe',
          dark: '#030a1b',
        },
        secondary: {
          DEFAULT: '#f6af3b',
          light: '#fff',
          dark: '#c07b09',
        }
      }
    },
  },
  plugins: [],
}
