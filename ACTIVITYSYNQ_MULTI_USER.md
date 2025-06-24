# ActivitySynq Multi-User Synchronization

## 🚀 Overview

ActivitySynq now supports **real-time cross-user activity synchronization with historical state sync**, allowing all users in the same session to see each other's activities instantly. When new users join a session, they automatically receive all historical activities, ensuring consistent state across all participants. This enables powerful collaborative features like live activity feeds, real-time notifications, and multi-user analytics.

## ✨ Key Features

- **🔄 Cross-User Sync**: Activities from ALL users in a session are automatically shared
- **⚡ Real-Time**: Activities appear instantly across all connected users
- **📚 Historical Sync**: New users joining a session automatically receive all previous activities
- **🎯 State Consistency**: All users see the same vote counts, activity feeds, and session state
- **🔒 Session-Based**: Only users with the same `sessionName` and `sessionPassword` see each other's activities
- **📱 Offline Support**: Activities are buffered when offline and synced when reconnected
- **🎯 Type-Safe**: Full TypeScript support with generic activity types

## 🏗️ Architecture

ActivitySynq uses a publish-subscribe pattern through the ReactTogetherModel with historical state synchronization:

### Real-Time Activity Flow
1. **User A** calls `registerActivity('vote', {emoji: '😍'})`
2. **ActivitySynqContext** publishes the activity to `'activity'` event
3. **ReactTogetherModel** receives the activity and broadcasts it via `'activity_received'` event
4. **ALL users** in the session receive the activity through their `onActivity` callback

### Historical Sync Flow
1. **New User joins** session and component mounts
2. **Request historical data** via custom event to other tabs/windows
3. **Existing tab responds** with complete historical activity data
4. **New user receives** all previous activities and vote counts
5. **State synchronization** ensures all users see consistent data

### Global State Management
- **Global Activity Store**: Maintains historical activities across browser tabs
- **Cross-Tab Communication**: Uses `window.addEventListener` for tab-to-tab data sharing
- **Deduplication**: Prevents duplicate processing of activities across components
- **Memory Management**: Automatically limits historical data to prevent memory bloat

## 🔧 Implementation Guide

### Basic Setup

```typescript
import { ActivitySynqProvider, useActivitySynq } from 'react-together'

function App() {
  const config = {
    sessionName: 'my-app-session', // Users with same session see each other
    sessionPassword: 'secure-password', // Protect your session
    onActivity: (activity) => {
      // 🔥 Receives activities from ALL users in the session
      console.log(`Activity from ${activity.userId}:`, activity.type, activity.data)
    }
  }

  return (
    <ActivitySynqProvider config={config}>
      <MyComponent />
    </ActivitySynqProvider>
  )
}
```

### Multi-User Activity Handling with Historical Sync

```typescript
function MyComponent() {
  const { registerActivity, isReady } = useActivitySynq()
  const [activityFeed, setActivityFeed] = useState([])
  const [voteCount, setVoteCount] = useState({})
  const [hasLoadedHistoricalData, setHasLoadedHistoricalData] = useState(false)

  // Load historical data when component mounts and session is ready
  useEffect(() => {
    if (isReady && !hasLoadedHistoricalData) {
      console.log('Session ready - requesting historical data sync...')
      
      // Set up listener for historical data response
      const handleHistoricalResponse = (event) => {
        if (event instanceof CustomEvent && event.detail) {
          const historicalData = event.detail
          
          // Apply historical vote counts
          setVoteCount(historicalData.voteCounts)
          
          // Apply historical activities to feed
          const historicalEntries = historicalData.activities
            .slice(-10) // Only show last 10 activities
            .reverse() // Most recent first
          
          setActivityFeed(historicalEntries)
          setHasLoadedHistoricalData(true)
          console.log('Historical data loaded successfully')
        }
      }

      // Listen for historical sync response
      window.addEventListener('historical-sync-response', handleHistoricalResponse)
      
      // Request historical data
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('historical-sync-request'))
      }, 100)
      
      // Cleanup after timeout
      setTimeout(() => {
        window.removeEventListener('historical-sync-response', handleHistoricalResponse)
        if (!hasLoadedHistoricalData) {
          setHasLoadedHistoricalData(true)
        }
      }, 2000)
    }
  }, [isReady, hasLoadedHistoricalData])

  // Handle new real-time activities
  useEffect(() => {
    const handleActivity = (activity) => {
      // Add to activity feed (from ANY user)
      setActivityFeed(prev => [activity, ...prev].slice(0, 10))
      
      // Update vote counts
      if (activity.type === 'emoji_vote') {
        setVoteCount(prev => ({
          ...prev,
          [activity.data.emoji]: (prev[activity.data.emoji] || 0) + 1
        }))
      }
      
      // Show notification for other users' activities
      if (activity.userId !== myUserId) {
        showNotification(`${activity.userId} performed ${activity.type}`)
      }
    }
    
    // Register global activity handler
    // (This would be in your ActivitySynqProvider config)
  }, [])

  const handleVote = (emoji) => {
    // This activity will be seen by ALL users in the session
    registerActivity('emoji_vote', { emoji, timestamp: Date.now() })
  }

  return (
    <div>
      <div>
        Status: {hasLoadedHistoricalData ? '✅ Synced' : '🔄 Loading...'}
      </div>
      
      <button onClick={() => handleVote('😍')}>
        Vote 😍 ({voteCount['😍'] || 0} votes)
      </button>
      
      <div>
        <h3>Live Activity Feed</h3>
        {activityFeed.map(activity => (
          <div key={activity.timestamp}>
            {activity.userId}: {activity.type} - {JSON.stringify(activity.data)}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Testing Multi-User Functionality with Historical Sync

#### Real-Time Testing:
1. **Open multiple browser tabs** to your app
2. **Use different user parameters**: `?user=1` and `?user=2`
3. **Perform activities** in one tab and watch them appear instantly in the other
4. **Check the console** for activity synchronization logs

#### Historical Sync Testing:
1. **Vote several times** in the first tab to create historical data
2. **Open a new tab** with different user parameter (`?user=3`)
3. **Verify new tab shows ALL previous votes** - vote counts should match exactly
4. **Check activity feed** - should show recent activities from all users
5. **Vote in new tab** - should sync instantly to all existing tabs

#### Example Test URLs:
- Tab 1: `http://localhost:3000/?user=alice` (create some votes first)
- Tab 2: `http://localhost:3000/?user=bob` (should auto-sync historical data)
- Tab 3: `http://localhost:3000/?user=charlie` (should also sync all historical data)

#### Expected Behavior:
- ✅ **Consistent Vote Counts**: All tabs show identical vote numbers for each emoji
- ✅ **Activity Feed Sync**: Recent activities appear in all tabs
- ✅ **Real-Time Updates**: New votes appear instantly across all tabs
- ✅ **Historical Loading**: New tabs show "🔄 Loading..." then "✅ Synced"

## 🎯 Use Cases

### Live Activity Feed
```typescript
const config = {
  onActivity: (activity) => {
    setLiveActivities(prev => [activity, ...prev])
  }
}
```

### Real-Time Notifications
```typescript
const config = {
  onActivity: (activity) => {
    if (activity.userId !== currentUserId) {
      toast(`${activity.userId} just ${activity.type}`)
    }
  }
}
```

### Collaborative Analytics
```typescript
const config = {
  onActivity: (activity) => {
    // Track all user actions for analytics
    analytics.track('user_activity', {
      fromUser: activity.userId,
      activityType: activity.type,
      data: activity.data
    })
  }
}
```

### Multi-User Voting/Polling
```typescript
const config = {
  onActivity: (activity) => {
    if (activity.type === 'vote') {
      setVoteCounts(prev => ({
        ...prev,
        [activity.data.option]: (prev[activity.data.option] || 0) + 1
      }))
    }
  }
}
```

## 🔒 Session Security

- **sessionName**: Groups users together (like a room ID)
- **sessionPassword**: Prevents unauthorized access to your session
- **appId**: Isolates your app from other apps using ActivitySynq

```typescript
const config = {
  appId: 'my-app.com',           // Your app namespace
  sessionName: 'room-123',       // Specific room/session
  sessionPassword: 'secret-key', // Secure access
}
```

## 🚨 Important Notes

### Deduplication
When using React Strict Mode, you may see duplicate activities. The examples include deduplication logic to handle this.

### Activity Flow
1. User calls `registerActivity()`
2. Activity is sent to ReactTogetherModel
3. Model broadcasts to ALL views in the session
4. Each user's `onActivity` callback receives the activity

### Performance
Activities are lightweight and designed for real-time use. However, avoid sending large payloads or excessive activities to maintain performance.

## 🧪 Testing with Standalone App

A standalone test application is available at `/standalone-activitysynq-test/` that demonstrates:
- Multi-user emoji voting
- Real-time activity synchronization
- Connection status monitoring
- Offline buffering

Run with: `npm run dev` and open multiple tabs with `?user=1` and `?user=2`

## 🔄 Migration from Previous Versions

If you were using ActivitySynq before the multi-user update:

1. **No breaking changes** - existing code continues to work
2. **Enhanced functionality** - `onActivity` now receives activities from ALL users
3. **New features** - cross-user sync is automatic once `onActivity` is configured

The architecture now includes:
- Enhanced ReactTogetherModel with activity broadcasting
- Subscription to 'activity_received' events in ActivitySynqContext
- Proper multi-user activity flow

## 📝 Architecture Details

### ReactTogetherModel Changes
```typescript
// Added activity handling
handleActivity(activity: ActivityArgs) {
  // Broadcast activity to all views in the session
  this.publish(this.id, 'activity_received', activity)
}

// Added subscription in init()
this.subscribe(this.id, 'activity', this.handleActivity)
```

### ActivitySynqContext Changes
```typescript
// Added subscription to receive activities from other users
useEffect(() => {
  if (!view || !model) return
  
  const handleActivityReceived = (activity: ActivityEvent) => {
    // Call the onActivity callback for activities from all users
    config.onActivity?.(activity)
  }
  
  view.subscribe(model.id, 'activity_received', handleActivityReceived)
  
  return () => {
    view.unsubscribe(model.id, 'activity_received', handleActivityReceived)
  }
}, [view, model, config])
```

This creates a complete activity flow from any user to all other users in the same session!