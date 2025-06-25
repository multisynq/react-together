import { useState, useEffect, useCallback, useRef } from 'react'
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

export function ActivitySynqDemo() {
  // Get session and user parameters from URL
  const urlParams = new URLSearchParams(window.location.search)
  const hashParams = new URLSearchParams(window.location.hash.slice(1))
  
  const userParam = urlParams.get('user')
  const sessionName = urlParams.get('rtName') || 'emoji-voting-demo-fixed'
  const sessionPassword = hashParams.get('rtPwd') || 'vote-together'
  const userId = userParam ? `emoji-voter-${userParam}` : undefined

  const config = {
    // Essential configuration for ActivitySynq
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    sessionName: sessionName, // Groups users together - from URL params
    sessionPassword: sessionPassword, // Secure session access - from URL hash
    userId: userId, // Identify specific users
  }

  return (
    <ActivitySynqProvider config={config}>
      <ActivitySynqDemoContent userId={userId || 'anonymous'} />
    </ActivitySynqProvider>
  )
}

// Demo content that shows emoji voting functionality
function ActivitySynqDemoContent({ userId }: { userId: string }) {
  const { view, model } = useMultisynqContext()
  const { registerActivity, isReady, status, bufferedEventCount } = useActivitySynq()
  const [activityFeed, setActivityFeed] = useState<ActivityFeedEntry[]>([])
  const [voteCount, setVoteCount] = useState<Record<string, number>>({})
  
  // Available emojis for voting
  const emojis = ['😍', '🚀', '💡', '🎉', '❤️', '👍']

  // Component-level deduplication for React Strict Mode
  const processedActivitiesRef = useRef<Set<string>>(new Set())

  // Handle activity events from Croquet model
  const handleActivityReceived = useCallback((activity: ActivityEvent) => {
    console.log('ActivitySynq Demo - Activity received:', activity)
    
    // Create unique ID for deduplication
    const activityId = `${activity.userId}-${activity.type}-${activity.timestamp}-${JSON.stringify(activity.data)}`
    
    // Skip if already processed by this component
    if (processedActivitiesRef.current.has(activityId)) {
      console.log('Skipping duplicate activity:', activityId)
      return
    }
    
    processedActivitiesRef.current.add(activityId)
    
    // Add to activity feed
    const feedEntry: ActivityFeedEntry = {
      id: crypto.randomUUID(),
      type: activity.type,
      userId: activity.userId || 'unknown',
      data: activity.data,
      timestamp: activity.timestamp
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
    if (!view || !model) return
    
    view.subscribe(model.id, 'activity_received', handleActivityReceived)
    
    return () => {
      view.unsubscribe(model.id, 'activity_received', handleActivityReceived)
    }
  }, [view, model, handleActivityReceived])

  // Load historical activities when session becomes ready
  useEffect(() => {
    if (view && model && isReady) {
      const modelWithActivities = model as any
      if (typeof modelWithActivities.getHistoricalActivities === 'function') {
        const historicalActivities = modelWithActivities.getHistoricalActivities()
        historicalActivities.forEach((activity: ActivityEvent) => {
          handleActivityReceived(activity)
        })
      }
    }
  }, [view, model, isReady, handleActivityReceived])

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
    
    registerActivity('emoji_vote', voteData)
    
    // Note: Vote count will be updated via the activity callback
    // This prevents double-counting when the activity is received back
  }

  // Get user display name  
  const getUserDisplayName = (activityUserId: string) => {
    if (activityUserId === userId) return 'You'
    if (activityUserId?.includes('user1')) return 'User 1'
    if (activityUserId?.includes('user2')) return 'User 2'
    if (activityUserId?.includes('voter-1')) return 'User 1'
    if (activityUserId?.includes('voter-2')) return 'User 2'
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
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">🗳️ Emoji Voting Demo</h1>
        <p className="text-gray-600 text-sm">Vote with emojis and see real-time results across all users</p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-lg border-2 p-3 mb-4 ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status: {status} | Ready: {isReady ? 'Yes' : 'No'}</span>
          <div className="text-xs">
            User: <span className="font-mono">{getUserDisplayName(userId)}</span>
            {bufferedEventCount > 0 && (
              <span className="ml-2 bg-yellow-200 px-2 py-1 rounded text-yellow-800">
                {bufferedEventCount} buffered
              </span>
            )}
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
          {isReady ? '✅ Votes sync instantly across all users' : '📦 Votes will be sent when reconnected'}
        </p>
      </div>

      {/* Activity Feed */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-3">🔔 Live Activity Feed</h3>
        <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto border">
          {activityFeed.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">👆</div>
              <p className="text-sm">Click a button above to see activities!</p>
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
        <h4 className="font-semibold text-blue-900 mb-1 text-sm">Multi-User ActivitySynq Features:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>Real-time sync</strong> - Vote in one tab, see it instantly in all other tabs</li>
          <li>• <strong>Historical sync</strong> - New tabs automatically load all previous votes</li>
          <li>• <strong>Session isolation</strong> - Only users with same session name/password see each other</li>
          <li>• <strong>Offline buffering</strong> - Votes are saved and synced when reconnected</li>
          <li>• <strong>Cross-user feed</strong> - Activity feed shows actions from all participants</li>
        </ul>
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
          <strong>✨ Test Instructions:</strong> Vote here, then open this page in new tabs with different 
          <code>?user=</code> parameters. New tabs will show all previous votes instantly!
        </div>
      </div>
    </div>
  )
}