module.exports = {
  // mode: 'jit',
  purge: [
    './**/*.html',
    // './**/*.{js,jsx,ts,tsx,vue}',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textDecoration: ['active'],
      
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'light': ['Eina Light'],
        'semibold': ['Eina Bold'],
        'eina': ['Eina'],
        
      },
      fontSize: {
        'xxs': '.6rem',
        'smaller': '.95rem',
        'smallest': '.45rem'
      },
      textColor: {
        'base': '#000008',
      },
      screens: {
        'mobile': '600px',
        'c_large': '1200px',
        'desktop': '1440px'
      },
      maxWidth: {
        "fw": "1440px",
      },
      height: {
        custom: '18rem',
        banner: '26rem',
       },
       margin: {
        "22": '5.23rem'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
