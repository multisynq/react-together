import { useContext } from 'react'
import { ActivitySynqContext } from '../context/ActivitySynqContext'
import type { ActivityEvent, ConnectionStatus, ActivitySynqConfig } from '../context/ActivitySynqContext'

interface IActivitySynqGlobal {
  registerActivity: <T = any>(type: string, data?: T) => void
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  userId?: string
  config: ActivitySynqConfig
}

/**
 * Global hook for accessing ActivitySynq functionality from anywhere in the app.
 * Must be used after ActivitySynqGlobal component is mounted somewhere in the app tree.
 * 
 * This hook provides the same interface as useActivitySynq but works globally
 * without requiring a specific context wrapper around the calling component.
 * 
 * @returns ActivitySynq interface with methods and state
 * 
 * @example
 * ```tsx
 * // Somewhere in your app root:
 * <ActivitySynqGlobal config={config} />
 * 
 * // Anywhere else in your app:
 * function MyComponent() {
 *   const { registerActivity, isReady, activities } = useActivitySynqGlobal()
 *   
 *   const handleClick = () => {
 *     registerActivity('button_click', { buttonId: 'my-button' })
 *   }
 *   
 *   return <button onClick={handleClick}>Track Click</button>
 * }
 * ```
 */
export default function useActivitySynqGlobal(): IActivitySynqGlobal {
  const context = useContext(ActivitySynqContext)
  
  if (context === undefined) {
    throw new Error(
      'useActivitySynqGlobal must be used within an app that has ActivitySynqGlobal component mounted. ' +
      'Make sure to add <ActivitySynqGlobal config={config} /> somewhere in your app tree.'
    )
  }
  
  return context
}