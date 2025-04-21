/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#c084fc',
          DEFAULT: '#a855f7',
          dark: '#9333ea',
        },
        secondary: {
          light: '#93c5fd',
          DEFAULT: '#60a5fa',
          dark: '#3b82f6',
        },
        background: '#0f172a',
        purple: {
          '400': '#c084fc',
          '500': '#a855f7',
          '600': '#9333ea',
        },
        indigo: {
          '600': '#6366f1',
          '950': '#1e1b4b',
        },
      },
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}