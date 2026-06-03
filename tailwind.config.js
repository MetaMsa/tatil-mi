module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [import("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};