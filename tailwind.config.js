module.exports = {
  // purge: ['./pages/**/*.tsx', './styles/**/*.css'],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        mont: ['Montserrat']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
