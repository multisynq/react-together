import { useState, useEffect } from 'react'
import { ActivitySynqProvider, useActivitySynq, ActivityEvent } from 'react-together'
import { DynamicUrlWrapper } from '../DynamicUrlWrapper'

// Types for the emoji poll
interface VoteData {
  emoji: string
}

interface ActivityFeedEntry {
  id: string
  type: string
  userId: string
  emoji?: string
  timestamp: number
}

// Emoji options for the poll
const EMOJI_OPTIONS = ['🍕', '🍔', '🌮', '🍦', '🎮', '⚽', '🚀', '🎉']


// Global activity handler for receiving activities from other users
const VOTE_RECEIVED_EVENT = 'vote-received'

export function ActivitySynqDemo() {
  const config = {
    onActivity: (activity: ActivityEvent) => {
      console.log('ActivitySynq Demo - Activity received:', activity)
      
      // Handle emoji vote activities
      if (activity.type === 'emoji_vote' && activity.data?.emoji) {
        // Dispatch custom event for the component to catch
        const event = new CustomEvent(VOTE_RECEIVED_EVENT, {
          detail: {
            emoji: activity.data.emoji,
            userId: activity.userId,
            timestamp: activity.timestamp
          }
        })
        window.dispatchEvent(event)
      }
    }
  }

  return (
    <DynamicUrlWrapper>
      <ActivitySynqProvider config={config}>
        <EmojiPollDemoContent />
      </ActivitySynqProvider>
    </DynamicUrlWrapper>
  )
}

// Enhanced demo content that listens for activities from other users
function EmojiPollDemoContent() {
  const { registerActivity, isReady, status, error, userId, bufferedEventCount } = useActivitySynq()
  const [activityFeed, setActivityFeed] = useState<ActivityFeedEntry[]>([])

  // Listen for activities from other users via custom event
  useEffect(() => {
    const handleVoteReceived = (event: Event) => {
      if (event instanceof CustomEvent && event.detail) {
        const { emoji, userId: voterId, timestamp } = event.detail
        
        const feedEntry: ActivityFeedEntry = {
          id: crypto.randomUUID(),
          type: 'emoji_vote',
          userId: voterId,
          emoji,
          timestamp
        }
        
        setActivityFeed(prev => [feedEntry, ...prev].slice(0, 15))
      }
    }

    window.addEventListener(VOTE_RECEIVED_EVENT, handleVoteReceived)
    
    return () => {
      window.removeEventListener(VOTE_RECEIVED_EVENT, handleVoteReceived)
    }
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'ready': return 'bg-green-100 border-green-300 text-green-800'
      case 'initializing': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'disconnected': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'error': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'ready': return 'Connected and Ready ✅'
      case 'initializing': return 'Connecting... ⏳'
      case 'disconnected': return 'Disconnected ⚠️'
      case 'error': return 'Error ❌'
      default: return 'Unknown'
    }
  }

  // Handle emoji vote
  const handleVote = (emoji: string) => {
    if (!isReady) {
      console.warn('Cannot vote while disconnected')
      return
    }

    // Register the vote activity
    registerActivity('emoji_vote', { emoji } as VoteData)
  }

  // Get user display name  
  const getUserDisplayName = (activityUserId: string) => {
    if (activityUserId === userId) {
      // For current user, determine User1 vs User2 based on URL params or simple heuristic
      const urlParams = new URLSearchParams(window.location.search)
      const userName = urlParams.get('user') || 
        (activityUserId?.slice(-1) === '1' || activityUserId?.includes('1') ? 'User1' : 'User2')
      return userName
    }
    // For other users, show User1 or User2 based on their ID
    return activityUserId?.slice(-1) === '1' || activityUserId?.includes('1') ? 'User1' : 'User2'
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">🗳️ Real-time Emoji Poll</h1>
        <p className="text-gray-600 text-sm">Vote for your favorite and see real-time results!</p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-lg border-2 p-3 mb-4 ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{getStatusText()}</span>
          <div className="text-xs">
            User: <span className="font-mono">{getUserDisplayName(userId || '')}</span>
            {bufferedEventCount > 0 && (
              <span className="ml-2 bg-yellow-200 px-2 py-1 rounded text-yellow-800">
                {bufferedEventCount} buffered
              </span>
            )}
          </div>
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-600">
            Error: {error.message}
          </div>
        )}
      </div>

      {/* Emoji Poll Grid */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-center">Click an emoji to vote!</h3>
        <div className="grid grid-cols-4 gap-3">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleVote(emoji)}
              disabled={!isReady}
              className={`
                text-4xl p-4 rounded-xl border-2 transition-all duration-200
                ${isReady 
                  ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:scale-105 active:scale-95' 
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
                }
                bg-white shadow-sm hover:shadow-md
              `}
              title={`Vote for ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          {isReady ? '✅ Votes sync instantly across users' : '📦 Votes will be sent when reconnected'}
        </p>
      </div>

      {/* Activity Feed */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-3">🔔 Live Activity Feed</h3>
        <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto border">
          {activityFeed.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">🤔</div>
              <p className="text-sm">No votes yet. Be the first to vote!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activityFeed.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{entry.emoji}</span>
                      <span className="text-sm">
                        <strong className="text-blue-600">{getUserDisplayName(entry.userId)}</strong> voted {entry.emoji}
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
        <h4 className="font-semibold text-blue-900 mb-1 text-sm">How it works:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Click any emoji to cast your vote</li>
          <li>• See real-time votes from other users</li>
          <li>• Works offline with automatic sync when reconnected</li>
          <li>• Powered by ActivitySynq real-time activity tracking</li>
        </ul>
      </div>
    </div>
  )
}