import { createMultisynqSession, MultisynqSession, MultisynqReactView } from '@multisynq/react'
import { BrowserEventEmitter } from './BrowserEventEmitter'
import ActivityModel from '../models/ActivityModel'
import { ActivityEvent, ActivitySynqConfig } from '../context/ActivitySynqContext'

// Singleton manager for the Global pattern
export class ActivitySynqGlobalManager {
  private static instance: ActivitySynqGlobalManager | null = null
  private session: MultisynqSession<MultisynqReactView<ActivityModel>> | null = null
  private eventEmitter: BrowserEventEmitter = new BrowserEventEmitter()
  private config: ActivitySynqConfig | null = null
  private initPromise: Promise<void> | null = null
  
  // Add reconnection properties
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private isReconnecting: boolean = false

  static getInstance(): ActivitySynqGlobalManager {
    if (!this.instance) {
      this.instance = new ActivitySynqGlobalManager()
    }
    return this.instance
  }

  async initialize(config: ActivitySynqConfig): Promise<void> {
    // Prevent multiple simultaneous initializations
    if (this.initPromise) {
      return this.initPromise
    }

    // If already initialized with same config, return
    if (this.session && this.configEquals(config)) {
      return Promise.resolve()
    }

    this.initPromise = this.doInitialize(config)
    await this.initPromise
    this.initPromise = null
  }

  private async doInitialize(config: ActivitySynqConfig): Promise<void> {
    try {
      // Clean up existing session if needed
      if (this.session) {
        this.session.leave()
        this.session = null
      }

      this.config = config

      // Create session using createMultisynqSession from @multisynq/react
      this.session = await createMultisynqSession({
        model: ActivityModel,
        name: config.sessionName || 'global-activity-session',
        password: config.sessionPassword || 'global-password',
        apiKey: config.apiKey!,
        appId: config.appId!,
        viewData: { userId: config.userId },
        tps: 10
      })

      // Subscribe to model events and emit to global event bus
      this.session.view.subscribe(this.session.view.model.id, 'activity_received', (activity: ActivityEvent) => {
        this.eventEmitter.emit('activity_received', activity)
        config.onActivity?.(activity)
      })

      this.session.view.subscribe(this.session.view.model.id, 'activities_cleared', () => {
        this.eventEmitter.emit('activities_cleared')
      })

      // Add disconnection handlers
      this.session.view.subscribe(this.session.view.model.id, 'view-synced', (synced: boolean) => {
        if (synced) {
          console.log('✅ ActivitySynq Global: Connected')
          this.eventEmitter.emit('status_changed', 'ready')
          this.reconnectAttempts = 0 // Reset on successful connection
        } else {
          console.warn('⚠️ ActivitySynq Global: Disconnected')
          this.eventEmitter.emit('status_changed', 'disconnected')
          this.attemptReconnection() // Add automatic reconnection
        }
      })

      this.eventEmitter.emit('status_changed', 'ready')
    } catch (error) {
      console.error('ActivitySynqGlobalManager: Failed to initialize:', error)
      this.eventEmitter.emit('status_changed', 'error', error as Error)
      this.attemptReconnection() // Try to reconnect on initialization failure
      throw error
    }
  }

  registerActivity(type: string, data?: any): void {
    if (!this.session) {
      console.warn('ActivitySynqGlobalManager: Cannot register activity - not initialized')
      return
    }
    this.session.view.publish(this.session.view.model.id, 'add_activity', { type, data })
  }

  clearActivities(): void {
    if (!this.session) {
      console.warn('ActivitySynqGlobalManager: Cannot clear activities - not initialized')
      return
    }
    this.session.view.publish(this.session.view.model.id, 'clear_activities', {})
  }

  getActivities(): ActivityEvent[] {
    if (!this.session?.view.model) {
      return []
    }
    return this.session.view.model.activities || []
  }

  isReady(): boolean {
    return this.session !== null
  }

  subscribe(event: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.on(event, callback)
  }

  unsubscribe(event: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.off(event, callback)
  }

  private configEquals(config: ActivitySynqConfig): boolean {
    if (!this.config) return false
    return (
      this.config.apiKey === config.apiKey &&
      this.config.appId === config.appId &&
      this.config.sessionName === config.sessionName &&
      this.config.sessionPassword === config.sessionPassword &&
      this.config.userId === config.userId
    )
  }

  private async attemptReconnection(): Promise<void> {
    if (this.isReconnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      if (!this.isReconnecting) {
        console.error('🚨 ActivitySynq Global: Max reconnection attempts reached')
        this.eventEmitter.emit('status_changed', 'error', new Error('Max reconnection attempts reached'))
      }
      return
    }

    this.isReconnecting = true
    this.reconnectAttempts++
    
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000) // Exponential backoff
    console.log(`🔄 ActivitySynq Global: Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`)

    setTimeout(async () => {
      try {
        this.eventEmitter.emit('status_changed', 'initializing')
        
        // Clean up existing session
        if (this.session) {
          this.session.leave()
          this.session = null
        }

        // Reinitialize with same config
        await this.doInitialize(this.config!)
        console.log('✅ ActivitySynq Global: Reconnection successful')
        
      } catch (error) {
        console.error('❌ ActivitySynq Global: Reconnection failed:', error)
        this.attemptReconnection() // Retry
      } finally {
        this.isReconnecting = false
      }
    }, delay)
  }

  // Add method to manually trigger reconnection
  reconnect(): void {
    if (!this.isReconnecting) {
      this.reconnectAttempts = 0
      this.attemptReconnection()
    }
  }

  // Cleanup method
  destroy(): void {
    if (this.session) {
      this.session.leave()
      this.session = null
    }
    this.eventEmitter.removeAllListeners()
    this.config = null
    this.initPromise = null
  }
}