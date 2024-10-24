import ViteYaml from '@modyfi/vite-plugin-yaml'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
//import { defineConfig } from 'vite'
import { defineConfig } from './vite.croquet'

export default defineConfig({
  plugins: [
    ViteYaml(),
    react(),
    tsconfigPaths(),
    // Custom plugin to load markdown files
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.slice(-3) === '.md') {
          // For .md files, get the raw content
          return `export default ${JSON.stringify(fs.readFileSync(id, 'utf8'))};`
        }
      },
    },
    {
      name: 'watch-additional-sources',
      buildStart() {
        const additionalPaths = ['../contributing']
        additionalPaths.forEach((p) => this.addWatchFile(path.resolve(__dirname, p)))
      },
    },
  ],
  base: '/',
  assetsInclude: ['./src/images/*', '**/*.md'],
  build: {
    minify: true,
    cssMinify: 'esbuild',
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
})
