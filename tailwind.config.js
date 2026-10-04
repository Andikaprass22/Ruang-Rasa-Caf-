/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4EEE5",
        ivory: "#FBF8F3",
        sand: "#E5DACA",
        espresso: "#221A15",
        mocha: "#6B5949",
        taupe: "#7A6A57",
        terracotta: "#9C5B3B",
        brass: "#B0894F",
        sage: "#6E7458",
        olive: "#6E7458",
        gold: "#B0894F",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(34,26,21,0.04), 0 8px 20px -14px rgba(34,26,21,0.16)",
        lift: "0 2px 4px rgba(34,26,21,0.05), 0 16px 30px -18px rgba(34,26,21,0.22)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
