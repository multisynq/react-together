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
          const content = fs.readFileSync(id, 'utf8')
          const imports = new Set()

          // Replace image references and collect imports
          // Markdown:
          // ![alt1](./images/image1.png)
          //
          // Output:
          // import image1 from ./images/image1.png
          //
          // export default `![alt1](${image1})`
          //
          const resolvedContent = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
            // Handle only local paths
            if (src.startsWith('@') || src.startsWith('./') || src.startsWith('../')) {
              // Generate a unique variable name from the path
              const varName = src
                .split('/')
                .pop()
                .replace(/\.[^/.]+$/, '') // Remove extension
                .replace(/[^a-zA-Z0-9]/g, '_') // Replace non-alphanumeric with _

              // Add to imports
              imports.add(`import ${varName} from '${src}'`)

              // Replace the image source with the variable
              return `![${alt}]($\{${varName}})`
            }
            return match
          })

          // Combine imports with the markdown string
          const importsString = imports.size > 0 ? Array.from(imports).join('\n') + '\n\n' : ''
          const markdownString = JSON.stringify(resolvedContent)
            .slice(1, -1) // remove double quotes
            .replace(/`/g, '\\`') // escape backticks inside markdown

          return `${importsString}export default \`${markdownString}\``
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
  assetsInclude: ['./src/images/*', '**/*.md', '**/*.vtt'],
  build: {
    minify: true,
    cssMinify: 'esbuild',
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
})
