import { MultisynqRoot, useModelSelector, usePublish, useView } from '@multisynq/react'
import { createContext, ReactNode, useContext, useMemo, useCallback, useState, useEffect } from 'react'
import { createStableActivityConfig } from '../utils/activityUtils'
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

// Single context interface for the Context pattern
export interface IActivitySynqContext {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  userId?: string
  config: ActivitySynqConfig
}

const ActivitySynqContext = createContext<IActivitySynqContext | undefined>(undefined)

// Internal provider that uses @multisynq/react hooks properly
function ActivitySynqInternalProvider({
  children,
  config
}: {
  children: ReactNode
  config: ActivitySynqConfig
}) {
  const view = useView<ActivityModel>()
  
  // Use useModelSelector for efficient activities updates
  const activities = useModelSelector((model: ActivityModel) => model.activities) ?? []
  
  // Use useModelSelector for connection status
  const isConnected = useModelSelector((model: ActivityModel) => model !== null)
  
  // Calculate status based on view state
  const status: ConnectionStatus = useMemo(() => {
    if (!view) return 'initializing'
    if (!isConnected) return 'disconnected'
    return 'ready'
  }, [view, isConnected])

  const isReady = status === 'ready'
  const error = null // @multisynq/react handles errors internally

  // Use usePublish hook for proper event publishing
  const publishAddActivity = usePublish<{ type: string; data?: any }>((type: string, data?: any) => [
    view?.model?.id || '',
    'add_activity', 
    { type, data: config.userId ? { ...data, userId: config.userId } : data }
  ])

  const publishClearActivities = usePublish<{}>(() => [
    view?.model?.id || '',
    'clear_activities',
    {}
  ])

  // Register activity function using proper publish pattern
  const registerActivity = useCallback(<T = any>(type: string, data?: T): void => {
    if (!isReady) {
      console.warn('ActivitySynq: Cannot register activity - not ready')
      return
    }
    publishAddActivity(type, data)
  }, [isReady, publishAddActivity])

  // Clear activities function using proper publish pattern
  const clearActivities = useCallback((): void => {
    if (!isReady) {
      console.warn('ActivitySynq: Cannot clear activities - not ready')
      return
    }
    publishClearActivities()
  }, [isReady, publishClearActivities])

  // Add automatic reconnection logic
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const maxReconnectAttempts = 5

  useEffect(() => {
    if (status === 'disconnected' && reconnectAttempts < maxReconnectAttempts) {
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000) // Exponential backoff
      
      console.log(`🔄 Attempting reconnection ${reconnectAttempts + 1}/${maxReconnectAttempts} in ${delay}ms`)
      
      const timer = setTimeout(() => {
        setReconnectAttempts(prev => prev + 1)
        // Force component remount to trigger reconnection
        window.location.reload()
      }, delay)
      
      return () => clearTimeout(timer)
    } else if (status === 'ready') {
      // Reset reconnect attempts on successful connection
      setReconnectAttempts(0)
    }
  }, [status, reconnectAttempts])

  // Handle onActivity callback when new activities arrive
  const prevActivitiesLength = useMemo(() => activities.length, [])
  if (activities.length > prevActivitiesLength && activities.length > 0) {
    const newActivity = activities[0]
    config.onActivity?.(newActivity)
  }

  // Single context value
  const contextValue: IActivitySynqContext = useMemo(() => ({
    registerActivity,
    clearActivities,
    activities,
    isReady,
    status,
    error,
    userId: config.userId,
    config
  }), [registerActivity, clearActivities, activities, isReady, status, error, config.userId, config])

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
  // Create stable configuration to prevent session recreation
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

  // Error state for missing API key
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
        config: memoizedConfig
      }}>
        {children}
      </ActivitySynqContext.Provider>
    )
  }

  // Use MultisynqRoot with proper session parameters
  return (
    <MultisynqRoot
      sessionParams={{
        model: ActivityModel,
        name: memoizedConfig.sessionName!,
        password: memoizedConfig.sessionPassword!,
        appId: memoizedConfig.appId!,
        apiKey: memoizedConfig.apiKey!,
        viewData: { userId: memoizedConfig.userId },
        tps: 10, // Stable TPS for consistent performance
        options: { trackViews: true } // Enable view tracking for multi-user features
      }}
      showChildrenWithoutSession
    >
      <ActivitySynqInternalProvider config={{ ...memoizedConfig, onActivity: config.onActivity }}>
        {children}
      </ActivitySynqInternalProvider>
    </MultisynqRoot>
  )
}

// Main hook for the Context pattern
export const useActivitySynq = (): IActivitySynqContext => {
  const context = useContext(ActivitySynqContext)
  
  if (context === undefined) {
    throw new Error('useActivitySynq must be used within an ActivitySynqProvider')
  }
  
  return context
}