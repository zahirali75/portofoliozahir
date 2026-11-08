import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // GSAP dimuat dinamis (dynamic import) — pisahkan agar bundle awal tetap kecil
    rollupOptions: {},
  },
})
