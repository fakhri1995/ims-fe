module.exports = {
  purge: ['./pages/**/*.tsx', './styles/**/*.css'],
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
