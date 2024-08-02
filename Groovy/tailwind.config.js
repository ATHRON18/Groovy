/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}

