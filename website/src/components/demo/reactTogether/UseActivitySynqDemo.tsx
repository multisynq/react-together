import { useState, useEffect } from 'react'
import { useStateTogether } from 'react-together'

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

export function UseActivitySynqDemo() {
  return <UseActivitySynqDemoContent />
}

// Demo content that simulates useActivitySynq functionality using ReactTogether session
function UseActivitySynqDemoContent() {
  // Use the existing ReactTogether session to share activities
  const [activityLog, setActivityLog] = useStateTogether<ActivityLogEntry[]>('useActivitySynqDemoLog', [])
  const [bufferedCount] = useState(0)
  const [status] = useState<'ready' | 'initializing' | 'disconnected' | 'error'>('ready')
  
  // Get user info from URL params
  const urlParams = new URLSearchParams(window.location.search)
  const userParam = urlParams.get('user')
  const userId = userParam ? `demo-user-${userParam}` : 'anonymous'

  const handleButtonClick = (buttonId: string) => {
    const activityData: ButtonClickData = {
      buttonId,
      timestamp: Date.now(),
      userId
    }
    
    // Simulate registerActivity by adding to shared activity log
    const logEntry: ActivityLogEntry = {
      id: crypto.randomUUID(),
      type: 'button_click',
      data: activityData,
      timestamp: Date.now(),
      isLocal: true,
      userId: userId
    }
    
    // Add to shared log (simulates real-time sync)
    setActivityLog(prev => [logEntry, ...prev].slice(0, 8))
  }

  const handleFeatureUsage = (feature: string) => {
    const activityData: FeatureUsageData = {
      feature,
      timestamp: Date.now(),
      userId
    }
    
    // Simulate registerActivity by adding to shared activity log
    const logEntry: ActivityLogEntry = {
      id: crypto.randomUUID(),
      type: 'feature_usage',
      data: activityData,
      timestamp: Date.now(),
      isLocal: true,
      userId: userId
    }
    
    // Add to shared log (simulates real-time sync)
    setActivityLog(prev => [logEntry, ...prev].slice(0, 8))
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
  const getUserDisplayName = (entry: ActivityLogEntry) => {
    // Determine if this activity is from the current user
    const isLocal = entry.userId === userId
    
    if (isLocal) {
      if (userParam === 'user1') return 'User1 (You)'
      if (userParam === 'user2') return 'User2 (You)'
      return 'You'
    }
    // For remote activities, determine user based on userId
    if (entry.userId?.includes('user1')) return 'User1'
    if (entry.userId?.includes('user2')) return 'User2'
    return entry.userId?.slice(-8) || 'Other User'
  }

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
            <p><strong>Ready:</strong> Yes</p>
          </div>
          <div>
            <p><strong>User ID:</strong> <span className="font-mono text-xs">{userId?.slice(-8) || 'N/A'}</span></p>
            <p><strong>Buffered Events:</strong> {bufferedCount}</p>
          </div>
        </div>
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