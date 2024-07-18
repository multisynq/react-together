import fs from 'fs';
import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// We want to load Croquet via <SCRIPT> tag
// instead of bundling it with the rest of the code
// so that we can use source maps and debug the Croquet code.
// To make this work, we need to fake an ES module because Vite
// needs that but the Croquet package does not have an ES build yet.
// Set the CROQUET_SOURCEMAPS environment variable to the source maps
// directory URL, otherwise you have to manually add the source map

export default defineConfig(({mode}) => ({
  optimizeDeps: {
    exclude: ["@croquet/croquet"], // enable transforms in dev mode
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: CROQUET_SCRIPT_PATH,
          dest: 'assets',
          rename: CROQUET_SCRIPT_NAME,
          transform: CroquetAddSourcemap(mode),
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
}))

// find the Croquet package in node_modules
// it can be either in @croquet/croquet or a dependency of @croquet/react
let CROQUET_PKG = 'node_modules/@croquet/croquet';
if (!fs.existsSync(CROQUET_PKG)) {
  CROQUET_PKG = 'node_modules/@croquet/react/' + CROQUET_PKG;
  if (!fs.existsSync(CROQUET_PKG)) {
    throw new Error('Cannot find @croquet/croquet package in node_modules');
  }
}
// get the version of the Croquet package
const CROQUET_VERSION = JSON.parse(fs.readFileSync(`${CROQUET_PKG}/package.json`, 'utf8')).version;
// grab script source path from package
const CROQUET_SCRIPT_PATH = `${CROQUET_PKG}/pub/croquet.min.js`;
// target name for the script file
const CROQUET_SCRIPT_NAME = `croquet-${CROQUET_VERSION}.min.js`;
// fake ES module to make Vite happy
const CROQUET_MODULE_SRC = `
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
              src: `assets/${CROQUET_SCRIPT_NAME}`
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

// Append source map URL to the Croquet library
const CroquetAddSourcemap = (mode) => {
  const sourcemaps = process.env.CROQUET_SOURCEMAPS;
  if (!sourcemaps || mode !== 'development') return undefined;
  return (contents) => {
    const marker = '\n//# sourceMappingURL';
    if (!contents.includes(marker)) {
      contents += `${marker}=${sourcemaps}/${CROQUET_SCRIPT_NAME}.map\n`;
    }
    return contents;
  }
}
