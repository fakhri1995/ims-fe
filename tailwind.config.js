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
        '500' : '50rem',
      },
      fontFamily:{
        mont: ['Montserrat']
      },
      backgroundColor: theme => ({
        'primary': '#1890ff',
        'secondary': '#60A5FA',
        'ternary': `rgb(230,247,255)`,
        'primary100': '#35763B',
        'primary75': '#65976a',
        'primary50': '#95b898',
        'primary25': '#c4d8c7',
        'primary10': '#d8e8da',
        'backdrop': '#F4FAF5',
        'mono30': `#4D4D4D`,
        'mono50': `#808080`,
        'mono80': `#CCCCCC`,
        'mono90': `#E5E5E5`,
        'state1': `#BF4A40`,
        'state2': `#DDB44A`,
        'bgPrimary': `#edf3ee`,
        'bgSecondary': `#ebf1eb`
      }),
      borderColor: theme =>({
        'primary': '#1890ff',
        'secondary': '#60A5FA',
        'primary100': '#35763B',
        'primary75': '#65976a',
        'primary50': '#95b898',
        'primary25': '#c4d8c7',
        'primary10': '#d8e8da',
        'backdrop': '#F4FAF5',
        'mono30': `#4D4D4D`,
        'mono50': `#808080`,
        'mono80': `#CCCCCC`,
        'mono90': `#E5E5E5`,
        'state1': `#BF4A40`,
        'state2': `#DDB44A`,
        'bgPrimary': `#edf3ee`,
        'bgSecondary': `#ebf1eb`
      }),
      textColor: {
        'primary100': '#35763B',
        'primary75': '#65976a',
        'primary50': '#95b898',
        'primary25': '#c4d8c7',
        'primary10': '#d8e8da',
        'backdrop': '#F4FAF5',
        'mono30': `#4D4D4D`,
        'mono50': `#808080`,
        'mono80': `#CCCCCC`,
        'mono90': `#E5E5E5`,
        'state1': `#BF4A40`,
        'state2': `#DDB44A`,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
