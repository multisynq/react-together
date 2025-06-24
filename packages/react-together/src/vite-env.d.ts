/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY?: string
  readonly VITE_MULTISYNQ_API_KEY?: string
  readonly VITE_APP_ID?: string
  readonly VITE_SESSION_NAME?: string
  readonly VITE_SESSION_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}