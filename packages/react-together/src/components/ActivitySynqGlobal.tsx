import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useActivitySynqGlobal } from '../hooks/useActivitySynqGlobal'
import { activitySynqManager } from '../core/ActivitySynqManager'
import type { ActivitySynqConfig, ActivityEvent } from '../context/ActivitySynqContext'

// Prevent multiple instances
let isMounted = false

interface ActivitySynqProps {
  config: ActivitySynqConfig
  /**
   * Whether to render activity notifications as toast-like UI
   * @default false
   */
  showNotifications?: boolean
  /**
   * Custom notification component
   */
  notificationComponent?: React.ComponentType<{ activity: ActivityEvent; onDismiss: () => void }>
  /**
   * Portal container selector (defaults to document.body)
   */
  portalContainer?: string
}

/**
 * Single-line ActivitySynq integration component.
 * Mount this once anywhere in your app to enable global ActivitySynq functionality.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       <MainContent />
 *       <ActivitySynq config={{
 *         apiKey: process.env.REACT_APP_MULTISYNQ_API_KEY,
 *         appId: process.env.REACT_APP_MULTISYNQ_APP_ID,
 *         sessionName: 'my-app-session',
 *         userId: currentUser.id
 *       }} />
 *     </div>
 *   )
 * }
 * 
 * // With notifications
 * <ActivitySynqGlobal 
 *   config={config} 
 *   showNotifications={true}
 *   notificationComponent={CustomToast}
 * />
 * ```
 */
export function ActivitySynqGlobal({ 
  config, 
  showNotifications = false,
  notificationComponent: NotificationComponent,
  portalContainer = 'body'
}: ActivitySynqProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const { activities } = useActivitySynqGlobal()

  // Configure the global manager on mount
  useEffect(() => {
    if (isMounted) {
      console.warn(
        '<ActivitySynq /> has been mounted more than once. Only the first instance will be active.'
      )
      return
    }

    isMounted = true
    activitySynqManager.store.getState().configure(config)

    return () => {
      isMounted = false
      // Optionally reset on unmount (for development/testing)
      if (process.env.NODE_ENV === 'development') {
        activitySynqManager.store.getState().reset()
      }
    }
  }, []) // Intentionally not including config to prevent reconfiguration

  // Set up portal for notifications
  useEffect(() => {
    if (!showNotifications) return

    // Client-side only for SSR compatibility
    if (typeof window === 'undefined') return

    const container = document.querySelector(portalContainer) || document.body
    const root = document.createElement('div')
    root.setAttribute('id', 'activity-synq-notifications')
    root.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `
    container.appendChild(root)
    setPortalRoot(root)

    return () => {
      if (container.contains(root)) {
        container.removeChild(root)
      }
    }
  }, [showNotifications, portalContainer])

  // Don't render anything if notifications are disabled
  if (!showNotifications || !portalRoot) {
    return null
  }

  // Render notifications in portal
  return createPortal(
    <div className="activity-synq-notifications">
      {activities.slice(0, 5).map((activity) => (
        <ActivityNotification
          key={`${activity.userId}-${activity.timestamp}-${activity.type}`}
          activity={activity}
          customComponent={NotificationComponent}
          onDismiss={() => {
            // Remove activity from display
            const manager = activitySynqManager.store.getState()
            manager.addActivity({ ...activity, dismissed: true } as any)
          }}
        />
      ))}
    </div>,
    portalRoot
  )
}

// Default notification component
interface ActivityNotificationProps {
  activity: ActivityEvent
  customComponent?: React.ComponentType<{ activity: ActivityEvent; onDismiss: () => void }>
  onDismiss: () => void
}

function ActivityNotification({ activity, customComponent: CustomComponent, onDismiss }: ActivityNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300) // Allow fade-out animation
    }, 4000) // Auto-dismiss after 4 seconds

    return () => clearTimeout(timer)
  }, [onDismiss])

  if (CustomComponent) {
    return <CustomComponent activity={activity} onDismiss={onDismiss} />
  }

  return (
    <div 
      className={`activity-notification ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '8px',
        maxWidth: '300px',
        pointerEvents: 'auto',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={onDismiss}
    >
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
        New Activity: {activity.type}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        From: {activity.userId?.slice(-8) || 'Unknown'}
      </div>
      {activity.data && (
        <div style={{ fontSize: '12px', marginTop: '4px' }}>
          {JSON.stringify(activity.data)}
        </div>
      )}
    </div>
  )
}