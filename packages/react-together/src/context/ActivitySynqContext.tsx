import { MultisynqRoot, useMultisynqContext, useView } from '@multisynq/react'
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ActivityModel from '../models/ActivityModel'

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

export const ActivitySynqContext = createContext<IActivitySynqContext | undefined>(undefined)

const generateUserId = (): string => {
  const USER_ID_LOCAL_STORAGE_KEY = '__activity-synq-userId'
  let existing: string | null = null

  if (typeof window !== 'undefined') {
    existing = localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)
  }

  if (!existing) {
    existing = Math.random().toString(36).substring(2, 15)
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, existing)
    }
  }
  return existing
}

const generateUniqueSessionName = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `activity-session-${timestamp}-${random}`
}

function ActivitySynqContextProvider({
  children,
  config
}: {
  children: ReactNode
  config: ActivitySynqConfig
}) {
  const { view, model } = useMultisynqContext()
  const hasSession = useView() !== null
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [isSynced, setIsSynced] = useState(false)
  const [status, setStatus] = useState<ConnectionStatus>('initializing')
  const [error, setError] = useState<Error | null>(null)

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
        // Read current activities from model when synced
        const activityModel = model as ActivityModel
        if (activityModel.getHistoricalActivities) {
          setActivities(activityModel.getHistoricalActivities())
        }
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

  // Subscribe to activities from model (proper Multisynq pattern)
  useEffect(() => {
    if (!view || !model) {
      return
    }

    const handleActivityReceived = (activity: ActivityEvent) => {
      // Update local activities array from model events
      setActivities(prev => [activity, ...prev.slice(0, 999)]) // Keep recent 1000
      
      // Call the onActivity callback for all activities
      config.onActivity?.(activity)
    }

    const handleActivitiesCleared = () => {
      // Clear local activities when model is cleared
      setActivities([])
    }

    view.subscribe(model.id, 'activity_received', handleActivityReceived)
    view.subscribe(model.id, 'activities_cleared', handleActivitiesCleared)

    return () => {
      view.unsubscribe(model.id, 'activity_received', handleActivityReceived)
      view.unsubscribe(model.id, 'activities_cleared', handleActivitiesCleared)
    }
  }, [view, model, config.onActivity])

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

  // Create stable config reference
  const stableConfig = useMemo(() => ({
    apiKey: config.apiKey,
    appId: config.appId,
    sessionPassword: config.sessionPassword,
    sessionName: config.sessionName,
    userId: config.userId,
    onActivity: config.onActivity,
  }), [config.apiKey, config.appId, config.sessionPassword, config.sessionName, config.userId, config.onActivity])

  const contextValue: IActivitySynqContext = useMemo(() => ({
    registerActivity,
    clearActivities,
    activities,
    isReady,
    status,
    error,
    userId: config.userId,
    config: stableConfig,
  }), [registerActivity, clearActivities, activities, isReady, status, error, config.userId, stableConfig])

  return (
    <ActivitySynqContext.Provider value={contextValue}>
      {children}
    </ActivitySynqContext.Provider>
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
  // Generate unique session name only once per component instance
  const [defaultSessionName] = useState(() => generateUniqueSessionName())

  // Memoize config with stable references
  const memoizedConfig = useMemo(() => {
    const appId = config.appId || import.meta.env.VITE_APP_ID
    const apiKey = config.apiKey || import.meta.env.VITE_API_KEY || import.meta.env.VITE_MULTISYNQ_API_KEY
    
    if (!appId) {
      console.error('ActivitySynq Error: appId is missing. Provide it via the appId prop.')
    }
    if (!apiKey) {
      console.error('ActivitySynq Error: apiKey is missing. Set VITE_API_KEY environment variable.')
    }

    return {
      userId: config.userId || generateUserId(),
      apiKey: apiKey || 'missing-api-key',
      appId: appId || 'missing-app-id',
      sessionName: config.sessionName || import.meta.env.VITE_SESSION_NAME || defaultSessionName,
      sessionPassword: config.sessionPassword || import.meta.env.VITE_SESSION_PASSWORD || 'activity-session-password',
      onActivity: config.onActivity,
    }
  }, [config.apiKey, config.appId, config.sessionName, config.sessionPassword, config.userId, config.onActivity, defaultSessionName])

  if (!memoizedConfig.apiKey || memoizedConfig.apiKey === 'missing-api-key') {
    const apiKeyError = new Error('No API key provided. Set VITE_API_KEY environment variable.')
    console.error('ActivitySynq:', apiKeyError.message)
    return (
      <ActivitySynqContext.Provider value={{
        registerActivity: () => console.warn('ActivitySynq: Not initialized - no API key'),
        clearActivities: () => console.warn('ActivitySynq: Not initialized - no API key'),
        activities: [],
        isReady: false,
        status: 'error',
        error: apiKeyError,
        userId: memoizedConfig.userId,
        config: memoizedConfig,
      }}>
        {children}
      </ActivitySynqContext.Provider>
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
        tps: 10 // Reduce from default 20 to 10 ticks per second to reduce network load
      }}
      showChildrenWithoutSession
    >
      <ActivitySynqContextProvider config={memoizedConfig}>
        {children}
      </ActivitySynqContextProvider>
    </MultisynqRoot>
  )
}

export const useActivitySynq = (): IActivitySynqContext => {
  const context = useContext(ActivitySynqContext)
  if (context === undefined) {
    throw new Error('useActivitySynq must be used within an ActivitySynqProvider')
  }
  return context
}