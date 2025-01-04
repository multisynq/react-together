interface ImportMetaEnv {
  readonly VITE_APP_ID: string
  readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
