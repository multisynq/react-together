import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { ActivitySynqProvider, useActivitySynq, ActivityEvent } from 'react-together'

// Activity data interfaces for demo
interface ButtonClickData {
  buttonId: string
  timestamp: number
  userId?: string
}

interface FeatureUsageData {
  feature: string
  timestamp: number
  userId?: string
}

interface ActivityLogEntry {
  id: string
  type: string
  data: any
  timestamp: number
  isLocal: boolean
  userId?: string
}

interface UseActivitySynqDemoProps {
  sessionName?: string
  sessionPassword?: string
  userId?: string
}

export function UseActivitySynqDemo({ 
  sessionName = 'use-activity-synq-hook-demo-SHARED',
  sessionPassword = 'hook-demo-password-SHARED',
  userId = 'anonymous'
}: UseActivitySynqDemoProps = {}) {
  return (
    <UseActivitySynqDemoContent 
      userId={userId} 
      sessionName={sessionName} 
      sessionPassword={sessionPassword}
    />
  )
}

// Demo content that uses the actual useActivitySynq hook
function UseActivitySynqDemoContent({ 
  userId, 
  sessionName, 
  sessionPassword 
}: { 
  userId: string, 
  sessionName: string,
  sessionPassword: string 
}) {
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([])
  const processedActivitiesRef = useRef<Set<string>>(new Set())

  // Stable callback reference using useCallback with consistent dependencies
  const handleActivityReceived = useCallback((activity: ActivityEvent) => {
    const activityId = `${activity.userId}-${activity.type}-${activity.timestamp}-${JSON.stringify(activity.data)}`
    
    if (processedActivitiesRef.current.has(activityId)) return
    processedActivitiesRef.current.add(activityId)
    
    const feedEntry: ActivityLogEntry = {
      id: crypto.randomUUID(),
      type: activity.type,
      userId: activity.userId || 'unknown',
      data: activity.data,
      timestamp: activity.timestamp,
      isLocal: activity.userId === userId
    }
    
    setActivityLog(prev => [feedEntry, ...prev].slice(0, 8))
  }, [userId])

  // Memoize config to prevent provider recreation
  const config = useMemo(() => ({
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    sessionName,
    sessionPassword,
    userId,
    onActivity: handleActivityReceived
  }), [sessionName, sessionPassword, userId, handleActivityReceived])

  return (
    <ActivitySynqProvider config={config}>
      <UseActivitySynqDemoInner 
        userId={userId} 
        sessionName={sessionName}
        activityLog={activityLog}
      />
    </ActivitySynqProvider>
  )
}

// Inner component that has access to useActivitySynq hook
function UseActivitySynqDemoInner({ 
  userId, 
  sessionName, 
  activityLog
}: { 
  userId: string, 
  sessionName: string,
  activityLog: ActivityLogEntry[]
}) {
  const { registerActivity, isReady, status, error, bufferedEventCount } = useActivitySynq()

  const handleButtonClick = (buttonId: string) => {
    const activityData: ButtonClickData = {
      buttonId,
      timestamp: Date.now(),
      userId
    }
    
    registerActivity('button_click', activityData)
  }

  const handleFeatureUsage = (feature: string) => {
    const activityData: FeatureUsageData = {
      feature,
      timestamp: Date.now(),
      userId
    }
    
    registerActivity('feature_usage', activityData)
  }

  const getStatusColor = () => {
    switch (status) {
      case 'ready': return 'bg-green-100 border-green-300 text-green-800'
      case 'initializing': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'disconnected': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'error': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  // Get user display name for activities
  const getUserDisplayName = useCallback((entry: ActivityLogEntry) => {
    const isLocal = entry.userId === userId
    
    if (isLocal) {
      if (userId.includes('user-1')) return 'User1 (You)'
      if (userId.includes('user-2')) return 'User2 (You)'
      return 'You'
    }
    if (entry.userId?.includes('user-1')) return 'User1'
    if (entry.userId?.includes('user-2')) return 'User2'
    return entry.userId?.slice(-8) || 'Other User'
  }, [userId])

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">🪝 useActivitySynq Hook Demo</h1>
        <p className="text-gray-600 text-sm">Demonstrates activity tracking functionality (using ReactTogether session)</p>
      </div>

      {/* Connection Status Section */}
      <div className={`rounded-lg border-2 p-4 mb-4 ${getStatusColor()}`}>
        <h3 className="font-semibold mb-2">Hook State</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Ready:</strong> {isReady ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p><strong>User ID:</strong> <span className="font-mono text-xs">{userId?.slice(-8) || 'N/A'}</span></p>
            <p><strong>Buffered Events:</strong> {bufferedEventCount}</p>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <p><strong>Session:</strong> <span className="font-mono">{sessionName || 'N/A'}</span></p>
        </div>
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            <strong>Error:</strong> {error.message}
          </div>
        )}
      </div>

      {/* Test Activities Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Test Activities</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 text-blue-800 font-medium"
            onClick={() => handleButtonClick('primary-cta')}
          >
            Primary Action
          </button>
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400 text-green-800 font-medium"
            onClick={() => handleButtonClick('secondary-action')}
          >
            Secondary Action
          </button>
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 text-purple-800 font-medium"
            onClick={() => handleFeatureUsage('demo-feature')}
          >
            Feature Usage
          </button>
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-400 text-indigo-800 font-medium"
            onClick={() => handleFeatureUsage('advanced-tool')}
          >
            Advanced Tool
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          ✅ Activities tracked in real-time across demo instances
        </p>
      </div>

      {/* Activity Log */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-3">🔔 Activity Log</h3>
        <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto border">
          {activityLog.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm">Click buttons above to see activities!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activityLog.map((entry) => {
                const isLocal = entry.userId === userId
                return (
                  <div key={entry.id} className={`rounded-lg p-2 border ${
                    isLocal
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${
                          isLocal ? 'text-blue-800' : 'text-green-800'
                        }`}>
                          {getUserDisplayName(entry)}
                        </span>
                        <span className="text-gray-600">
                          {entry.type === 'button_click' && `clicked "${entry.data?.buttonId}"`}
                          {entry.type === 'feature_usage' && `used "${entry.data?.feature}"`}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-1 text-sm">useActivitySynq Hook:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <code>registerActivity(type, data)</code> - Register new activities</li>
          <li>• <code>isReady</code> - Connection status for immediate feedback</li>
          <li>• <code>status</code> - Detailed connection state</li>
          <li>• <code>bufferedEventCount</code> - Offline activity count</li>
        </ul>
      </div>
    </div>
  )
}