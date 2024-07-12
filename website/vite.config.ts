import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import tsconfigPaths from 'vite-tsconfig-paths'
import { version as CROQUET_VERSION } from './node_modules/@croquet/croquet/package.json'

// During development, we want to load Croquet via <SCRIPT> tag
// instead of bundling it with the rest of the code
// so that we can use source maps and debug the Croquet code.
// (even better would be if we could load Croquet as an external verbatim chunk,
// but that surpasses my Vite knowledge for now --codefrau)

const CROQUET_URL = `https://cdn.jsdelivr.net/npm/@croquet/croquet@${CROQUET_VERSION}`;
const CROQUET_MODULE_SRC = `
  // fake ES module exports
  const { Model, View, Session, App, Constants, Data } = window.Croquet;
  export { Model, View, Session, App, Constants, Data };
`;

// Vite plugin to inject and use Croquet via <SCRIPT> tag
function CroquetViaScriptTag(mode: string) {
  const name = 'croquet-via-script-tag';
  if (mode !== 'development') return { name }; // no-op in production
  return {
    name,
    transformIndexHtml: {
      order: "pre",
      handler() {
        console.log(`Inserting Croquet ${CROQUET_VERSION} <SCRIPT> tag`)
        return [
          { tag: 'script', attrs: { src: CROQUET_URL } },
        ];
      }
    } as any, // variant with order spec not in the type definition yet
    load(filepath) {
      if (filepath.includes("@croquet/croquet")) {
        console.log(`Using Croquet ${CROQUET_VERSION} from <SCRIPT> tag`)
        return CROQUET_MODULE_SRC
      }
      return null
    },
  }
}

export default defineConfig(( { mode } ) => ({
  optimizeDeps: {
    exclude: ["@croquet/croquet"], // enable transforms even in dev mode
  },
  plugins: [
    CroquetViaScriptTag(mode),
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
}))