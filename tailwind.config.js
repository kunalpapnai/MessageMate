/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#047BA7",
        "primary-dense": "#005B80",
        background:"#eff2f5",
        "chat-bg": "#F2EFE9",
        "primary-light": "#C2E9FB"
      }
    },
  },
  plugins: [],
}

