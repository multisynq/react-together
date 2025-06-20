type ReactChildren = React.ReactElement[] | React.ReactElement

declare global {
  interface Window {
    ActivitySynq?: {
      register: (type: string, data?: any) => void
      init: (config?: import('./components/ActivitySynq').ActivitySynqConfig) => Promise<void>
    }
  }
}
