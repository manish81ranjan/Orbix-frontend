/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#020617",          // slate-950 base
        surface: "#020617",
        card: "rgba(255,255,255,0.05)",
        border: "rgba(255,255,255,0.1)",
        primary: "#6366f1"      // indigo-500
      },
      backdropBlur: {
        xs: "2px"
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
