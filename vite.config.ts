import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// base: './' is REQUIRED for SCORM packaging — all assets must use relative paths
// so the built zip works when extracted to any directory path inside an LMS
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
  ],
})
