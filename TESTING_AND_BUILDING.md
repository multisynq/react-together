# TESTING AND BUILDING PROCEDURES

## Comprehensive Testing for ActivitySynq State Synchronization

### Critical Issues Identified

**1. Viewport-Dependent Updates Bug**
- **Symptom**: Clicking activities in second window doesn't trigger updates until scrolling to view first window
- **Root Cause**: Likely React rendering optimization or viewport intersection issues
- **Location**: Website demo at `/ActivitySynq`

**2. Random Disconnections**
- **Symptom**: "User 2 disconnected" and won't reconnect
- **Root Cause**: Session instability, possible config recreation, or network issues

**3. State Synchronization Lag**
- **Symptom**: Activities not appearing immediately across tabs/windows

## Testing Procedures

### 1. Multi-Tab/Multi-Window Testing Protocol

**Basic State Sync Test**
```bash
# Terminal 1: Start website
npm run website

# Open multiple browser tabs/windows:
# Tab 1: http://localhost:5173/demos/ActivitySynq?user=user1
# Tab 2: http://localhost:5173/demos/ActivitySynq?user=user2  
# Tab 3: http://localhost:5173/demos/ActivitySynq?user=user3
```

**Test Checklist:**
- [ ] All tabs show identical vote counts
- [ ] Activities appear in all tabs within 2 seconds
- [ ] Historical sync works (new tabs load previous activities)
- [ ] Clear function works across all tabs
- [ ] Connection status shows "ready" in all tabs
- [ ] User identification works correctly

### 2. Context vs Global Pattern Testing

**Context Pattern Test (Traditional)**
```bash
cd standalone-activitysynq-test
npm run dev
# Open: http://localhost:5173?user=user1
# Open: http://localhost:5173?user=user2
```

**Global Pattern Test (Singleton)**
```bash
cd standalone-activitysynq-global-demo  
npm run dev
# Open: http://localhost:5173?user=user1
# Open: http://localhost:5173?user=user2
```

**Comparative Test Matrix:**
| Test Case | Context Pattern | Global Pattern | Expected Result |
|-----------|----------------|----------------|-----------------|
| Activity Registration | ✓ | ✓ | Identical behavior |
| Cross-tab Sync | ✓ | ✓ | Same latency |
| Historical Loading | ✓ | ✓ | Same data |
| Reconnection | ✓ | ✓ | Same recovery |
| Memory Usage | Lower | Higher | Acceptable diff |

### 3. Connection Stability Testing

**Monitor Network Events:**
```javascript
// Add to demo components for debugging
useEffect(() => {
  const { session, view, model } = useMultisynqContext()
  
  if (view && model) {
    // Monitor connection events
    view.subscribe(session.id, 'view-join', (viewInfo) => {
      console.log('🟢 User joined:', viewInfo)
    })
    
    view.subscribe(session.id, 'view-exit', (viewInfo) => {
      console.log('🔴 User left:', viewInfo)
    })
    
    // Monitor session state
    const interval = setInterval(() => {
      console.log('📊 Session State:', {
        connected: !!session,
        viewId: view.viewId,
        modelActivities: model.activities?.length || 0,
        isReady
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }
}, [session, view, model, isReady])
```

**Reconnection Test Protocol:**
1. Open 2 tabs with different users
2. Disconnect network for 10 seconds
3. Reconnect network
4. Verify both tabs reconnect automatically
5. Test activity registration after reconnection
6. Verify historical sync still works

### 4. Username Tracking Test

**Username Generation Test:**
```javascript
// Test in browser console
function testUserIdGeneration() {
  const tests = [
    { url: '?user=alice', expected: 'emoji-voter-alice' },
    { url: '?user=bob', expected: 'emoji-voter-bob' },
    { url: '', expected: /emoji-voter-\w{6}/ }, // Random fallback
  ]
  
  tests.forEach(test => {
    // Simulate URL params
    const urlParams = new URLSearchParams(test.url)
    const userParam = urlParams.get('user')
    const userId = userParam ? `emoji-voter-${userParam}` : 
                    `emoji-voter-${Math.random().toString(36).substring(2, 8)}`
    
    if (test.expected instanceof RegExp) {
      console.assert(test.expected.test(userId), `Failed: ${userId}`)
    } else {
      console.assert(userId === test.expected, `Failed: ${userId} !== ${test.expected}`)
    }
  })
}
```

### 5. Automated E2E Testing

**Enhanced Playwright Tests:**
```typescript
// e2e/activity-synq-comprehensive.spec.ts
import { test, expect, Browser, Page } from '@playwright/test'

test.describe('ActivitySynq Comprehensive Testing', () => {
  
  test('should maintain state sync across multiple tabs', async ({ browser }) => {
    const tabs = await Promise.all([
      createUserTab(browser, 'user1'),
      createUserTab(browser, 'user2'),
      createUserTab(browser, 'user3')
    ])
    
    // Test activity registration
    await tabs[0].click('button:has-text("😍")')
    await tabs[1].click('button:has-text("🚀")')
    
    // Verify all tabs show both activities
    for (const tab of tabs) {
      await expect(tab.locator('text=voted 😍')).toBeVisible({ timeout: 3000 })
      await expect(tab.locator('text=voted 🚀')).toBeVisible({ timeout: 3000 })
    }
    
    // Test vote count consistency
    for (const tab of tabs) {
      await expect(tab.locator('text=1 votes').first()).toBeVisible()
    }
    
    await Promise.all(tabs.map(tab => tab.close()))
  })
  
  test('should handle viewport scrolling bug', async ({ browser }) => {
    const page1 = await createUserTab(browser, 'user1')
    const page2 = await createUserTab(browser, 'user2')
    
    // Scroll page2 to bottom (simulate not viewing activity area)
    await page2.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Register activity from page1
    await page1.click('button:has-text("💡")')
    
    // Verify activity appears in page2 WITHOUT scrolling back up
    await expect(page2.locator('text=voted 💡')).toBeVisible({ timeout: 3000 })
    
    await page1.close()
    await page2.close()
  })
  
  test('should handle reconnections gracefully', async ({ browser }) => {
    const page = await createUserTab(browser, 'testuser')
    
    // Register initial activity
    await page.click('button:has-text("❤️")')
    await expect(page.locator('text=voted ❤️')).toBeVisible()
    
    // Simulate network interruption
    await page.context().setOffline(true)
    await page.waitForTimeout(2000)
    
    // Restore connection
    await page.context().setOffline(false)
    
    // Verify reconnection
    await expect(page.locator('text=Status: ready')).toBeVisible({ timeout: 10000 })
    
    // Test functionality after reconnection
    await page.click('button:has-text("🎉")')
    await expect(page.locator('text=voted 🎉')).toBeVisible({ timeout: 3000 })
    
    await page.close()
  })
  
  test('should track username changes correctly', async ({ browser }) => {
    const users = ['alice', 'bob', 'charlie']
    const tabs = await Promise.all(
      users.map(user => createUserTab(browser, user))
    )
    
    // Each user votes
    await tabs[0].click('button:has-text("😍")')
    await tabs[1].click('button:has-text("🚀")')  
    await tabs[2].click('button:has-text("💡")')
    
    // Verify username display
    for (const [i, tab] of tabs.entries()) {
      const expectedUser = users[i]
      await expect(tab.locator(`text=User ${expectedUser.charAt(0).toUpperCase() + expectedUser.slice(1)}`)).toBeVisible()
    }
    
    await Promise.all(tabs.map(tab => tab.close()))
  })
})

async function createUserTab(browser: Browser, user: string): Promise<Page> {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(`/demos/ActivitySynq?user=${user}`)
  await page.waitForSelector('text=🗳️ Emoji Voting Demo', { timeout: 10000 })
  await expect(page.locator('text=Ready: Yes')).toBeVisible({ timeout: 15000 })
  return page
}
```

### 6. Memory Leak Detection

**Memory Monitoring Test:**
```javascript
// Add to component for memory leak detection
useEffect(() => {
  const startMemory = performance.memory?.usedJSHeapSize || 0
  let activityCount = 0
  
  const interval = setInterval(() => {
    activityCount++
    registerActivity('memory_test', { count: activityCount })
    
    if (activityCount % 100 === 0) {
      const currentMemory = performance.memory?.usedJSHeapSize || 0
      const memoryDiff = currentMemory - startMemory
      console.log(`Memory after ${activityCount} activities: +${memoryDiff} bytes`)
      
      if (memoryDiff > 50 * 1024 * 1024) { // 50MB threshold
        console.warn('🚨 Potential memory leak detected!')
        clearInterval(interval)
      }
    }
  }, 100)
  
  return () => clearInterval(interval)
}, [registerActivity])
```

## Building Procedures

### 1. Pre-Build Validation

**Environment Check:**
```bash
# Verify environment variables
echo "API Key: ${VITE_API_KEY:0:8}..."
echo "App ID: $VITE_APP_ID"

# Verify node version
node --version  # Should be >= 18

# Clean install
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Validation:**
```bash
# Main package
cd packages/react-together
npm run lint
npx tsc --noEmit

# Standalone demos
cd ../../standalone-activitysynq-test
npx tsc --noEmit

cd ../standalone-activitysynq-global-demo  
npx tsc --noEmit
```

### 2. Build Process

**Main Package Build:**
```bash
cd packages/react-together
npm run build

# Verify outputs
ls -la dist/
file dist/index.js
file dist/index.d.ts
```

**Demo Builds:**
```bash
# Context pattern demo
cd standalone-activitysynq-test
npm run build
npm run preview  # Test production build

# Global pattern demo
cd standalone-activitysynq-global-demo
npm run build  
npm run preview  # Test production build

# Website
cd website
npm run build
npm run preview
```

### 3. Integration Testing

**Cross-Pattern Compatibility:**
```bash
# Test Context and Global patterns together
# Tab 1: Context pattern demo
# Tab 2: Global pattern demo  
# Both should sync to same session if using same session params
```

### 4. Performance Benchmarking

**Latency Testing:**
```javascript
// Add to demos for latency measurement
const measureLatency = () => {
  const startTime = performance.now()
  
  registerActivity('latency_test', { 
    clientTimestamp: startTime,
    userId 
  })
  
  // Measure round-trip time when activity comes back
  const unsubscribe = view.subscribe(model.id, 'activity_received', (activity) => {
    if (activity.type === 'latency_test' && activity.data?.userId === userId) {
      const endTime = performance.now()
      const latency = endTime - activity.data.clientTimestamp
      console.log(`🚀 Round-trip latency: ${latency.toFixed(2)}ms`)
      unsubscribe()
    }
  })
}
```

## Issue Resolution

### Fix for Viewport Update Bug

**Root Cause Analysis:**
The issue is likely caused by React's rendering optimization or intersection observer behavior. 

**Potential Fixes:**

1. **Force Re-render on Activity Reception:**
```typescript
// In ActivitySynqDemo.tsx
useEffect(() => {
  if (!view || !model) return
  
  const handleActivityReceived = (activity: ActivityEvent) => {
    // Force immediate re-render
    flushSync(() => {
      handleActivityReceived(activity)
    })
  }
  
  view.subscribe(model.id, 'activity_received', handleActivityReceived)
}, [view, model])
```

2. **Disable React Optimizations for Activity Feed:**
```typescript
// Wrap activity feed in memo with custom comparison
const ActivityFeed = memo(({ activities }) => {
  // Component implementation
}, () => false) // Always re-render
```

### Fix for Random Disconnections

**Session Stability Improvements:**

1. **Stable Configuration:**
```typescript
// Use stable refs for config
const configRef = useRef(config)
useEffect(() => {
  configRef.current = config
}, [config.apiKey, config.appId, config.sessionName, config.sessionPassword, config.userId])
// Don't include onActivity in dependencies
```

2. **Reconnection Logic:**
```typescript
// Add automatic reconnection
useEffect(() => {
  if (!isReady && status === 'disconnected') {
    const reconnectTimer = setTimeout(() => {
      console.log('Attempting reconnection...')
      // Trigger reconnection logic
    }, 5000)
    
    return () => clearTimeout(reconnectTimer)
  }
}, [isReady, status])
```

3. **Connection Monitoring:**
```typescript
// Monitor connection health
useEffect(() => {
  const healthCheck = setInterval(() => {
    if (session && view) {
      // Send heartbeat
      view.publish(model.id, 'heartbeat', { 
        userId, 
        timestamp: Date.now() 
      })
    }
  }, 30000) // Every 30 seconds
  
  return () => clearInterval(healthCheck)
}, [session, view, model, userId])
```

## Continuous Monitoring

### Real-time Monitoring Dashboard

```typescript
// Add to demos for real-time monitoring
function useActivitySynqMonitoring() {
  const { session, view, model } = useMultisynqContext()
  const [metrics, setMetrics] = useState({
    connectedUsers: 0,
    activitiesPerSecond: 0,
    averageLatency: 0,
    connectionUptime: 0
  })
  
  useEffect(() => {
    if (!view || !model) return
    
    const startTime = Date.now()
    let activityCount = 0
    let latencySum = 0
    let latencyCount = 0
    
    const updateMetrics = () => {
      setMetrics(prev => ({
        ...prev,
        connectionUptime: Date.now() - startTime,
        activitiesPerSecond: activityCount / ((Date.now() - startTime) / 1000),
        averageLatency: latencyCount > 0 ? latencySum / latencyCount : 0
      }))
    }
    
    const interval = setInterval(updateMetrics, 1000)
    return () => clearInterval(interval)
  }, [view, model])
  
  return metrics
}
```

This comprehensive testing and building procedure should help identify and resolve the issues you're experiencing with viewport-dependent updates and random disconnections.