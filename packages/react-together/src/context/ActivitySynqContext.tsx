import { MultisynqRoot, useMultisynqContext, useView } from '@multisynq/react'
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import ActivityModel from '../models/ActivityModel'
import { createStableActivityConfig } from '../utils/activityUtils'

export interface ActivityEvent<T = any> {
  type: string
  data?: T
  timestamp?: number
}

export interface ActivitySynqConfig {
  apiKey?: string
  appId?: string
  sessionPassword?: string
  sessionName?: string
  userId?: string
  onActivity?: (activity: ActivityEvent) => void
}

export type ConnectionStatus = 'initializing' | 'ready' | 'disconnected' | 'error'

// Split context for better performance - stable vs volatile values
interface IActivitySynqStableContext {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  userId?: string
  config: ActivitySynqConfig
  model: ActivityModel | null
}

interface IActivitySynqVolatileContext {
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
}

export const ActivitySynqStableContext = createContext<IActivitySynqStableContext | undefined>(undefined)
export const ActivitySynqVolatileContext = createContext<IActivitySynqVolatileContext | undefined>(undefined)

function ActivitySynqContextProvider({
  children,
  config
}: {
  children: ReactNode
  config: ActivitySynqConfig
}) {
  const { view, model } = useMultisynqContext()
  const hasSession = useView() !== null
  const [isSynced, setIsSynced] = useState(false)
  const [status, setStatus] = useState<ConnectionStatus>('initializing')
  const [error, setError] = useState<Error | null>(null)
  
  // Use ref for onActivity callback to prevent session recreation
  const onActivityRef = useRef(config.onActivity)
  onActivityRef.current = config.onActivity

  // Track synchronization state
  useEffect(() => {
    if (!view || !model) {
      setIsSynced(false)
      setError(null)
      return
    }

    const handleSyncChange = (synced: boolean) => {
      setIsSynced(synced)
      if (synced) {
        setError(null)
      }
    }

    const handleError = (err: Error) => {
      setError(err)
      setIsSynced(false)
    }

    view.subscribe(view.viewId, 'synced', handleSyncChange)
    view.subscribe(view.viewId, 'error', handleError)

    return () => {
      view.unsubscribe(view.viewId, 'synced', handleSyncChange)
      view.unsubscribe(view.viewId, 'error', handleError)
    }
  }, [view, model])

  // Subscribe to activities from model for onActivity callback only
  useEffect(() => {
    if (!view || !model) {
      return
    }

    const handleActivityReceived = (activity: ActivityEvent) => {
      // Only call the onActivity callback - don't store state
      onActivityRef.current?.(activity)
    }

    view.subscribe(model.id, 'activity_received', handleActivityReceived)

    return () => {
      view.unsubscribe(model.id, 'activity_received', handleActivityReceived)
    }
  }, [view, model])

  // Calculate overall status
  useEffect(() => {
    if (!hasSession) {
      setStatus('initializing')
      setError(null)
    } else if (error) {
      setStatus('error')
    } else if (view && model && isSynced) {
      setStatus('ready')
      setError(null)
    } else if (view && model && !isSynced) {
      setStatus('disconnected')
    } else {
      setStatus('error')
      if (!error) {
        setError(new Error('Unknown connection error'))
      }
    }
  }, [hasSession, view, model, isSynced, error])

  const isReady = status === 'ready'

  // Proper Multisynq pattern: View sends event to Model only
  const registerActivity = useCallback(<T = any>(type: string, data?: T): void => {
    if (!view || !model) {
      console.warn('ActivitySynq: Cannot register activity - not connected')
      return
    }

    // Enhance data with userId if provided
    const enhancedData = config.userId ? { ...data, userId: config.userId } : data

    // Send to model via proper event - let model handle timing and storage
    view.publish(model.id, 'add_activity', {
      type,
      data: enhancedData
    })
  }, [view, model, config.userId])

  // Clear all activities using proper Multisynq pattern
  const clearActivities = useCallback((): void => {
    if (!view || !model) {
      console.warn('ActivitySynq: Cannot clear activities - not connected')
      return
    }

    // Send clear command to model - let model handle the clearing
    view.publish(model.id, 'clear_activities', {})
  }, [view, model])

  // Create stable config reference (excluding onActivity to prevent session churn)
  const stableConfig = useMemo(() => ({
    apiKey: config.apiKey,
    appId: config.appId,
    sessionPassword: config.sessionPassword,
    sessionName: config.sessionName,
    userId: config.userId,
    onActivity: config.onActivity, // Keep for compatibility but handle via ref
  }), [config.apiKey, config.appId, config.sessionPassword, config.sessionName, config.userId, config.onActivity])

  // Stable context value - functions and model reference
  const stableContextValue: IActivitySynqStableContext = useMemo(() => ({
    registerActivity,
    clearActivities,
    userId: config.userId,
    config: stableConfig,
    model: model as ActivityModel
  }), [registerActivity, clearActivities, config.userId, stableConfig, model])

  // Force re-render when activities change by listening to model events
  const [activityChangeCounter, setActivityChangeCounter] = useState(0)
  
  useEffect(() => {
    if (!view || !model) return

    const handleActivityChange = () => {
      setActivityChangeCounter(prev => prev + 1)
    }

    view.subscribe(model.id, 'activity_received', handleActivityChange)
    view.subscribe(model.id, 'activities_cleared', handleActivityChange)

    return () => {
      view.unsubscribe(model.id, 'activity_received', handleActivityChange)
      view.unsubscribe(model.id, 'activities_cleared', handleActivityChange)
    }
  }, [view, model])

  // Volatile context value - state that changes frequently 
  const volatileContextValue: IActivitySynqVolatileContext = useMemo(() => {
    // Get activities directly from model (single source of truth)
    const activities = model && (model as ActivityModel).getHistoricalActivities ? 
      (model as ActivityModel).getHistoricalActivities() : []

    return {
      activities,
      isReady,
      status,
      error
    }
  }, [model, isReady, status, error, activityChangeCounter])

  return (
    <ActivitySynqStableContext.Provider value={stableContextValue}>
      <ActivitySynqVolatileContext.Provider value={volatileContextValue}>
        {children}
      </ActivitySynqVolatileContext.Provider>
    </ActivitySynqStableContext.Provider>
  )
}

interface ActivitySynqProviderProps {
  children: ReactNode
  config?: ActivitySynqConfig
}

// Create stable default config to prevent object recreation
const DEFAULT_CONFIG: ActivitySynqConfig = {}

export const ActivitySynqProvider = ({
  children,
  config = DEFAULT_CONFIG
}: ActivitySynqProviderProps) => {
  // Use stable configuration helper to prevent session churn
  const memoizedConfig = useMemo(() => {
    const stableConfig = createStableActivityConfig(config)
    
    if (!stableConfig.appId || stableConfig.appId === 'missing-app-id') {
      console.error('ActivitySynq Error: appId is missing. Provide it via the appId prop.')
    }
    if (!stableConfig.apiKey || stableConfig.apiKey === 'missing-api-key') {
      console.error('ActivitySynq Error: apiKey is missing. Set VITE_API_KEY environment variable.')
    }

    return stableConfig
  }, [config.apiKey, config.appId, config.sessionName, config.sessionPassword, config.userId])
  // Note: Exclude config.onActivity from deps to prevent session recreation

  if (!memoizedConfig.apiKey || memoizedConfig.apiKey === 'missing-api-key') {
    const apiKeyError = new Error('No API key provided. Set VITE_API_KEY environment variable.')
    console.error('ActivitySynq:', apiKeyError.message)
    return (
      <ActivitySynqStableContext.Provider value={{
        registerActivity: () => console.warn('ActivitySynq: Not initialized - no API key'),
        clearActivities: () => console.warn('ActivitySynq: Not initialized - no API key'),
        userId: memoizedConfig.userId,
        config: memoizedConfig,
        model: null
      }}>
        <ActivitySynqVolatileContext.Provider value={{
          activities: [],
          isReady: false,
          status: 'error',
          error: apiKeyError
        }}>
          {children}
        </ActivitySynqVolatileContext.Provider>
      </ActivitySynqStableContext.Provider>
    )
  }

  return (
    <MultisynqRoot
      sessionParams={{
        model: ActivityModel,
        name: memoizedConfig.sessionName!,
        password: memoizedConfig.sessionPassword!,
        appId: memoizedConfig.appId!,
        apiKey: memoizedConfig.apiKey!,
        viewData: { userId: memoizedConfig.userId },
        // Use reduced tps for better connection stability
        tps: 10
      }}
      showChildrenWithoutSession
    >
      <ActivitySynqContextProvider config={{ ...memoizedConfig, onActivity: config.onActivity }}>
        {children}
      </ActivitySynqContextProvider>
    </MultisynqRoot>
  )
}

// Legacy interface for backwards compatibility
interface IActivitySynqContext {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  userId?: string
  config: ActivitySynqConfig
}

export const useActivitySynq = (): IActivitySynqContext => {
  const stableContext = useContext(ActivitySynqStableContext)
  const volatileContext = useContext(ActivitySynqVolatileContext)
  
  if (stableContext === undefined || volatileContext === undefined) {
    throw new Error('useActivitySynq must be used within an ActivitySynqProvider')
  }
  
  // Combine both contexts for backwards compatibility
  return {
    ...stableContext,
    ...volatileContext
  }
}

// Optimized hooks for specific use cases
export const useActivitySynqStable = (): IActivitySynqStableContext => {
  const context = useContext(ActivitySynqStableContext)
  if (context === undefined) {
    throw new Error('useActivitySynqStable must be used within an ActivitySynqProvider')
  }
  return context
}

export const useActivitySynqVolatile = (): IActivitySynqVolatileContext => {
  const context = useContext(ActivitySynqVolatileContext)
  if (context === undefined) {
    throw new Error('useActivitySynqVolatile must be used within an ActivitySynqProvider')
  }
  return context
}