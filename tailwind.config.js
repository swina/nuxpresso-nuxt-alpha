/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    fontFamily: {
      display: ['Work Sans', 'sans-serif'],
      body: ['Work Sans', 'sans-serif'],
    },
    maxWidth: {
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
    },
    gridTemplateColumns: {
      'header-classic' : '30% auto',
      'header-classic-reverse' : 'auto 30%',
      'header-3' : 'repeat(3,33%)',
      'header-4' : 'repeat(4,25%)',
      // Simple 16 column grid
      '16': 'repeat(16, minmax(0, 1fr))',
      '2' : '50% auto',
      '3' : 'repeat(3,33%)',
      'footer-4' : 'repeat(4,25%)',
      'footer-3' : 'repeat(3,33%)',
      'footer-2' : 'repeat(2,50%)',
      // Complex site-specific column configuration
      'footer': '200px minmax(900px, 1fr) 100px',
    },
    borderRadius :{ 
      'none': '0',
      'sm': '0.125rem',
      default: '0.25rem',
      default: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'xl': '4rem',
    },
    extend: {
      lineHeight : {
        '11' : '2.75rem',
        '12' : '3.0rem',
        '13' : '3.25rem',
        '14' : '3.5rem',
        '15' : '3.755rem'
      },
      fontSize : {
        '6xl' : '3.25rem',
        '7xl' : '3.5rem',
        '8xl' : '3.75rem',
        '9xl' : '4rem',
        '10xl' : '5rem',
        '20xl' : '6rem'
      },
      width : {
        'large' : '60%',
        'wide'  : '75%',
        'extrawide' : '85%'
      },
      colors: {
          'gray-extralight'  : '#F7FAFC',
          'gray-verylight'   : '#EDF2F7',
          'gray-light'       : '#E2E8F0',
          'gray-mediumlight' : '#CBD5E0',
          'gray-normal'      : '#A0AEC0',
          'gray-mediumdark'  : '#718096',
          'gray-dark'        : '#4A5568',
          'gray-verydark'    : '#2D3748',
          'gray-extradark'   : '#1A202C',

          'red-extralight'    : '#FFF5F5',
          'red-verylight'     : '#FED7D7',
          'red-light'         : '#FEB2B2',
          'red-mediumlight'   : '#FC8181',
          'red-normal'        : '#F56565',
          'red-mediumdark'    : '#E53E3E',
          'red-dark'          : '#C53030',
          'red-verydark'      : '#9B2C2C',
          'red-extradark'     : '#742A2A',

          'orange-extralight'  : '#FFFAF0',
          'orange-verylight'   : '#FEEBC8',
          'orange-light'       : '#FBD38D',
          'orange-mediumlight' : '#F6AD55',
          'orange-normal'      : '#ED8936',
          'orange-mediumdark'  : '#DD6B20',
          'orange-dark'        : '#C05621',
          'orange-verydark'    : '#9C4221',
          'orange-extradark'   : '#7B341E',

          'yellow-extralight'  : '#FFFFF0',
          'yellow-verylight'   : '#FEFCBF',
          'yellow-light'       : '#FAF089',
          'yellow-mediumlight' : '#F6E05E',
          'yellow-normal'      : '#ECC94B',
          'yellow-mediumdark'  : '#D69E2E',
          'yellow-dark'        : '#B7791F',
          'yellow-verydark'    : '#975A16',
          'yellow-extradark'   : '#744210',

          'green-extralight'  : '#F0FFF4',
          'green-verylight'   : '#C6F6D5',
          'green-light'       : '#9AE6B4',
          'green-mediumlight' : '#68D391',
          'green-normal'      : '#48BB78',
          'green-mediumdark'  : '#38A169',
          'green-dark'        : '#2F855A',
          'green-verydark'    : '#276749',
          'green-extradark'   : '#22543D',

          'teal-extralight'  : '#E6FFFA',
          'teal-verylight'   : '#B2F5EA',
          'teal-light'       : '#81E6D9',
          'teal-mediumlight' : '#4FD1C5',
          'teal-normal'      : '#38B2AC',
          'teal-mediumdark'  : '#319795',
          'teal-dark'        : '#2C7A7B',
          'teal-verydark'    : '#285E61',
          'teal-extradark'   : '#234E52',

          'blue-extralight'  : '#EBF8FF',
          'blue-verylight'   : '#BEE3F8',
          'blue-light'       : '#90CDF4',
          'blue-mediumlight' : '#63B3ED',
          'blue-normal'      : '#4299E1',
          'blue-mediumdark'  : '#3182CE',
          'blue-dark'        : '#2B6CB0',
          'blue-verydark'    : '#2C5282',
          'blue-extradark'   : '#2A4365',

          'indigo-extralight'  : '#EBF4FF',
          'indigo-verylight'   : '#C3DAFE',
          'indigo-light'       : '#A3BFFA',
          'indigo-mediumlight' : '#7F9CF5',
          'indigo-normal'      : '#667EEA',
          'indigo-mediumdark'  : '#5A67D8',
          'indigo-dark'        : '#4C51BF',
          'indigo-verydark'    : '#434190',
          'indigo-extradark'   : '#3C366B',

          'purple-extralight'  : '#FAF5FF',
          'purple-verylight'   : '#E9D8FD',
          'purple-light'       : '#D6BCFA',
          'purple-mediumlight' : '#B794F4',
          'purple-normal'      : '#9F7AEA',
          'purple-mediumdark'  : '#805AD5',
          'purple-dark'        : '#6B46C1',
          'purple-verydark'    : '#553C9A',
          'purple-extradark'   : '#44337A',

          'pink-extralight'  : '#FAF5FF',
          'pink-verylight'   : '#E9D8FD',
          'pink-light'       : '#D6BCFA',
          'pink-mediumlight' : '#B794F4',
          'pink-normal'      : '#9F7AEA',
          'pink-mediumdark'  : '#805AD5',
          'pink-dark'        : '#6B46C1',
          'pink-verydark'    : '#553C9A',
          'pink-extradark'   : '#44337A',

      }
    }
  },
  variants: {
    borderColor : [ 'responsive' , 'hover' , 'focus' ],
    backgroundColor: [ 'responsive' , 'hover' , 'focus' ]
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelistPatterns: [/^bg/,/^text/,/^border/,/^hover/,/^m/,/^p/,/^flex/,/^order/,/^md:/,/^lg:/]
    }
  }
}
