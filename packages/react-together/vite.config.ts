import react from '@vitejs/plugin-react-swc'
import { glob } from 'glob'
import { extname, relative } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: (id) =>
        [
          'react',
          '@multisynq',
          'color-hash',
          'object-hash',
          'primereact',
          'primeicons',
          'unique-names-generator'
        ].some((v) => id.startsWith(v)),
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.d.ts']
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url))
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js'
      }
    }
  },
  plugins: [react(), libInjectCss(), dts({ include: ['src'] })]
})
