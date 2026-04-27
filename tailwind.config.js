/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f3d9a8',
          300: '#e8be6e',
          400: '#d9a03a',
          500: '#c4871e',
          600: '#a06a14',
          700: '#7d5013',
          800: '#634016',
          900: '#523617',
        },
        gut: {
          green: '#4a7c59',
          warm: '#8b5e3c',
          soft: '#f5ede0',
        }
      },
    },
  },
  plugins: [],
}
