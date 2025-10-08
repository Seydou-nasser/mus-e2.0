/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette musée africain
        'beige': '#F5F5DC',
        'noir-doux': '#1C1C1C',
        'ocre': '#A0522D',
        'vert-fonce': '#2E8B57',
        'or-mat': '#C0A060',
        // Variations
        'beige-fonce': '#E8E8D0',
        'ocre-clair': '#B5651D',
        'ocre-fonce': '#8B4513',
        'vert-clair': '#3CB371',
        'or-clair': '#D4AF37',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'africain': '0 4px 20px rgba(160, 82, 45, 0.15)',
        'africain-lg': '0 8px 30px rgba(160, 82, 45, 0.2)',
        'africain-xl': '0 12px 40px rgba(160, 82, 45, 0.25)',
      }
    },
  },
  plugins: [],
}
