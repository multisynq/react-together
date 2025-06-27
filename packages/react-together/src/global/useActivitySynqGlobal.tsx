import { useState, useEffect, useCallback } from 'react'
import { ActivitySynqGlobalManager } from './ActivitySynqGlobalManager'
import { ActivityEvent, ConnectionStatus } from '../context/ActivitySynqContext'

export interface IActivitySynqGlobalContext {
  registerActivity: <T = any>(type: string, data?: T) => void
  clearActivities: () => void
  activities: ActivityEvent[]
  isReady: boolean
  status: ConnectionStatus
  error: Error | null
}

export function useActivitySynqGlobal(): IActivitySynqGlobalContext {
  const manager = ActivitySynqGlobalManager.getInstance()
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [status, setStatus] = useState<ConnectionStatus>('initializing')
  const [error, setError] = useState<Error | null>(null)

  // Update activities when new ones arrive
  useEffect(() => {
    const handleActivity = (activity: ActivityEvent) => {
      setActivities(prev => [activity, ...prev])
    }

    const handleActivitiesCleared = () => {
      setActivities([])
    }

    const handleStatusChanged = (newStatus: ConnectionStatus) => {
      setStatus(newStatus)
      if (newStatus === 'ready') {
        setError(null)
        // Load current activities
        setActivities(manager.getActivities())
      }
    }

    // Subscribe to events
    manager.subscribe('activity_received', handleActivity)
    manager.subscribe('activities_cleared', handleActivitiesCleared)
    manager.subscribe('status_changed', handleStatusChanged)

    // Set initial state
    if (manager.isReady()) {
      setStatus('ready')
      setActivities(manager.getActivities())
    }

    return () => {
      manager.unsubscribe('activity_received', handleActivity)
      manager.unsubscribe('activities_cleared', handleActivitiesCleared)
      manager.unsubscribe('status_changed', handleStatusChanged)
    }
  }, [manager])

  const registerActivity = useCallback(<T = any>(type: string, data?: T): void => {
    manager.registerActivity(type, data)
  }, [manager])

  const clearActivities = useCallback((): void => {
    manager.clearActivities()
  }, [manager])

  const isReady = status === 'ready'

  return {
    registerActivity,
    clearActivities,
    activities,
    isReady,
    status,
    error
  }
}