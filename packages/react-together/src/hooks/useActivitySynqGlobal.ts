import { useEffect, useState } from 'react'
import { ActivitySynqGlobalManager } from '../components/ActivitySynqGlobal'
import type { ActivityEvent, ConnectionStatus, ActivitySynqConfig } from '../context/ActivitySynqContext'

interface IActivitySynqGlobal {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  userId?: string
  config: ActivitySynqConfig
}

/**
 * Global hook for accessing ActivitySynq functionality from anywhere in the app.
 * Works with the singleton ActivitySynqGlobalManager, no React context needed.
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
  const manager = ActivitySynqGlobalManager.getInstance()
  const [, forceUpdate] = useState({})

  useEffect(() => {
    // Subscribe to manager state changes to trigger re-renders
    const unsubscribe = manager.addListener(() => {
      forceUpdate({})
    })

    return unsubscribe
  }, [manager])

  // Return current state from the singleton manager
  return manager.getState()
}