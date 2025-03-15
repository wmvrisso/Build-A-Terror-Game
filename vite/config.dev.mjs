import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    css: {
        postcss: "postcss.config.cjs", // Retain this from your config
    },
    server: {
        proxy: {
            '/api': { target: 'http://localhost:3000', changeOrigin: true, secure: false } // Keep your API proxy
        },
        open: true,
        port: 5173, // Keep your port setting
    },
});
