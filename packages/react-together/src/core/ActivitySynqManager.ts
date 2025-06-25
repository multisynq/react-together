import { createStore } from 'zustand/vanilla'
import type { ActivityEvent, ActivitySynqConfig, ConnectionStatus } from '../context/ActivitySynqContext'

export interface ActivitySynqState {
  config: ActivitySynqConfig | null
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
  bufferedEventCount: number
  isConfigured: boolean
}

export interface ActivitySynqActions {
  configure: (config: ActivitySynqConfig) => void
  registerActivity: <T = any>(type: string, data?: T) => void
  updateStatus: (status: ConnectionStatus, error?: Error | null) => void
  updateBufferCount: (count: number) => void
  addActivity: (activity: ActivityEvent) => void
  reset: () => void
}

export type ActivitySynqStore = ActivitySynqState & ActivitySynqActions

class ActivitySynqManager {
  private static instance: ActivitySynqManager
  public store
  private model: any = null
  private view: any = null

  private constructor() {
    this.store = createStore<ActivitySynqStore>((set, get) => ({
      // Initial state
      config: null,
      activities: [],
      isReady: false,
      status: 'initializing',
      error: null,
      bufferedEventCount: 0,
      isConfigured: false,

      // Actions
      configure: (config: ActivitySynqConfig) => {
        const state = get()
        if (state.isConfigured) {
          console.warn('ActivitySynq is already configured. Ignoring subsequent configuration.')
          return
        }

        set({ config, isConfigured: true })
        this.initializeCroquetSession(config)
      },

      registerActivity: <T = any>(type: string, data?: T) => {
        const state = get()
        if (!state.config) {
          console.warn('ActivitySynq: Cannot register activity - not configured')
          return
        }

        const activity: ActivityEvent<T> = {
          type,
          data,
          userId: state.config.userId,
          timestamp: Date.now(),
        }

        if (state.isReady && this.view && this.model) {
          // Send immediately when ready
          this.view.publish(this.model.id, 'activity', activity)
        } else {
          // Buffer when not ready
          console.log(`ActivitySynq: Connection not ready (${state.status}). Buffering activity: ${type}`)
          set(prev => ({ bufferedEventCount: prev.bufferedEventCount + 1 }))
        }

        // Always call onActivity callback for immediate feedback
        state.config.onActivity?.(activity)
      },

      updateStatus: (status: ConnectionStatus, error: Error | null = null) => {
        set({ status, error, isReady: status === 'ready' })
      },

      updateBufferCount: (count: number) => {
        set({ bufferedEventCount: count })
      },

      addActivity: (activity: ActivityEvent) => {
        set(state => ({
          activities: [activity, ...state.activities].slice(0, 50) // Keep last 50 activities
        }))
      },

      reset: () => {
        this.cleanup()
        set({
          config: null,
          activities: [],
          isReady: false,
          status: 'initializing',
          error: null,
          bufferedEventCount: 0,
          isConfigured: false
        })
      }
    }))
  }

  public static getInstance(): ActivitySynqManager {
    if (!ActivitySynqManager.instance) {
      ActivitySynqManager.instance = new ActivitySynqManager()
    }
    return ActivitySynqManager.instance
  }

  private async initializeCroquetSession(config: ActivitySynqConfig) {
    try {
      const { updateStatus, addActivity } = this.store.getState()
      updateStatus('initializing')

      // Dynamic import to avoid SSR issues
      const { Session } = await import('@multisynq/react')
      const { default: ActivityModel } = await import('../models/ActivityModel')

      // Generate unique session name if not provided
      const sessionName = config.sessionName || `activity-session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
      
      const appId = config.appId || import.meta.env.VITE_APP_ID
      const apiKey = config.apiKey || import.meta.env.VITE_API_KEY
      
      if (!appId || !apiKey) {
        throw new Error('ActivitySynq: appId and apiKey are required')
      }

      const sessionParams = {
        model: ActivityModel,
        name: sessionName,
        password: config.sessionPassword || 'activity-session-password',
        appId,
        apiKey,
        viewData: { userId: config.userId }
      }

      console.log('ActivitySynq: Initializing session with params:', sessionParams)

      // Create the session using Session.join
      const session = await Session.join(sessionParams)
      this.view = session.view
      // Note: model is accessed through session.viewData or directly from view
      this.model = (session as any).model || this.view.model

      // Subscribe to activity events from other users
      this.view.subscribe(this.model.id, 'activity_received', (activity: any) => {
        console.log('ActivitySynq: Received activity:', activity)
        addActivity(activity)
        config.onActivity?.(activity)
      })

      // Subscribe to sync status changes
      this.view.subscribe(this.view.viewId, 'synced', (synced: boolean) => {
        if (synced) {
          updateStatus('ready')
          console.log('ActivitySynq: Session ready')
          
          // Load historical activities
          const modelWithActivities = this.model as any
          if (typeof modelWithActivities.getHistoricalActivities === 'function') {
            const historicalActivities = modelWithActivities.getHistoricalActivities()
            console.log(`ActivitySynq: Loading ${historicalActivities.length} historical activities`)
            historicalActivities.forEach((activity: any) => {
              addActivity(activity)
              config.onActivity?.(activity)
            })
          }
        } else {
          updateStatus('disconnected')
        }
      })

      // Subscribe to errors
      this.view.subscribe(this.view.viewId, 'error', (error: Error) => {
        console.error('ActivitySynq: Session error:', error)
        updateStatus('error', error)
      })

    } catch (error) {
      console.error('ActivitySynq: Failed to initialize session:', error)
      this.store.getState().updateStatus('error', error as Error)
    }
  }

  private cleanup() {
    if (this.view) {
      // Cleanup Croquet subscriptions
      this.view = null
    }
    if (this.model) {
      this.model = null
    }
    // Cleanup complete
  }

  // Public method for external cleanup
  public destroy() {
    this.cleanup()
    ActivitySynqManager.instance = null as any
  }
}

export const activitySynqManager = ActivitySynqManager.getInstance()