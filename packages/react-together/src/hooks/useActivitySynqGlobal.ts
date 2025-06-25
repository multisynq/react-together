import { useStore } from 'zustand'
import { activitySynqManager } from '../core/ActivitySynqManager'

/**
 * Global ActivitySynq hook that works anywhere without a context provider.
 * Requires a single <ActivitySynqGlobal /> component to be mounted somewhere in your app.
 * 
 * @example
 * ```jsx
 * // 1. Mount the component once in your app
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       <MainContent />
 *       <ActivitySynqGlobal config={{ apiKey: '...', appId: '...' }} />
 *     </div>
 *   )
 * }
 * 
 * // 2. Use the hook anywhere
 * function SomeComponent() {
 *   const { registerActivity, isReady } = useActivitySynqGlobal()
 *   
 *   const handleClick = () => {
 *     registerActivity('button_click', { buttonId: 'save' })
 *   }
 *   
 *   return <button onClick={handleClick}>Save</button>
 * }
 * ```
 */
export const useActivitySynqGlobal = () => {
  const store = useStore(activitySynqManager.store)
  
  if (!store.isConfigured) {
    console.warn(
      'ActivitySynq: Hook called before configuration. Add <ActivitySynqGlobal config={...} /> to your app first.'
    )
  }

  return {
    registerActivity: store.registerActivity,
    isReady: store.isReady,
    status: store.status,
    error: store.error,
    activities: store.activities,
    config: store.config,
    bufferedEventCount: store.bufferedEventCount,
  }
}

/**
 * Direct function to register activities outside of React components
 * 
 * @example
 * ```js
 * import { registerActivityGlobal } from 'react-together'
 * 
 * // Use in event handlers, utility functions, etc.
 * window.addEventListener('beforeunload', () => {
 *   registerActivityGlobal('page_exit', { duration: Date.now() - startTime })
 * })
 * ```
 */
export const registerActivityGlobal = <T = any>(type: string, data?: T) => {
  return activitySynqManager.store.getState().registerActivity(type, data)
}

/**
 * Get current ActivitySynq state without subscribing to changes
 */
export const getActivitySynqState = () => {
  return activitySynqManager.store.getState()
}