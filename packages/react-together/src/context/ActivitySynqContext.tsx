import { MultisynqRoot, useModelSelector, usePublish, useView } from '@multisynq/react'
import { createContext, ReactNode, useContext, useMemo, useRef } from 'react'
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


// Context for stable references (functions, config)
interface IActivitySynqStableContext {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  userId?: string
  config: ActivitySynqConfig
}

// Context for frequently changing data (activities, status)
interface IActivitySynqVolatileContext {
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
}

export const ActivitySynqStableContext = createContext<IActivitySynqStableContext | undefined>(undefined)
export const ActivitySynqVolatileContext = createContext<IActivitySynqVolatileContext | undefined>(undefined)

// Internal provider that uses @multisynq/react hooks properly
function ActivitySynqInternalProvider({
  children,
  config
}: {
  children: ReactNode
  config: ActivitySynqConfig
}) {
  const view = useView<ActivityModel>()
  const onActivityRef = useRef(config.onActivity)
  onActivityRef.current = config.onActivity

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
  const registerActivity = <T = any>(type: string, data?: T): void => {
    if (!isReady) {
      console.warn('ActivitySynq: Cannot register activity - not ready')
      return
    }
    publishAddActivity(type, data)
  }

  // Clear activities function using proper publish pattern
  const clearActivities = (): void => {
    if (!isReady) {
      console.warn('ActivitySynq: Cannot clear activities - not ready')
      return
    }
    publishClearActivities()
  }

  // Subscribe to activity events for onActivity callback
  // This uses the same useModelSelector pattern but for side effects
  const lastActivityCount = useRef(0)
  const currentActivityCount = activities.length
  
  if (currentActivityCount > lastActivityCount.current && activities.length > 0) {
    // New activity received - call onActivity callback
    const newActivity = activities[0]
    onActivityRef.current?.(newActivity)
    lastActivityCount.current = currentActivityCount
  } else if (currentActivityCount < lastActivityCount.current) {
    // Activities were cleared
    lastActivityCount.current = currentActivityCount
  }

  // Stable context value - memoized to prevent re-renders
  const stableContextValue: IActivitySynqStableContext = useMemo(() => ({
    registerActivity,
    clearActivities,
    userId: config.userId,
    config
  }), [registerActivity, clearActivities, config.userId, config])

  // Volatile context value - contains frequently changing data
  const volatileContextValue: IActivitySynqVolatileContext = useMemo(() => ({
    activities,
    isReady,
    status,
    error
  }), [activities, isReady, status, error])

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
      <ActivitySynqStableContext.Provider value={{
        registerActivity: () => console.warn('ActivitySynq: Not initialized - no API key'),
        clearActivities: () => console.warn('ActivitySynq: Not initialized - no API key'),
        userId: memoizedConfig.userId,
        config: memoizedConfig
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

// Combined interface for backwards compatibility
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

// Main hook - combines stable and volatile contexts
export const useActivitySynq = (): IActivitySynqContext => {
  const stableContext = useContext(ActivitySynqStableContext)
  const volatileContext = useContext(ActivitySynqVolatileContext)
  
  if (stableContext === undefined || volatileContext === undefined) {
    throw new Error('useActivitySynq must be used within an ActivitySynqProvider')
  }
  
  return {
    ...stableContext,
    ...volatileContext
  }
}

// Optimized hooks for performance-critical components
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