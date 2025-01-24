/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B2C',
        secondary: '#1A2835',
        background: '#0A1219',
        surface: '#111E29',
      },
    },
  },
  plugins: [],
};