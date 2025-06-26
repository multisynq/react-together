import { ReactNode, useEffect, useState } from 'react'
import type { View } from '@multisynq/react'
import ActivityModel from '../models/ActivityModel'
import type { ActivityEvent, ActivitySynqConfig, ConnectionStatus } from '../context/ActivitySynqContext'

interface ActivitySynqGlobalProps {
  config: ActivitySynqConfig
  children?: ReactNode
  showNotifications?: boolean
  portalContainer?: string
}

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

// Global singleton manager that directly manages Multisynq session
class ActivitySynqGlobalManager {
  private static instance: ActivitySynqGlobalManager | null = null
  private initialized = false
  private config: ActivitySynqConfig | null = null
  private session: any = null
  private view: View | null = null
  private model: ActivityModel | null = null
  private activities: ActivityEvent[] = []
  private status: ConnectionStatus = 'initializing'
  private error: Error | null = null
  private listeners: Array<() => void> = []

  static getInstance(): ActivitySynqGlobalManager {
    if (!ActivitySynqGlobalManager.instance) {
      ActivitySynqGlobalManager.instance = new ActivitySynqGlobalManager()
    }
    return ActivitySynqGlobalManager.instance
  }

  async initialize(config: ActivitySynqConfig): Promise<void> {
    if (this.initialized) return

    this.config = config
    this.initialized = true

    try {
      // Import Multisynq dynamically to avoid bundling issues
      const Multisynq = await import('@multisynq/client')
      
      // Ensure API key and appId are present
      const apiKey = config.apiKey || import.meta.env.VITE_API_KEY || import.meta.env.VITE_MULTISYNQ_API_KEY
      const appId = config.appId || import.meta.env.VITE_APP_ID
      
      if (!apiKey || !appId) {
        throw new Error('ActivitySynq: Missing apiKey or appId')
      }

      // Generate session parameters
      const defaultSessionName = `activity-session-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`
      const userId = config.userId || generateUserId()

      const sessionParams = {
        apiKey: apiKey,
        appId: appId,
        name: config.sessionName || import.meta.env.VITE_SESSION_NAME || defaultSessionName,
        password: config.sessionPassword || import.meta.env.VITE_SESSION_PASSWORD || 'activity-session-password',
        model: ActivityModel,
        viewData: { userId }
      }

      this.status = 'initializing'
      this.notifyListeners()

      // Join Multisynq session directly
      this.session = await Multisynq.Session.join(sessionParams)
      this.view = this.session.view
      this.model = this.session.model as ActivityModel

      // Subscribe to model events for activity updates
      if (this.view && this.model) {
        this.view.subscribe(this.model.id, 'activity_received', this.handleActivityReceived.bind(this))
        this.view.subscribe(this.model.id, 'activities_cleared', this.handleActivitiesCleared.bind(this))

        // Subscribe to session events for connection status
        this.view.subscribe(this.view.viewId, 'synced', this.handleSyncChange.bind(this))
        this.view.subscribe(this.view.viewId, 'error', this.handleError.bind(this))
      }

      // Load historical activities
      if (this.model.getHistoricalActivities) {
        this.activities = this.model.getHistoricalActivities()
      }

      this.status = 'ready'
      this.error = null
      this.notifyListeners()

    } catch (err) {
      this.error = err instanceof Error ? err : new Error('Failed to initialize ActivitySynq')
      this.status = 'error'
      this.notifyListeners()
    }
  }

  private handleActivityReceived(activity: ActivityEvent): void {
    this.activities = [activity, ...this.activities.slice(0, 999)] // Keep recent 1000
    this.config?.onActivity?.(activity)
    this.notifyListeners()
  }

  private handleActivitiesCleared(): void {
    this.activities = []
    this.notifyListeners()
  }

  private handleSyncChange(synced: boolean): void {
    if (synced) {
      this.status = 'ready'
      this.error = null
      // Reload activities when synced
      if (this.model?.getHistoricalActivities) {
        this.activities = this.model.getHistoricalActivities()
      }
    } else {
      this.status = 'disconnected'
    }
    this.notifyListeners()
  }

  private handleError(err: Error): void {
    this.error = err
    this.status = 'error'
    this.notifyListeners()
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }

  addListener(listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  registerActivity<T = any>(type: string, data?: T): void {
    if (!this.view || !this.model) {
      console.warn('ActivitySynq: Cannot register activity - not connected')
      return
    }

    // Enhance data with userId if provided
    const enhancedData = this.config?.userId ? { ...data, userId: this.config.userId } : data

    // Send to model via proper event - let model handle timing and storage
    this.view.publish(this.model.id, 'add_activity', {
      type,
      data: enhancedData
    })
  }

  clearActivities(): void {
    if (!this.view || !this.model) {
      console.warn('ActivitySynq: Cannot clear activities - not connected')
      return
    }

    // Send clear command to model - let model handle the clearing
    this.view.publish(this.model.id, 'clear_activities', {})
  }

  getState(): IActivitySynqGlobal {
    return {
      registerActivity: this.registerActivity.bind(this),
      clearActivities: this.clearActivities.bind(this),
      activities: this.activities,
      isReady: this.status === 'ready',
      status: this.status,
      error: this.error,
      userId: this.config?.userId,
      config: this.config || {}
    }
  }

  reset(): void {
    if (this.view) {
      this.view.unsubscribeAll()
    }
    if (this.session) {
      // Clean up session if possible
      try {
        this.session.leave?.()
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    this.initialized = false
    this.config = null
    this.session = null
    this.view = null
    this.model = null
    this.activities = []
    this.status = 'initializing'
    this.error = null
    this.listeners = []
  }
}

// Global component that initializes ActivitySynq session WITHOUT React context
export default function ActivitySynqGlobal({
  config,
  children = null,
  showNotifications = false,
  portalContainer = 'body'
}: ActivitySynqGlobalProps) {
  const [, forceUpdate] = useState({})
  const manager = ActivitySynqGlobalManager.getInstance()

  useEffect(() => {
    // Initialize the global manager with config
    manager.initialize(config)

    // Subscribe to state changes for re-rendering any components that need it
    const unsubscribe = manager.addListener(() => {
      forceUpdate({})
    })

    // Cleanup on unmount
    return () => {
      unsubscribe()
      // Don't reset on unmount to preserve session across navigation
      // manager.reset()
    }
  }, [config, manager])

  // Show notifications in portal if requested
  useEffect(() => {
    if (showNotifications && typeof window !== 'undefined') {
      const container = portalContainer === 'body' 
        ? document.body 
        : document.querySelector(portalContainer)
      
      if (container) {
        // Could add notification portal here if needed
        // For now, notifications are handled via onActivity callback
      }
    }
  }, [showNotifications, portalContainer])

  // Return children directly - no context wrapper needed
  return children as React.ReactElement
}

// Export the manager for hook access
export { ActivitySynqGlobalManager }