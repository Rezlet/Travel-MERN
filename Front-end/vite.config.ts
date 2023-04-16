import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import path from 'path'

export default defineConfig({
  plugins: [
    react(), 
    // tailwindcss('./tailwind.config.js')
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/assets/') },
    ],
  },
});