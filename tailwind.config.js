module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        "10.5": "2.7rem"
      },
      colors: {
        brand: "#1e1e3b",
        brandDarker: "#141429",
        brandSub: "#2428e2",
        brandSuccess: "#00cc8a",
        brandRed: "#f6005c",
      },
      screens: {
        minApp: '1250px'
      },
      zIndex: {
        '-1': '-1',
      }
    },
  },
  variants: {
    extend: {
      width: ['hover'],
    },
  },
  plugins: [],
};
