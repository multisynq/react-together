import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { version as CROQUET_VERSION } from './node_modules/@croquet/croquet/package.json'

// During development, we want to load Croquet via <SCRIPT> tag
// instead of bundling it with the rest of the code
// so that we can use source maps and debug the Croquet code.
// To make this work, we need to fake an ES module because Vite
// needs that but the Croquet package does not have an ES build yet.

const CROQUET_FILE = `croquet-${CROQUET_VERSION}.min.js`;
const CROQUET_MODULE_SRC = `
  // fake ES module exports
  const { Model, View, Session, App, Constants, Data } = window.Croquet;
  export { Model, View, Session, App, Constants, Data };
`;

// Vite plugin to inject and use Croquet via <SCRIPT> tag
function CroquetViaScriptTag():Plugin {
  return {
    name: 'croquet-via-script-tag',
    transformIndexHtml: {
      order: "pre",
      handler() {
        return [
          {
            injectTo: 'head',
            tag: 'script',
            attrs: {
              src: `assets/${CROQUET_FILE}`
            }
          },
        ];
      }
    },
    load(filepath) {
      if (filepath.includes("@croquet/croquet")) {
        return CROQUET_MODULE_SRC
      }
      return null
    },
  }
}

export default defineConfig({
  optimizeDeps: {
    exclude: ["@croquet/croquet"], // enable transforms even in dev mode
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@croquet/croquet/pub/croquet.min.js',
          dest: 'assets',
          rename: CROQUET_FILE
        },
      ],
    }),
    CroquetViaScriptTag(),
    ViteYaml(),
    react(),
    tsconfigPaths()
  ],
  base: './',
  build: {
    minify: true,
    cssMinify: 'esbuild',
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'index.min.css'
          return assetInfo.name
        },
      },
    },
  },
})
