# URGENT FIXES for ActivitySynq Issues

## Issue 1: Viewport-Dependent Updates Bug

**Symptom**: Clicking activities in second window doesn't cause updates until scrolling to view first window.

**Root Cause**: Browser tab visibility optimization + missing Page Visibility API integration

### Immediate Fix for Website Demo

**File**: `website/src/components/demo/reactTogether/ActivitySynqDemo.tsx`

Add after line 124 (inside the subscription useEffect):

```typescript
// Add visibility change handling to fix viewport update bug
useEffect(() => {
  const handleVisibilityChange = () => {
    if (!document.hidden && view && model) {
      console.log('🔄 Tab became visible - syncing state')
      // Force state sync when tab becomes visible
      const modelWithActivities = model as any
      if (typeof modelWithActivities.getHistoricalActivities === 'function') {
        const historicalActivities = modelWithActivities.getHistoricalActivities()
        
        // Clear existing state and re-process all activities
        setActivityFeed([])
        setVoteCount({})
        processedActivitiesRef.current.clear()
        
        historicalActivities.forEach((activity: ActivityEvent) => {
          handleActivityReceived(activity)
        })
      }
    }
  }

  const handleFocus = () => {
    console.log('🔄 Window gained focus - syncing state')
    handleVisibilityChange()
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('focus', handleFocus)
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('focus', handleFocus)
  }
}, [view, model, handleActivityReceived])
```

### Additional Force Re-render Fix

Add to the handleActivityReceived function (around line 62):

```typescript
const handleActivityReceived = useCallback((activity: ActivityEvent) => {
  console.log('ActivitySynq Demo - Activity received:', activity)
  
  // Force immediate re-render for cross-tab updates
  React.unstable_batchedUpdates(() => {
    // ... existing logic ...
    
    setActivityFeed(prev => [feedEntry, ...prev].slice(0, 10))
    
    if (activity.type === 'emoji_vote' && activity.data?.emoji) {
      setVoteCount(prev => ({
        ...prev,
        [activity.data.emoji]: (prev[activity.data.emoji] || 0) + 1
      }))
    }
  })
}, [])
```

## Issue 2: Random Disconnections and Won't Reconnect

**Symptom**: "User 2 disconnected" randomly and won't reconnect

**Root Cause**: No automatic reconnection logic + session name instability

### Fix 1: Session Name Stability

**File**: `website/src/components/demo/reactTogether/ActivitySynqDemo.tsx`

Replace line 26:
```typescript
// BEFORE (causes session isolation):
const defaultSessionName = `emoji-voting-demo-${Date.now().toString(36).slice(-6)}`

// AFTER (stable session for all users):
const defaultSessionName = 'emoji-voting-demo-stable'
```

### Fix 2: Add Reconnection Logic to Context Pattern

**File**: `packages/react-together/src/context/ActivitySynqContext.tsx`

Add reconnection effect after line 137 (inside ActivitySynqInternalProvider):

```typescript
// Add automatic reconnection logic
const [reconnectAttempts, setReconnectAttempts] = useState(0)
const maxReconnectAttempts = 5

useEffect(() => {
  if (status === 'disconnected' && reconnectAttempts < maxReconnectAttempts) {
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000) // Exponential backoff
    
    console.log(`🔄 Attempting reconnection ${reconnectAttempts + 1}/${maxReconnectAttempts} in ${delay}ms`)
    
    const timer = setTimeout(() => {
      setReconnectAttempts(prev => prev + 1)
      // Force component remount to trigger reconnection
      window.location.reload()
    }, delay)
    
    return () => clearTimeout(timer)
  } else if (status === 'ready') {
    // Reset reconnect attempts on successful connection
    setReconnectAttempts(0)
  }
}, [status, reconnectAttempts])
```

### Fix 3: Add Connection Monitoring

Add to ActivitySynqDemoContent after line 137:

```typescript
// Add connection health monitoring
useEffect(() => {
  if (!view || !model || !isReady) return
  
  let heartbeatInterval: NodeJS.Timeout
  let lastActivityTime = Date.now()
  
  // Send heartbeat every 30 seconds
  heartbeatInterval = setInterval(() => {
    if (isReady) {
      registerActivity('heartbeat', { 
        userId, 
        timestamp: Date.now(),
        lastActivity: lastActivityTime
      })
      console.log('💓 Heartbeat sent')
    }
  }, 30000)
  
  // Track last activity time
  const activityListener = () => {
    lastActivityTime = Date.now()
  }
  
  if (view && model) {
    view.subscribe(model.id, 'activity_received', activityListener)
  }
  
  return () => {
    clearInterval(heartbeatInterval)
    if (view && model) {
      view.unsubscribe(model.id, 'activity_received', activityListener)
    }
  }
}, [view, model, isReady, registerActivity, userId])
```

## Issue 3: Global Pattern Disconnection Fix

**File**: `packages/react-together/src/global/ActivitySynqGlobalManager.ts`

Add reconnection properties and methods:

```typescript
export class ActivitySynqGlobalManager {
  private static instance: ActivitySynqGlobalManager | null = null
  private session: MultisynqSession<MultisynqReactView<ActivityModel>> | null = null
  private eventEmitter: BrowserEventEmitter = new BrowserEventEmitter()
  private config: ActivitySynqConfig | null = null
  private initPromise: Promise<void> | null = null
  
  // Add reconnection properties
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private isReconnecting: boolean = false

  // ... existing code ...

  private async doInitialize(config: ActivitySynqConfig): Promise<void> {
    try {
      // ... existing initialization code ...

      // Add disconnection handlers
      this.session.view.subscribe(this.session.view.model.id, 'view-synced', (synced: boolean) => {
        if (synced) {
          console.log('✅ ActivitySynq Global: Connected')
          this.eventEmitter.emit('status_changed', 'ready')
          this.reconnectAttempts = 0 // Reset on successful connection
        } else {
          console.warn('⚠️ ActivitySynq Global: Disconnected')
          this.eventEmitter.emit('status_changed', 'disconnected')
          this.attemptReconnection() // Add automatic reconnection
        }
      })

      this.eventEmitter.emit('status_changed', 'ready')
    } catch (error) {
      console.error('ActivitySynqGlobalManager: Failed to initialize:', error)
      this.eventEmitter.emit('status_changed', 'error')
      this.attemptReconnection() // Try to reconnect on initialization failure
      throw error
    }
  }

  private async attemptReconnection(): Promise<void> {
    if (this.isReconnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('🚨 ActivitySynq Global: Max reconnection attempts reached')
      this.eventEmitter.emit('status_changed', 'error')
      return
    }

    this.isReconnecting = true
    this.reconnectAttempts++
    
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000) // Exponential backoff
    console.log(`🔄 ActivitySynq Global: Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`)

    setTimeout(async () => {
      try {
        this.eventEmitter.emit('status_changed', 'initializing')
        
        // Clean up existing session
        if (this.session) {
          this.session.leave()
          this.session = null
        }

        // Reinitialize with same config
        await this.doInitialize(this.config!)
        console.log('✅ ActivitySynq Global: Reconnection successful')
        
      } catch (error) {
        console.error('❌ ActivitySynq Global: Reconnection failed:', error)
        this.attemptReconnection() // Retry
      } finally {
        this.isReconnecting = false
      }
    }, delay)
  }

  // Add method to manually trigger reconnection
  reconnect(): void {
    if (!this.isReconnecting) {
      this.reconnectAttempts = 0
      this.attemptReconnection()
    }
  }
}
```

## Quick Test Protocol

1. **Apply Fix 1** (Viewport bug):
   ```bash
   # Edit ActivitySynqDemo.tsx with visibility fixes
   npm run website
   # Test: Open 2 tabs, vote in background tab, verify foreground tab updates immediately
   ```

2. **Apply Fix 2** (Session stability):
   ```bash
   # Change defaultSessionName to stable value
   # Test: Multiple users should stay in same session
   ```

3. **Apply Fix 3** (Reconnection):
   ```bash
   # Add reconnection logic
   # Test: Disconnect network, reconnect, verify automatic recovery
   ```

## Verification Commands

```bash
# Test viewport bug fix
echo "Test 1: Open /demos/ActivitySynq?user=user1 and ?user=user2"
echo "Vote in background tab, verify immediate sync"

# Test disconnection fix  
echo "Test 2: Disconnect network for 10 seconds"
echo "Verify automatic reconnection occurs"

# Test session stability
echo "Test 3: Multiple users join same session"
echo "Verify all users see each other's activities"
```

These fixes address the core issues you identified and should resolve both the viewport-dependent updates and random disconnections.