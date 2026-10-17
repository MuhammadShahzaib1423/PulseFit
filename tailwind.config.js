/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        volt: {
          300: '#e2ff70',
          400: '#d4f542',
          500: '#c3e62e',
          600: '#a8cc1f',
        },
        ink: {
          800: '#1c1f22',
          900: '#121416',
          950: '#0b0d0e',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
