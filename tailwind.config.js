/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app.jsx", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f5f4",
        secondary: "#d97706",
        hoverColor: "#1e293b",
        colorText: "#ffffff",
        borderColor: "#d4d4d8",
        textHoverColor: "#fafafa",
        mainTableColor: "#1e293b",
        focusColor: "#1d4ed8",
        zebraColor: "#cbd5e1",
        hoverTable: "#374151",
        buttonColor: "#3b82f6",
        hoverbuttonColor: "#4f46e5",
        buttontextColor: "#ffffff",
      },
    },
  },
  plugins: [],
};
