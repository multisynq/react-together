import { ReactNode, useEffect } from 'react'
import { ActivitySynqProvider, ActivitySynqConfig } from '../context/ActivitySynqContext'

interface ActivitySynqGlobalProps {
  config: ActivitySynqConfig
  children?: ReactNode
  showNotifications?: boolean
  portalContainer?: string
}

// Global singleton instance manager
class ActivitySynqGlobalManager {
  private static instance: ActivitySynqGlobalManager | null = null
  private initialized = false
  private config: ActivitySynqConfig | null = null

  static getInstance(): ActivitySynqGlobalManager {
    if (!ActivitySynqGlobalManager.instance) {
      ActivitySynqGlobalManager.instance = new ActivitySynqGlobalManager()
    }
    return ActivitySynqGlobalManager.instance
  }

  initialize(config: ActivitySynqConfig): void {
    if (!this.initialized) {
      this.config = config
      this.initialized = true
    }
  }

  getConfig(): ActivitySynqConfig | null {
    return this.config
  }

  isInitialized(): boolean {
    return this.initialized
  }

  reset(): void {
    this.initialized = false
    this.config = null
  }
}

// Global component that initializes ActivitySynq session
export default function ActivitySynqGlobal({
  config,
  children = null,
  showNotifications = false,
  portalContainer = 'body'
}: ActivitySynqGlobalProps) {
  const manager = ActivitySynqGlobalManager.getInstance()

  useEffect(() => {
    // Initialize the global manager with config
    manager.initialize(config)

    // Cleanup on unmount
    return () => {
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

  // Provide the ActivitySynq context globally
  return (
    <ActivitySynqProvider config={config}>
      {children}
    </ActivitySynqProvider>
  )
}

// Export the manager for hook access
export { ActivitySynqGlobalManager }