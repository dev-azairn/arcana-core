import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),

      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@layout": path.resolve(__dirname, "src/components/layout"),
      "@features": path.resolve(
        __dirname,
        "src/components/features",
      ),
      "@shared": path.resolve(
        __dirname,
        "src/components/shared",
      ),
    },
  },
})
