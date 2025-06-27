import { useState, useEffect, useRef, useCallback } from 'react'
import { ActivitySynqProvider, useActivitySynq, ActivityEvent } from 'react-together'
import { useMultisynqContext } from '@multisynq/react'

// Activity data interfaces for emoji voting demo
interface EmojiVoteData {
  emoji: string
  timestamp: number
}

interface ActivityFeedEntry {
  id: string
  type: string
  userId: string
  data?: any
  timestamp: number
}

function App() {
  // Get user-specific ID from URL parameters to differentiate between demo instances
  const urlParams = new URLSearchParams(window.location.search)
  const userParam = urlParams.get('user')
  const userId = userParam ? `emoji-voter-${userParam}` : `emoji-voter-${Math.random().toString(36).substring(2, 8)}`

  return (
    <ActivitySynqProvider config={{
      apiKey: import.meta.env.VITE_API_KEY,
      appId: import.meta.env.VITE_APP_ID,
      sessionName: 'emoji-voting-demo-croquet', 
      sessionPassword: 'vote-together', 
      userId: userId,
    }}>
      <ActivitySynqDemoContent userId={userId} />
    </ActivitySynqProvider>
  )
}

// Demo content that shows emoji voting functionality
function ActivitySynqDemoContent({ userId }: { userId: string }) {
  const { view, model } = useMultisynqContext()
  const { registerActivity, isReady, status } = useActivitySynq()
  const [activityFeed, setActivityFeed] = useState<ActivityFeedEntry[]>([])
  const [voteCount, setVoteCount] = useState<Record<string, number>>({})
  
  // Available emojis for voting
  const emojis = ['😍', '🚀', '💡', '🎉', '❤️', '👍']

  // Component-level deduplication for React Strict Mode
  const processedActivitiesRef = useRef<Set<string>>(new Set())

  // Handle activity received using proper Croquet view subscription
  const handleActivityReceived = useCallback((activity: ActivityEvent) => {
    console.log('🔥 Activity received via Croquet view subscription:', activity)
    
    // Create unique ID for deduplication
    const activityId = `${activity.data?.userId || 'unknown'}-${activity.type}-${activity.timestamp}-${JSON.stringify(activity.data)}`
    
    // Skip if already processed (React Strict Mode protection)
    if (processedActivitiesRef.current.has(activityId)) {
      console.log('⚠️ Skipping duplicate activity:', activityId)
      return
    }
    
    // Mark as processed
    processedActivitiesRef.current.add(activityId)
    
    const feedEntry: ActivityFeedEntry = {
      id: crypto.randomUUID(),
      type: activity.type,
      userId: activity.data?.userId || 'unknown',
      data: activity.data,
      timestamp: activity.timestamp || Date.now()
    }
    
    setActivityFeed(prev => [feedEntry, ...prev].slice(0, 10))
    
    // Update vote count for emoji votes
    if (activity.type === 'emoji_vote' && activity.data?.emoji) {
      setVoteCount(prev => ({
        ...prev,
        [activity.data.emoji]: (prev[activity.data.emoji] || 0) + 1
      }))
    }
  }, [])

  // Subscribe to activity events directly from Croquet model
  useEffect(() => {
    if (!view || !model) {
      return
    }
    
    console.log('🚀 Setting up Croquet view subscription for activity_received events')
    
    // Subscribe to activity_received events
    view.subscribe(model.id, 'activity_received', handleActivityReceived)
    
    return () => {
      view.unsubscribe(model.id, 'activity_received', handleActivityReceived)
    }
  }, [view, model, handleActivityReceived])

  // Load historical activities when session becomes ready
  useEffect(() => {
    if (view && model && isReady) {
      // Check if model has getHistoricalActivities method
      const modelWithActivities = model as any
      if (typeof modelWithActivities.getHistoricalActivities === 'function') {
        console.log('🔄 Loading historical activities from ReactTogetherModel...')
        const historicalActivities = modelWithActivities.getHistoricalActivities()
        
        // Process each historical activity
        historicalActivities.forEach((activity: ActivityEvent) => {
          handleActivityReceived(activity)
        })
        
        console.log(`✅ Loaded ${historicalActivities.length} historical activities`)
      } else {
        console.log('❌ Model does not have getHistoricalActivities method')
      }
    }
  }, [view, model, isReady, handleActivityReceived])

  return (
    <ActivitySynqInnerContent 
      activityFeed={activityFeed}
      voteCount={voteCount}
      emojis={emojis}
      registerActivity={registerActivity}
      isReady={isReady}
      status={status}
      userId={userId}
    />
  )
}

function ActivitySynqInnerContent({ 
  activityFeed, 
  voteCount, 
  emojis,
  registerActivity,
  isReady,
  status,
  userId
}: { 
  activityFeed: ActivityFeedEntry[]
  voteCount: Record<string, number>
  emojis: string[]
  registerActivity: (type: string, data?: any) => void
  isReady: boolean
  status: string
  userId: string
}) {


  const getStatusColor = () => {
    switch (status) {
      case 'ready': return 'bg-green-100 border-green-300 text-green-800'
      case 'initializing': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'disconnected': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'error': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const handleEmojiVote = (emoji: string) => {
    const voteData: EmojiVoteData = {
      emoji,
      timestamp: Date.now()
    }
    
    console.log('🗳️ Registering vote:', voteData)
    registerActivity('emoji_vote', voteData)
  }

  // Get user display name  
  const getUserDisplayName = (activityUserId: string) => {
    if (activityUserId === 'current-user') {
      const urlParams = new URLSearchParams(window.location.search)
      const userParam = urlParams.get('user')
      return userParam ? `Voter ${userParam}` : userId?.slice(-8) || 'Anonymous'
    }
    
    if (activityUserId?.includes('voter-1')) return 'Voter 1'
    if (activityUserId?.includes('voter-2')) return 'Voter 2'
    if (activityUserId?.includes('user1')) return 'Voter 1' 
    if (activityUserId?.includes('user2')) return 'Voter 2'
    
    // Extract user param from userId if present
    const match = activityUserId?.match(/voter-(.+)/)
    if (match) return `Voter ${match[1]}`
    
    return activityUserId?.slice(-8) || 'Anonymous'
  }

  const getActivityDescription = (entry: ActivityFeedEntry) => {
    switch (entry.type) {
      case 'emoji_vote':
        return `${getUserDisplayName(entry.userId)} voted ${entry.data?.emoji || '❓'}`
      default:
        return `${getUserDisplayName(entry.userId)} performed ${entry.type}`
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">🗳️ ActivitySynq Croquet Sync Test</h1>
        <p className="text-gray-600 text-sm">Testing proper Croquet-based historical synchronization</p>
        <p className="text-blue-600 text-xs mt-1">
          Activities stored in ReactTogetherModel, automatically synced to new tabs
        </p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-lg border-2 p-3 mb-4 ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status: {status} | Ready: {isReady ? 'Yes' : 'No'}</span>
          <div className="text-xs">
            User: <span className="font-mono">{getUserDisplayName('current-user')}</span>
          </div>
        </div>
      </div>

      {/* Emoji Voting */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-center">Vote for Your Favorite!</h3>
        <div className="grid grid-cols-3 gap-3">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiVote(emoji)}
              disabled={!isReady}
              className={`
                px-4 py-3 rounded-lg border-2 transition-all duration-200 text-center
                ${isReady 
                  ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 hover:scale-105' 
                  : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                }
              `}
            >
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-xs font-medium text-gray-700">
                {voteCount[emoji] || 0} votes
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          {isReady ? '✅ Votes sync via Croquet ReactTogetherModel' : '📦 Votes will be sent when reconnected'}
        </p>
      </div>

      {/* Activity Feed */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-3">🔔 Live Activity Feed</h3>
        <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto border">
          {activityFeed.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">👆</div>
              <p className="text-sm">Vote above to see activities in the feed!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activityFeed.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-600">
                        {getActivityDescription(entry)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-1 text-sm">Proper Croquet Sync Testing:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>Step 1:</strong> Vote several times in this tab to create history in ReactTogetherModel</li>
          <li>• <strong>Step 2:</strong> Open new tabs with different <code>?user=</code> parameters</li>
          <li>• <strong>Step 3:</strong> New tabs should automatically receive historical activities from model</li>
          <li>• <strong>Step 4:</strong> All vote counts should match exactly across all tabs</li>
          <li>• <strong>Debug:</strong> Check console for detailed Croquet synchronization logs</li>
        </ul>
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
          <strong>🔧 Technical:</strong> This version uses proper Croquet session state instead of 
          custom cross-tab communication. Activities are stored in ReactTogetherModel and automatically 
          synced to all views.
        </div>
      </div>
    </div>
  )
}

export default App