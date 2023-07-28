/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue': {
        '50': '#eef1ff',
        '100': '#dfe5ff',
        '200': '#c6cdff',
        '300': '#a3adfe',
        '400': '#8e91fb',
        '500': '#6760f4',
        '600': '#5743e8',
        '700': '#4a35cd',
        '800': '#3d2ea5',
        '900': '#352c83',
        '950': '#201a4c',
      },
      'rose': {
        '50': '#faf5f9',
        '100': '#f6edf4',
        '200': '#efdbeb',
        '300': '#e2bfdb',
        '400': '#d29dc7',
        '500': '#be76ad',
        '600': '#a85a92',
        '700': '#8f4778',
        '800': '#773d64',
        '900': '#653656',
        '950': '#3b1c30',
      },

      'grey': {
        '50': '#f7f7f7',
        '100': '#e3e3e3',
        '200': '#c8c8c8',
        '300': '#a4a4a4',
        '400': '#808080',
        '500': '#666666',
        '600': '#515151',
        '700': '#434343',
        '800': '#383838',
        '900': '#313131',
        '950': '#1a1a1a',
    },
    

    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
