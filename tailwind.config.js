/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6f7f7',
            100: '#ccefef',
            200: '#99dfdf',
            300: '#66cfcf',
            400: '#33bfbf',
            500: '#00afaf',
            600: '#008c8c',
            700: '#006969',
            800: '#004646',
            900: '#002323',
          },
          secondary: {
            50: '#fff7e6',
            100: '#ffefcc',
            200: '#ffdf99',
            300: '#ffcf66',
            400: '#ffbf33',
            500: '#ffaf00',
            600: '#cc8c00',
            700: '#996900',
            800: '#664600',
            900: '#332300',
          },
          accent: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Montserrat', 'sans-serif'],
        },
        boxShadow: {
          card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: [],
  };