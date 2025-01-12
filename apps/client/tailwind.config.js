/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#cd2c57',  // Base color
          light: '#e05277',   // Lighter variant
          dark: '#9b223f',    // Darker variant
        },
        
      },
    },
  },
  plugins: [],
}

