module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./elements/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: '275px',
        xs: '400px'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
