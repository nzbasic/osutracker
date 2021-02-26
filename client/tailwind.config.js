module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        inner: ['1px solid #000000', '-1px']
      },
      boxShadow: {
        leftShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      },
      colors: {
        main: {
          one: '#ffffff',
          two: '#f0f0f0',
          three: '#23272a',
          four: '#db5a1f',
        }
      },
      fontSize: {
        'xs': '0.6rem',
      },
      screens: {
        'off': '300px',
        'tiny': '346px',
        'ms': '426px',
        'ms2': '600px',
      },
      width: {
        'graph': '80vw',
        'smgraph': 'calc(100vw - 3rem)'
      },
      height: {
        'graph': '32rem'
      }
    }
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
