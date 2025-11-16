/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gator-green-dark': '#4A6B52',
        'gator-green': '#6B8E6F',
        'gator-green-light': '#EDF4ED',
        'gold': '#FFB966',
        'success': '#6B8E6F',
        'navy': '#0F0F2D',
      },
      fontFamily: {
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
        'heading': ['Syne', 'DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
