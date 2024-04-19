/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "easy-blue": "#4318FF",
        "easy-words": "#B3B7FA",
        "blue-input": "#2B3674",
        "word-nav": "#A3AED0",
        "easy-bg": '#F4F7FE',
        "btn-easy": '#3965FF'
      },
      backgroundImage: {
        "gradient-easy": "linear-gradient(to top, #4318FF, #868CFF)",
        'gradient-profile': 'linear-gradient(to left, #4318FF 0%, #A78BFA 100%)'
      },
      fontFamily: {
        'DM': ["DM Sans", "sans-serif"],
        'Poppins': ["Poppins", "sans-serif"],
      },
      transitionProperty: {
        colors:
          "background-color, border-color, color, fill, stroke, ring-color, ring-offset-color, ring-offset-width, ring-width",
      },
      gridTemplateColumns: {
        'login': "0.65fr 0.35fr",
      },
    },
  },
  plugins: [
    () => import('flowbite/plugin')
  ],
};

