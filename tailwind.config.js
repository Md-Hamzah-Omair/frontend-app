/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-jetbrains-mono)", "monospace"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        "arctic-powder": "#F1F6F4",
        "forsythia": "#FFC801",
        "nocturnal-expedition": "#114C5A",
        "mystic-mint": "#D9E8E2",
        "deep-saffron": "#FF9932",
        "oceanic-noir": "#172B36",
      },
    },
  },
  plugins: [],
};
