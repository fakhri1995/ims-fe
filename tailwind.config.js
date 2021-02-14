module.exports = {
  // purge: ['./pages/**/*.tsx', './styles/**/*.css'],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        '108' : '27rem',
        '120' : '30rem',
        '224' : '37rem',
      },
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
