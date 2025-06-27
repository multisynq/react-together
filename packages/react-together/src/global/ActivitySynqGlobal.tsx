import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ActivitySynqGlobalManager } from './ActivitySynqGlobalManager'
import { ActivitySynqConfig } from '../context/ActivitySynqContext'
import { createStableActivityConfig } from '../utils/activityUtils'

export interface ActivitySynqGlobalProps {
  config: ActivitySynqConfig
}

export function ActivitySynqGlobal({ config }: ActivitySynqGlobalProps) {
  const manager = ActivitySynqGlobalManager.getInstance()

  useEffect(() => {
    const stableConfig = createStableActivityConfig(config)
    
    if (!stableConfig.apiKey || stableConfig.apiKey === 'missing-api-key') {
      console.error('ActivitySynqGlobal Error: apiKey is missing. Set VITE_API_KEY environment variable.')
      return
    }
    
    if (!stableConfig.appId || stableConfig.appId === 'missing-app-id') {
      console.error('ActivitySynqGlobal Error: appId is missing. Provide it via the appId prop.')
      return
    }

    // Initialize the manager with the stable config
    manager.initialize(stableConfig).catch(error => {
      console.error('ActivitySynqGlobal: Initialization failed:', error)
    })

    // Cleanup on unmount
    return () => {
      // Note: We don't destroy the manager here because other components might still be using it
      // The manager is a singleton and should persist across component mounts/unmounts
    }
  }, [config.apiKey, config.appId, config.sessionName, config.sessionPassword, config.userId, manager])

  // Portal-based rendering for any future UI components if needed
  // For now, this is just a hidden container that could be used for notifications
  return createPortal(
    <div 
      id="activity-synq-global-container" 
      style={{ display: 'none' }}
      data-testid="activity-synq-global"
    />,
    document.body
  )
}