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
  test: {
    // Vitest configuration — run schema/logic unit tests without a browser
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
})
