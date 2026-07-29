/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '24px',
        lg: '40px',
        xl: '48px',
      },
    },
    extend: {
      colors: {
        primary: '#FEDE00',
        dark: '#383838',
        cream: {
          DEFAULT: '#F5EFEA',
          alt: '#F3EFEC',
        },
        'accent-blue': '#70C1FE',
        'accent-teal': '#15AA98',
        'accent-coral': '#FF7168',
        'border-soft': '#D9D9D9',

        slate: {
          50: '#FBF8F5',
          100: '#F5EFEA',
          200: '#ECE4DC',
          300: '#D9D9D9',
          400: '#B8AFA6',
          500: '#8C8279',
          600: '#6B625A',
          700: '#4A423C',
          800: '#383838',
          900: '#2A2622',
          950: '#1D1A17',
        },
        sky: {
          50: '#EFF8FF',
          100: '#DCEFFF',
          200: '#B9E0FF',
          300: '#8FCFFF',
          400: '#70C1FE',
          500: '#4FA9F0',
          600: '#3A8ED6',
          700: '#2E70AC',
          800: '#26547F',
          900: '#1F3E5C',
        },
        teal: {
          50: '#E7F7F4',
          100: '#CBEEE7',
          200: '#98DDCF',
          300: '#61C9B4',
          400: '#2FB8A0',
          500: '#15AA98',
          600: '#128E7F',
          700: '#106F65',
          800: '#0E574F',
          900: '#0B443E',
        },
        rose: {
          50: '#FFF1F0',
          100: '#FFDEDB',
          200: '#FFBAB4',
          300: '#FF988F',
          400: '#FF8078',
          500: '#FF7168',
          600: '#E85A51',
          700: '#C1453D',
          800: '#983530',
          900: '#742824',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      fontFamily: {
        poppins: ['Poppins'],
        heading: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        hand: ['"Patrick Hand"', 'cursive'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(56, 56, 56, 0.06), 0 1px 2px rgba(56, 56, 56, 0.04)',
        'card-hover': '0 20px 40px -12px rgba(56, 56, 56, 0.18)',
        'pop-yellow': '0 10px 24px -6px rgba(254, 222, 0, 0.45)',
        sticky: '0 1px 1px rgba(56,56,56,0.12), 0 10px 18px -6px rgba(56,56,56,0.28)',
        'sticky-hover': '0 2px 3px rgba(56,56,56,0.16), 0 20px 30px -8px rgba(56,56,56,0.35)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.18em',
      },
      screens: {
        '2xl': '1280px'
      }
    },
  },
  plugins: [],
}