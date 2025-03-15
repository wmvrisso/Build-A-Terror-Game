// PHASER TEMPLATE HAD THE VITE SPLIT INTO TWO SEPERATE FILES, ONE FOR DEV AND ONE FOR PROD

// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // import tailwindcss from "tailwindcss"; //
// // import autoprefixer from "autoprefixer"; //

// // export default defineConfig({
// //   plugins: [react()],
// //   css: {
// //     postcss: {
// //       plugins: [tailwindcss(), autoprefixer()],
// //     },
// //   },
// // });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: "postcss.config.cjs", // Ensure Vite reads the correct file
//   },
//   server  : {
//     proxy: { 
//       '/api': {target: 'http://localhost:3000', changeOrigin: true, secure: false}
//     },
//     open: true,
//     port: 5173,
//   },
// });
