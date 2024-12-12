/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'custom-bg': "url('/src/assests/privacy/qw2.svg')",
      },
      colors: {
        primary: "rgba(45, 53, 31, 1)",
        "white-100": "#FFFEFE",
        "black-100": "rgba(0, 0, 0, 0.87)",
        green: "#315B12",
        tinaColor: "#1b5e20",
        tinaGray: "#212121",
      },
    },
  },
  plugins: [],
};
