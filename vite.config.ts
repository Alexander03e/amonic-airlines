import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    build: {
        outDir: './build',
    },
    resolve: {
        alias: {
            Assets: resolve(__dirname, '/src/assets'),
            Modules: resolve(__dirname, '/src/modules'),
            Pages: resolve(__dirname, '/src/pages'),
            Common: resolve(__dirname, '/src/common'),
        },
    },
    base: '/amonic-airlines',
});
