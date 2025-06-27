import type { View } from '@multisynq/react'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ActivityEvent, ActivitySynqConfig, ConnectionStatus } from '../context/ActivitySynqContext'
import ActivityModel from '../models/ActivityModel'
import { createStableActivityConfig } from '../utils/activityUtils'

// ===== STEP 1: SINGLETON EVENT EMITTER =====

type ActivitySynqEventMap = {
  'activity_registered': ActivityEvent
  'activities_cleared': void
  'status_changed': { status: ConnectionStatus; isReady: boolean; error: Error | null }
  'config_updated': ActivitySynqConfig
}

type EventListener<T = any> = (data: T) => void

class ActivitySynqEmitter {
  private static instance: ActivitySynqEmitter | null = null
  private listeners: Map<string, Set<EventListener>> = new Map()

  static getInstance(): ActivitySynqEmitter {
    if (!ActivitySynqEmitter.instance) {
      ActivitySynqEmitter.instance = new ActivitySynqEmitter()
    }
    return ActivitySynqEmitter.instance
  }

  on<K extends keyof ActivitySynqEventMap>(
    event: K,
    listener: EventListener<ActivitySynqEventMap[K]>
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(listener)

    // Return unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(event)
      if (eventListeners) {
        eventListeners.delete(listener)
        if (eventListeners.size === 0) {
          this.listeners.delete(event)
        }
      }
    }
  }

  emit<K extends keyof ActivitySynqEventMap>(
    event: K,
    data: ActivitySynqEventMap[K]
  ): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(data)
        } catch (error) {
          console.error(`Error in ActivitySynq event listener for ${event}:`, error)
        }
      })
    }
  }

  removeAllListeners(): void {
    this.listeners.clear()
  }
}

// ===== STEP 2: SINGLETON SESSION MANAGER =====

class ActivitySynqGlobalManager {
  private static instance: ActivitySynqGlobalManager | null = null
  private emitter = ActivitySynqEmitter.getInstance()

  private initialized = false
  private config: ActivitySynqConfig | null = null
  private session: any = null
  private view: View | null = null
  private model: ActivityModel | null = null
  private status: ConnectionStatus = 'initializing'
  private error: Error | null = null

  static getInstance(): ActivitySynqGlobalManager {
    if (!ActivitySynqGlobalManager.instance) {
      ActivitySynqGlobalManager.instance = new ActivitySynqGlobalManager()
    }
    return ActivitySynqGlobalManager.instance
  }

  async initialize(config: ActivitySynqConfig): Promise<void> {
    if (this.initialized && this.configEquals(config)) {
      return // Already initialized with same config
    }

    // Clean up existing session if config changed
    if (this.initialized) {
      await this.cleanup()
    }

    this.config = createStableActivityConfig(config)
    this.initialized = true

    try {
      // Import Multisynq dynamically
      const Multisynq = await import('@multisynq/client')

      if (!this.config.apiKey || !this.config.appId) {
        throw new Error('ActivitySynq: Missing apiKey or appId')
      }

      const sessionParams = {
        apiKey: this.config.apiKey,
        appId: this.config.appId,
        name: this.config.sessionName!,
        password: this.config.sessionPassword!,
        model: ActivityModel,
        viewData: { userId: this.config.userId },
        tps: 10 // Reduced for stability
      }

      this.updateStatus('initializing', null)

      // Join Multisynq session
      this.session = await Multisynq.Session.join(sessionParams)
      this.view = this.session.view
      this.model = this.session.model as ActivityModel

      // Subscribe to model events
      if (this.view && this.model) {
        this.view.subscribe(this.model.id, 'activity_received', this.handleActivityReceived.bind(this))
        this.view.subscribe(this.model.id, 'activities_cleared', this.handleActivitiesCleared.bind(this))
        this.view.subscribe(this.view.viewId, 'synced', this.handleSyncChange.bind(this))
        this.view.subscribe(this.view.viewId, 'error', this.handleError.bind(this))
      }

      this.updateStatus('ready', null)

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize ActivitySynq')
      this.updateStatus('error', error)
    }
  }

  private configEquals(newConfig: ActivitySynqConfig): boolean {
    if (!this.config) return false
    const stable1 = createStableActivityConfig(this.config)
    const stable2 = createStableActivityConfig(newConfig)

    return stable1.apiKey === stable2.apiKey &&
      stable1.appId === stable2.appId &&
      stable1.sessionName === stable2.sessionName &&
      stable1.sessionPassword === stable2.sessionPassword &&
      stable1.userId === stable2.userId
  }

  private updateStatus(status: ConnectionStatus, error: Error | null): void {
    this.status = status
    this.error = error
    this.emitter.emit('status_changed', {
      status,
      isReady: status === 'ready',
      error
    })
  }

  private handleActivityReceived(activity: ActivityEvent): void {
    this.emitter.emit('activity_registered', activity)
    this.config?.onActivity?.(activity)
  }

  private handleActivitiesCleared(): void {
    this.emitter.emit('activities_cleared', undefined)
  }

  private handleSyncChange(synced: boolean): void {
    if (synced) {
      this.updateStatus('ready', null)
    } else {
      this.updateStatus('disconnected', null)
    }
  }

  private handleError(err: Error): void {
    this.updateStatus('error', err)
  }

  // Public API methods
  registerActivity<T = any>(type: string, data?: T): void {
    if (!this.view || !this.model) {
      console.warn('ActivitySynq: Cannot register activity - not connected')
      return
    }

    const enhancedData = this.config?.userId ? { ...data, userId: this.config.userId } : data
    this.view.publish(this.model.id, 'add_activity', { type, data: enhancedData })
  }

  clearActivities(): void {
    if (!this.view || !this.model) {
      console.warn('ActivitySynq: Cannot clear activities - not connected')
      return
    }
    this.view.publish(this.model.id, 'clear_activities', {})
  }

  getActivities(): ActivityEvent[] {
    return this.model?.getHistoricalActivities?.() || []
  }

  getStatus(): { status: ConnectionStatus; isReady: boolean; error: Error | null } {
    return {
      status: this.status,
      isReady: this.status === 'ready',
      error: this.error
    }
  }

  getConfig(): ActivitySynqConfig | null {
    return this.config
  }

  private async cleanup(): Promise<void> {
    if (this.view) {
      try {
        this.view.unsubscribeAll()
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    if (this.session) {
      try {
        await this.session.leave?.()
      } catch (e) {
        // Ignore cleanup errors  
      }
    }
    this.session = null
    this.view = null
    this.model = null
    this.status = 'initializing'
    this.error = null
  }

  async reset(): Promise<void> {
    await this.cleanup()
    this.initialized = false
    this.config = null
    this.emitter.removeAllListeners()
  }
}

// ===== STEP 3: PORTAL-BASED CONTAINER COMPONENT =====

interface ActivitySynqGlobalContainerProps {
  children?: ReactNode
  portalTarget?: string | HTMLElement
}

function ActivitySynqGlobalContainer({
  children,
  portalTarget = 'body'
}: ActivitySynqGlobalContainerProps) {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null)

  // Create portal target element
  useEffect(() => {
    if (typeof window === 'undefined') return

    let targetElement: HTMLElement

    if (typeof portalTarget === 'string') {
      if (portalTarget === 'body') {
        targetElement = document.body
      } else {
        const existing = document.querySelector(portalTarget) as HTMLElement
        if (existing) {
          targetElement = existing
        } else {
          // Create the target element
          targetElement = document.createElement('div')
          targetElement.setAttribute('data-activitysynq-portal', portalTarget)
          document.body.appendChild(targetElement)
        }
      }
    } else {
      targetElement = portalTarget
    }

    // Create container for ActivitySynq
    const container = document.createElement('div')
    container.setAttribute('data-activitysynq-container', 'true')
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 9999;
    `

    targetElement.appendChild(container)
    setContainerElement(container)

    return () => {
      if (container && targetElement.contains(container)) {
        targetElement.removeChild(container)
      }

      // Clean up created portal target if we created it
      if (typeof portalTarget === 'string' && portalTarget !== 'body') {
        const createdTarget = document.querySelector(`[data-activitysynq-portal="${portalTarget}"]`)
        if (createdTarget && !createdTarget.hasChildNodes()) {
          document.body.removeChild(createdTarget)
        }
      }
    }
  }, [portalTarget])

  // Render children in portal if container exists
  if (!containerElement || typeof window === 'undefined') {
    return children as React.ReactElement
  }

  return (
    <>
      {children}
      {createPortal(
        <div style={{ pointerEvents: 'auto' }}>
          {/* This is where global ActivitySynq UI components would render */}
          {/* For now, this is invisible but ready for future UI features */}
        </div>,
        containerElement
      )}
    </>
  )
}

// ===== STEP 4: SINGLE COMPONENT (like <ToastContainer />) =====

interface ActivitySynqContainerProps {
  config: ActivitySynqConfig
  portalTarget?: string | HTMLElement
  className?: string
  style?: React.CSSProperties
}

/**
 * ActivitySynqContainer - Single component like ToastContainer
 * 
 * Usage (like react-toastify):
 * ```tsx
 * // Place once anywhere in your app
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       <MainContent />
 *       <ActivitySynqContainer config={{ apiKey, appId, sessionName }} />
 *     </div>
 *   )
 * }
 * 
 * // Use anywhere without any wrapper
 * function MyComponent() {
 *   const { registerActivity } = useActivitySynqGlobal()
 *   // Works anywhere!
 * }
 * ```
 */
export default function ActivitySynqContainer({
  config,
  portalTarget = 'body',
  className,
  style
}: ActivitySynqContainerProps) {
  const manager = ActivitySynqGlobalManager.getInstance()

  // Initialize session when config changes
  useEffect(() => {
    manager.initialize(config)
  }, [config, manager])

  return (
    <ActivitySynqGlobalContainer
      portalTarget={portalTarget}
    >
      <div
        className={className}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          ...style
        }}
      >
        {/* This is where future UI elements would render (like toast notifications) */}
      </div>
    </ActivitySynqGlobalContainer>
  )
}

// ===== STEP 5: GLOBAL API FUNCTIONS (like toast.success()) =====

interface ActivitySynqGlobalAPI {
  registerActivity<T = any>(type: string, data?: T): void
  clearActivities(): void
  initialize(config: ActivitySynqConfig): Promise<void>
  getActivities(): ActivityEvent[]
  getStatus(): { status: ConnectionStatus; isReady: boolean; error: Error | null }
  getConfig(): ActivitySynqConfig | null
  reset(): Promise<void>
}

// Global ActivitySynq API object (like the `toast` object in react-toastify)
export const activitySynq: ActivitySynqGlobalAPI = {
  registerActivity<T = any>(type: string, data?: T): void {
    ActivitySynqGlobalManager.getInstance().registerActivity(type, data)
  },

  clearActivities(): void {
    ActivitySynqGlobalManager.getInstance().clearActivities()
  },

  async initialize(config: ActivitySynqConfig): Promise<void> {
    await ActivitySynqGlobalManager.getInstance().initialize(config)
  },

  getActivities(): ActivityEvent[] {
    return ActivitySynqGlobalManager.getInstance().getActivities()
  },

  getStatus(): { status: ConnectionStatus; isReady: boolean; error: Error | null } {
    return ActivitySynqGlobalManager.getInstance().getStatus()
  },

  getConfig(): ActivitySynqConfig | null {
    return ActivitySynqGlobalManager.getInstance().getConfig()
  },

  async reset(): Promise<void> {
    await ActivitySynqGlobalManager.getInstance().reset()
  }
}

// Export the manager and emitter for advanced usage
export { ActivitySynqEmitter, ActivitySynqGlobalManager }
