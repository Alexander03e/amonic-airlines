import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, '/src/assets'),
            Modules: path.resolve(__dirname, '/src/modules'),
            Pages: path.resolve(__dirname, '/src/pages'),
            Common: path.resolve(__dirname, '/src/common'),
            Src: path.resolve(__dirname, '/src'),
        },
    },
});
