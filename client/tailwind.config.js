module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths as necessary
  ],
  theme: {
    extend: {
      colors: {
        darkObsidian: "#1a1a2e",
        glowingCyan: "#00ffff",
        goldenEmber: "#ffcc00",
        shadowPurple: "#3d348b",
        abyssalTeal: "#008080",
        ancientBone: "#d4c2a8",
        crimson: "#dc143c",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
