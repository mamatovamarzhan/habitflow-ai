import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — React plugin + dev proxy so we can call /api/* without CORS pain.
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});
