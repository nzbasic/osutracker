module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        inner: ['2px solid #000000', '-2px']
      }
    },
    fontSize: {
      'xs': '0.6rem',
    },
    colors: {
      main: {
        one: '#222831',
        two: '#393e46',
        three: '#3282b8',
        four: '#eeeeee',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
