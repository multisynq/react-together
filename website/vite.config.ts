import ViteYaml from '@modyfi/vite-plugin-yaml'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
//import { defineConfig } from 'vite'
import { defineConfig } from './vite.croquet'

export default defineConfig({
  plugins: [ViteYaml(), react(), tsconfigPaths()],
  base: './',
  assetsInclude: ['./src/images/*'],
  build: {
    minify: true,
    cssMinify: 'esbuild',
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
})
