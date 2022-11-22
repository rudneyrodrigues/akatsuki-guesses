/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          100: "#E1E1E6",
          200: "#C4C4CC",
          300: "#8D8D99",
          400: "#7C7C8A",
          500: "#505059",
          600: "#323238",
          700: "#29292E",
          800: "#202024",
          900: "#121214",
        }
      },
      fontFamily: {
        sans: "'Roboto', sans-serif",
        title: "'Rajdhani', sans-serif",
      },
      keyframes: {
        "emerge-from-bottom": {
          "from": {
            opacity: "0",
            transform: "translateY(16px)",
          },
          "to": {
            opacity: "1",
            transform: "translateY(0)",
          }
        },
        "emerge-from-top": {
          "from": {
            opacity: "0",
            transform: "translateY(-16px)",
          },
          "to": {
            opacity: "1",
            transform: "translateY(0)",
          }
        },
        "appear": {
          "from": {
            opacity: "0",
          },
          "to": {
            opacity: "1",
          }
        }
      },
      animation: {
        "emerge-from-bottom": "emerge-from-bottom .3s ease-in-out",
        "emerge-from-top": "emerge-from-top .3s ease-in-out",
        appear: "appear .3s ease-in-out",
      }
    },
  },
  plugins: [],
}
