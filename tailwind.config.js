/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        "mainDark": '#2B2B2B',
        "mainWhite": '#EAEAEA',
        'mainGreen': '#398F56'
      },
      keyframes: {
        'lds-ellipsis1': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        'lds-ellipsis3': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' }
        },
        'lds-ellipsis2': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(24px, 0)' }
        }
      },
      animation: {
        'lds-ellipsis1': 'lds-ellipsis1 0.6s infinite',
        'lds-ellipsis2': 'lds-ellipsis2 0.6s infinite',
        'lds-ellipsis3': 'lds-ellipsis3 0.6s infinite',
      }
    },
  },
  plugins: [],
}

