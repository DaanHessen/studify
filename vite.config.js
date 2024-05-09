// eslint-disable import/no-extraneous-dependencies 
// vite.config.js

import { resolve } from 'path'
import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'nested/about.html'),
                contact: resolve(__dirname, 'nested/contact.html'),
            },
        },
    },
})
