// vite.config.ts
import react from "file:///mnt/c/git/multisynq/react-together/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { glob } from "file:///mnt/c/git/multisynq/react-together/node_modules/glob/dist/esm/index.js";
import { extname, relative } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "file:///mnt/c/git/multisynq/react-together/node_modules/vite/dist/node/index.js";
import dts from "file:///mnt/c/git/multisynq/react-together/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///mnt/c/git/multisynq/react-together/node_modules/vite-plugin-lib-inject-css/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///mnt/c/git/multisynq/react-together/packages/react-together-primereact/vite.config.ts";
var vite_config_default = defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: "src/index.ts",
      formats: ["es"]
    },
    rollupOptions: {
      external: (id) => ["react-together", "primereact", "react"].some(
        (v) => id.startsWith(v)
      ),
      input: Object.fromEntries(
        glob.sync("src/**/*.{ts,tsx}", {
          ignore: ["src/**/*.d.ts"]
        }).map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative("src", file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js"
      }
    }
  },
  plugins: [react(), libInjectCss(), dts({ include: ["src"] })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvZ2l0L211bHRpc3lucS9yZWFjdC10b2dldGhlci9wYWNrYWdlcy9yZWFjdC10b2dldGhlci1wcmltZXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvZ2l0L211bHRpc3lucS9yZWFjdC10b2dldGhlci9wYWNrYWdlcy9yZWFjdC10b2dldGhlci1wcmltZXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9naXQvbXVsdGlzeW5xL3JlYWN0LXRvZ2V0aGVyL3BhY2thZ2VzL3JlYWN0LXRvZ2V0aGVyLXByaW1lcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHsgZ2xvYiB9IGZyb20gJ2dsb2InXG5pbXBvcnQgeyBleHRuYW1lLCByZWxhdGl2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSAndml0ZS1wbHVnaW4tbGliLWluamVjdC1jc3MnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICdzcmMvaW5kZXgudHMnLFxuICAgICAgZm9ybWF0czogWydlcyddXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogKGlkKSA9PlxuICAgICAgICBbJ3JlYWN0LXRvZ2V0aGVyJywgJ3ByaW1lcmVhY3QnLCAncmVhY3QnXS5zb21lKCh2KSA9PlxuICAgICAgICAgIGlkLnN0YXJ0c1dpdGgodilcbiAgICAgICAgKSxcbiAgICAgIGlucHV0OiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgIGdsb2JcbiAgICAgICAgICAuc3luYygnc3JjLyoqLyoue3RzLHRzeH0nLCB7XG4gICAgICAgICAgICBpZ25vcmU6IFsnc3JjLyoqLyouZC50cyddXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChmaWxlKSA9PiBbXG4gICAgICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZW50cnkgcG9pbnRcbiAgICAgICAgICAgIC8vIGxpYi9uZXN0ZWQvZm9vLnRzIGJlY29tZXMgbmVzdGVkL2Zvb1xuICAgICAgICAgICAgcmVsYXRpdmUoJ3NyYycsIGZpbGUuc2xpY2UoMCwgZmlsZS5sZW5ndGggLSBleHRuYW1lKGZpbGUpLmxlbmd0aCkpLFxuICAgICAgICAgICAgLy8gVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIGVudHJ5IGZpbGVcbiAgICAgICAgICAgIC8vIGxpYi9uZXN0ZWQvZm9vLnRzIGJlY29tZXMgL3Byb2plY3QvbGliL25lc3RlZC9mb28udHNcbiAgICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTChmaWxlLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgICAgIF0pXG4gICAgICApLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXScsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIGxpYkluamVjdENzcygpLCBkdHMoeyBpbmNsdWRlOiBbJ3NyYyddIH0pXVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1ksT0FBTyxXQUFXO0FBQ3RaLFNBQVMsWUFBWTtBQUNyQixTQUFTLFNBQVMsZ0JBQWdCO0FBQ2xDLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLG9CQUFvQjtBQU51TixJQUFNLDJDQUEyQztBQVNyUyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FDVCxDQUFDLGtCQUFrQixjQUFjLE9BQU8sRUFBRTtBQUFBLFFBQUssQ0FBQyxNQUM5QyxHQUFHLFdBQVcsQ0FBQztBQUFBLE1BQ2pCO0FBQUEsTUFDRixPQUFPLE9BQU87QUFBQSxRQUNaLEtBQ0csS0FBSyxxQkFBcUI7QUFBQSxVQUN6QixRQUFRLENBQUMsZUFBZTtBQUFBLFFBQzFCLENBQUMsRUFDQSxJQUFJLENBQUMsU0FBUztBQUFBO0FBQUE7QUFBQSxVQUdiLFNBQVMsT0FBTyxLQUFLLE1BQU0sR0FBRyxLQUFLLFNBQVMsUUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQUE7QUFBQTtBQUFBLFVBR2pFLGNBQWMsSUFBSSxJQUFJLE1BQU0sd0NBQWUsQ0FBQztBQUFBLFFBQzlDLENBQUM7QUFBQSxNQUNMO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDOUQsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
