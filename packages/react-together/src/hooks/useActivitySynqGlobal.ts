import { useCallback, useEffect, useState } from 'react'
import {
  ActivitySynqEmitter,
  ActivitySynqGlobalManager,
  activitySynq
} from '../components/ActivitySynqGlobal'
import type {
  ActivityEvent,
  ActivitySynqConfig,
  ConnectionStatus
} from '../context/ActivitySynqContext'

interface IActivitySynqGlobal {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  userId?: string
  config: ActivitySynqConfig | null
}

/**
 * Global hook for accessing ActivitySynq functionality from anywhere in the app.
 * Uses the react-toastify pattern with event emitters and portals.
 *
 * This hook works without requiring any React context wrapper around the calling component.
 * It subscribes to global events emitted by the ActivitySynqGlobalManager singleton.
 *
 * @returns ActivitySynq interface with methods and state
 *
 * @example
 * ```tsx
 * // 1. Setup once in your app root (typically App.jsx):
 * <ActivitySynqGlobal config={{ apiKey, appId, sessionName }}>
 *   <Router>
 *     <Routes>...</Routes>
 *   </Router>
 * </ActivitySynqGlobal>
 *
 * // 2. Use anywhere in your app without any context wrapper:
 * function MyComponent() {
 *   const { registerActivity, isReady, activities } = useActivitySynqGlobal()
 *
 *   const handleClick = () => {
 *     registerActivity('button_click', { buttonId: 'my-button' })
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={handleClick}>Track Click ({activities.length} activities)</button>
 *       <p>Connection: {isReady ? 'Ready' : 'Not ready'}</p>
 *     </div>
 *   )
 * }
 *
 * // 3. Or use the global API directly (like toast.success()):
 * import { activitySynq } from 'react-together'
 *
 * function handleGlobalAction() {
 *   activitySynq.registerActivity('global_action', { source: 'utility' })
 * }
 * ```
 */
export default function useActivitySynqGlobal(): IActivitySynqGlobal {
  const emitter = ActivitySynqEmitter.getInstance()
  const manager = ActivitySynqGlobalManager.getInstance()

  // Local state for reactive values
  const [activities, setActivities] = useState<ActivityEvent[]>(() =>
    manager.getActivities()
  )
  const [status, setStatus] = useState<ConnectionStatus>(
    () => manager.getStatus().status
  )
  const [isReady, setIsReady] = useState<boolean>(
    () => manager.getStatus().isReady
  )
  const [error, setError] = useState<Error | null>(
    () => manager.getStatus().error
  )
  const [config, setConfig] = useState<ActivitySynqConfig | null>(() =>
    manager.getConfig()
  )

  // Subscribe to global events
  useEffect(() => {
    // Activity events
    const unsubscribeActivity = emitter.on(
      'activity_registered',
      (activity) => {
        setActivities((prev) => [activity, ...prev.slice(0, 999)]) // Keep recent 1000
      }
    )

    const unsubscribeClear = emitter.on('activities_cleared', () => {
      setActivities([])
    })

    // Status events
    const unsubscribeStatus = emitter.on(
      'status_changed',
      ({ status: newStatus, isReady: newIsReady, error: newError }) => {
        setStatus(newStatus)
        setIsReady(newIsReady)
        setError(newError)
      }
    )

    // Config events
    const unsubscribeConfig = emitter.on('config_updated', (newConfig) => {
      setConfig(newConfig)
    })

    // Sync initial state in case we missed events
    const currentStatus = manager.getStatus()
    setStatus(currentStatus.status)
    setIsReady(currentStatus.isReady)
    setError(currentStatus.error)
    setActivities(manager.getActivities())
    setConfig(manager.getConfig())

    return () => {
      unsubscribeActivity()
      unsubscribeClear()
      unsubscribeStatus()
      unsubscribeConfig()
    }
  }, [emitter, manager])

  // Stable callback functions
  const registerActivity = useCallback(
    <T = any>(type: string, data?: T): void => {
      activitySynq.registerActivity(type, data)
    },
    []
  )

  const clearActivities = useCallback((): void => {
    activitySynq.clearActivities()
  }, [])

  return {
    registerActivity,
    clearActivities,
    activities,
    isReady,
    status,
    error,
    userId: config?.userId,
    config
  }
}

// Also export individual hooks for specific use cases
export function useActivitySynqStatus() {
  const emitter = ActivitySynqEmitter.getInstance()
  const manager = ActivitySynqGlobalManager.getInstance()

  const [status, setStatus] = useState(() => manager.getStatus().status)
  const [isReady, setIsReady] = useState(() => manager.getStatus().isReady)
  const [error, setError] = useState(() => manager.getStatus().error)

  useEffect(() => {
    const unsubscribe = emitter.on(
      'status_changed',
      ({ status: newStatus, isReady: newIsReady, error: newError }) => {
        setStatus(newStatus)
        setIsReady(newIsReady)
        setError(newError)
      }
    )

    return unsubscribe
  }, [emitter])

  return { status, isReady, error }
}

export function useActivitySynqActivities() {
  const emitter = ActivitySynqEmitter.getInstance()
  const manager = ActivitySynqGlobalManager.getInstance()

  const [activities, setActivities] = useState<ActivityEvent[]>(() =>
    manager.getActivities()
  )

  useEffect(() => {
    const unsubscribeActivity = emitter.on(
      'activity_registered',
      (activity) => {
        setActivities((prev) => [activity, ...prev.slice(0, 999)])
      }
    )

    const unsubscribeClear = emitter.on('activities_cleared', () => {
      setActivities([])
    })

    // Sync initial state
    setActivities(manager.getActivities())

    return () => {
      unsubscribeActivity()
      unsubscribeClear()
    }
  }, [emitter, manager])

  return activities
}

export function useActivitySynqActions() {
  return {
    registerActivity: activitySynq.registerActivity,
    clearActivities: activitySynq.clearActivities
  }
}

// Export the global API for non-React usage
export { activitySynq }
