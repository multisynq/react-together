import { MultisynqRoot, useMultisynqContext, useView } from '@multisynq/react'
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ActivityModel from '../models/ActivityModel'

export interface ActivityEvent<T = any> {
  type: string
  data?: T
  userId?: string
  timestamp: number
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
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  userId?: string
  config: ActivitySynqConfig
  bufferedEventCount: number
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
  // Generate a unique session name to avoid conflicts with ReactTogether or other ActivitySynq instances
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `activity-session-${timestamp}-${random}`
}

// Activity buffer manager
class ActivityBuffer {
  private buffer: ActivityEvent[] = []
  private readonly maxSize: number

  constructor(maxSize = 100) {
    this.maxSize = maxSize
  }

  add(activity: ActivityEvent): void {
    if (this.buffer.length >= this.maxSize) {
      // Remove oldest events to prevent memory bloat
      this.buffer.shift()
      console.warn('ActivitySynq: Buffer full, dropping oldest activity')
    }
    this.buffer.push(activity)
  }

  flush(): ActivityEvent[] {
    const events = [...this.buffer]
    this.buffer = []
    return events
  }

  getCount(): number {
    return this.buffer.length
  }

  clear(): void {
    this.buffer = []
  }
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
  const [isSynced, setIsSynced] = useState(false)
  const [status, setStatus] = useState<ConnectionStatus>('initializing')
  const [error, setError] = useState<Error | null>(null)
  const [buffer] = useState(() => new ActivityBuffer(100))
  const [bufferedEventCount, setBufferedEventCount] = useState(0)

  const sendActivity = useCallback((activity: ActivityEvent): void => {
    if (view && model) {
      view.publish(model.id, 'activity', activity)
    }
    config.onActivity?.(activity)
  }, [view, model, config])

  const flushBuffer = useCallback((): void => {
    const bufferedEvents = buffer.flush()
    if (bufferedEvents.length > 0) {
      console.log(`ActivitySynq: Reconnected. Flushing ${bufferedEvents.length} buffered events`)
      bufferedEvents.forEach(sendActivity)
      setBufferedEventCount(buffer.getCount())
    }
  }, [buffer, sendActivity])

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
        // Flush buffer when coming back online
        flushBuffer()
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
  }, [view, model, flushBuffer])

  // Subscribe to activities from other users
  useEffect(() => {
    if (!view || !model) {
      return
    }
    
    const handleActivityReceived = (activity: ActivityEvent) => {
      // Call the onActivity callback for activities from all users
      config.onActivity?.(activity)
    }
    
    view.subscribe(model.id, 'activity_received', handleActivityReceived)
    
    return () => {
      view.unsubscribe(model.id, 'activity_received', handleActivityReceived)
    }
  }, [view, model, config])

  // Load historical activities when session becomes ready
  useEffect(() => {
    if (view && model && isSynced) {
      // Check if model has getHistoricalActivities method (it should be ReactTogetherModel)
      const modelWithActivities = model as any
      if (typeof modelWithActivities.getHistoricalActivities === 'function') {
        console.log('ActivitySynq: Loading historical activities from model...')
        const historicalActivities = modelWithActivities.getHistoricalActivities()
        
        // Send each historical activity through the onActivity callback
        historicalActivities.forEach((activity: ActivityEvent) => {
          config.onActivity?.(activity)
        })
        
        console.log(`ActivitySynq: Loaded ${historicalActivities.length} historical activities`)
      } else {
        console.log('ActivitySynq: Model does not have getHistoricalActivities method')
      }
    }
  }, [view, model, isSynced, config])

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

  const registerActivity = useCallback(<T = any>(type: string, data?: T): void => {
    const activity: ActivityEvent<T> = {
      type,
      data,
      userId: config.userId,
      timestamp: Date.now(),
    }

    if (isReady) {
      // Send immediately when ready
      sendActivity(activity)
    } else {
      // Buffer when not ready
      console.log(`ActivitySynq: Connection not ready (${status}). Buffering activity: ${type}`)
      buffer.add(activity)
      setBufferedEventCount(buffer.getCount())
      
      // Still call onActivity callback for immediate feedback
      config.onActivity?.(activity)
    }
  }, [config, isReady, status, buffer, sendActivity])

  const contextValue: IActivitySynqContext = useMemo(() => ({
    registerActivity,
    isReady,
    status,
    error,
    userId: config.userId,
    config,
    bufferedEventCount,
  }), [registerActivity, isReady, status, error, config, bufferedEventCount])

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

export const ActivitySynqProvider = ({ 
  children, 
  config = {} 
}: ActivitySynqProviderProps) => {
  // Generate unique session name only once per component instance
  const [defaultSessionName] = useState(() => generateUniqueSessionName())
  
  // Memoize config to prevent unnecessary re-renders from object recreation
  const memoizedConfig = useMemo(() => {
    // Precedence for appId: explicit config > environment > error
    const appId = config.appId || import.meta.env.VITE_APP_ID
    if (!appId) {
      console.error('ActivitySynq Error: appId is missing. Provide it via the appId prop.')
    }
    
    return {
      userId: config.userId || generateUserId(),
      apiKey: config.apiKey || import.meta.env.VITE_API_KEY || import.meta.env.VITE_MULTISYNQ_API_KEY,
      appId: appId || 'missing-app-id', // Fallback to avoid breaking
      // Use unique session name by default, but allow override via config
      sessionName: config.sessionName || import.meta.env.VITE_SESSION_NAME || defaultSessionName,
      sessionPassword: config.sessionPassword || import.meta.env.VITE_SESSION_PASSWORD || 'activity-session-password',
      onActivity: config.onActivity,
    }
  }, [config.apiKey, config.userId, config.sessionName, config.sessionPassword, config.appId, config.onActivity, defaultSessionName])

  // Debug logging to show session isolation
  useEffect(() => {
    console.log('ActivitySynq session initialized:', {
      appId: memoizedConfig.appId,
      sessionName: memoizedConfig.sessionName,
      generatedUniqueSession: !config.sessionName && !import.meta.env.VITE_SESSION_NAME
    })
  }, [memoizedConfig.appId, memoizedConfig.sessionName, config.sessionName])

  // Track config changes and create a key to force MultisynqRoot re-mount when critical config changes
  const sessionKey = useMemo(() => 
    `${memoizedConfig.apiKey}_${memoizedConfig.userId}_${memoizedConfig.sessionName}_${memoizedConfig.sessionPassword}`,
    [memoizedConfig.apiKey, memoizedConfig.userId, memoizedConfig.sessionName, memoizedConfig.sessionPassword]
  )

  if (!memoizedConfig.apiKey) {
    const apiKeyError = new Error('No API key provided. Set VITE_API_KEY environment variable.')
    console.error('ActivitySynq:', apiKeyError.message)
    return (
      <ActivitySynqContext.Provider value={{
        registerActivity: () => console.warn('ActivitySynq: Not initialized - no API key'),
        isReady: false,
        status: 'error',
        error: apiKeyError,
        userId: memoizedConfig.userId,
        config: memoizedConfig,
        bufferedEventCount: 0
      }}>
        {children}
      </ActivitySynqContext.Provider>
    )
  }

  return (
    <MultisynqRoot
      key={sessionKey} // Force re-mount on critical config changes
      sessionParams={{
        model: ActivityModel,
        name: memoizedConfig.sessionName!,
        password: memoizedConfig.sessionPassword!,
        appId: memoizedConfig.appId!,
        apiKey: memoizedConfig.apiKey!,
        viewData: { userId: memoizedConfig.userId }
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