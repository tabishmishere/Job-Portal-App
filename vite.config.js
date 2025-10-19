import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  
  theme: {
    extend: {
      colors: {
        dashboard: "#f3f7f5",
        primary: "#1c3b2f",
        accent: "#d5f43f",
        muted: "#7f8c8d",
      },
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
