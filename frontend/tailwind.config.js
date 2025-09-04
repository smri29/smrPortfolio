/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables dark mode via `dark` class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "glow-ring": "pulseGlow 6s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
  plugins: [],
};
