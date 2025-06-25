# Website Context Isolation Architecture

## Problem Statement

The React Together website has a global `ReactTogetherProvider` that wraps the entire application. However, some demos (like `useActivitySynq`) need to manage their own isolated ReactTogether/Croquet sessions to:

1. Avoid conflicts with the global session
2. Prevent double-loading of ReactTogether contexts
3. Allow multiple demo instances to synchronize with each other independently
4. Demonstrate proper usage patterns without interference

## Solution: Routing-Based Context Isolation

### Architecture Overview

The website uses **two distinct routing structures** to separate contexts:

```
┌─────────────────────────────────────────────────────────────┐
│                    React Router App                         │
├─────────────────────────────────────────────────────────────┤
│  Regular Routes (WITH ReactTogether Context)               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ <Route element={<WithReactTogetherProvider />}>        │ │
│  │   <Route path="/" element={<HomePage />} />            │ │
│  │   <Route path="/useActivitySynq" element={<DocsPage />}│ │
│  │   {/* All documentation pages */}                      │ │
│  │ </Route>                                               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Isolated Routes (NO Global Context)                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ <Route element={<IsolatedDemoLayout />}>               │ │
│  │   <Route path="demos/ActivitySynq" element={<Demo1 />}│ │
│  │   <Route path="demos/useActivitySynq" element={<Demo2/>}│ │
│  │ </Route>                                               │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. WithReactTogetherProvider (Global Context Shell)
```typescript
// Provides shared ReactTogether context for main website
export function WithReactTogetherProvider() {
  return (
    <ReactTogetherProvider config={globalConfig}>
      <Outlet /> {/* Regular pages render here */}
    </ReactTogetherProvider>
  )
}
```

#### 2. IsolatedDemoLayout (Isolated Shell)
```typescript
// Provides styling but NO ReactTogether context
export function IsolatedDemoLayout() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Outlet /> {/* Isolated demos render here */}
    </div>
  )
}
```

#### 3. Demo Components (Self-Contained)
```typescript
// Each demo manages its own ActivitySynqProvider
export function UseActivitySynqDemo() {
  const config = {
    sessionName: getSessionFromURL(), // From iframe URL params
    sessionPassword: getPasswordFromURL(),
    // ... other config
  }

  return (
    <ActivitySynqProvider config={config}>
      <DemoContent />
    </ActivitySynqProvider>
  )
}
```

## Session Parameter Flow

### 1. Documentation Page Setup
```typescript
// /useActivitySynq documentation page
export default function UseActivitySynqDocumentationPage() {
  const [sessionName] = useLocalStorage('session-name', randomId())
  const sessionParams = {
    name: sessionName,
    password: 'demo-password'
  }

  return (
    <DocumentationDemo 
      url='useActivitySynq' 
      session1={sessionParams} 
      session2={sessionParams} // Same session for sync
    />
  )
}
```

### 2. URL Construction
```typescript
// DocumentationDemo constructs iframe URLs
const url1 = buildUrl('/demos/useActivitySynq', sessionParams, 'user1')
const url2 = buildUrl('/demos/useActivitySynq', sessionParams, 'user2')

// Results in URLs like:
// /demos/useActivitySynq?user=user1&rtName=abc123#rtPwd=password
// /demos/useActivitySynq?user=user2&rtName=abc123#rtPwd=password
```

### 3. Parameter Extraction
```typescript
// Each demo instance reads shared session params
const urlParams = new URLSearchParams(window.location.search)
const hashParams = new URLSearchParams(window.location.hash.slice(1))

const sessionName = urlParams.get('rtName') || 'fallback'
const sessionPassword = hashParams.get('rtPwd') || 'fallback'
const userId = urlParams.get('user') // user1 or user2
```

## Benefits of This Architecture

### ✅ Clean Separation
- Main website uses global ReactTogether context
- Demos use isolated contexts
- No conflicts or double-loading

### ✅ Proper Iframe Isolation
- Each iframe is a separate document
- Complete isolation of JavaScript contexts
- No shared memory or global variables

### ✅ Scalable Pattern
- Easy to add new isolated demos
- Consistent routing structure
- Clear boundaries between contexts

### ✅ Real-World Usage Demonstration
- Shows how to properly configure ActivitySynq
- Demonstrates session management
- Provides working multi-user examples

## Context Boundaries

| Route Type | Path Example | Context | Purpose |
|------------|--------------|---------|----------|
| Documentation | `/useActivitySynq` | Global ReactTogether | Website navigation, docs |
| Demo (Isolated) | `/demos/useActivitySynq` | Own ActivitySynq | Isolated demo functionality |
| Demo (Integrated) | `/demos/chat` | Global ReactTogether | Uses shared website session |

## Session Isolation Verification

To verify proper isolation, check:

1. **Network Tab**: Should see separate session connections for each iframe
2. **Console Logs**: Each demo should log its own session parameters
3. **Cross-Demo Sync**: Activities in one iframe appear in the other
4. **Website Independence**: Main website doesn't interfere with demo sessions

## Troubleshooting Common Issues

### Issue: Three Sessions Instead of Two
**Cause**: Main documentation page also has ReactTogether context  
**Solution**: This is expected - main page + 2 iframes = 3 sessions

### Issue: Demos Not Synchronizing
**Cause**: Session parameters not matching between iframes  
**Solution**: Verify URL parameters are identical except for `user`

### Issue: Context Conflicts
**Cause**: Demo route not properly isolated  
**Solution**: Ensure demo route is under `IsolatedDemoLayout`

## Technical Implementation Details

### URL Parameter Format
- Session Name: `?rtName=session-identifier`
- Session Password: `#rtPwd=session-password` 
- User ID: `?user=user1` or `?user=user2`

### Fallback Behavior
- If no URL parameters: Use component defaults
- If invalid parameters: Log error and use fallbacks
- If network failure: Buffer activities until reconnection

This architecture ensures clean separation of concerns while providing a robust foundation for demonstrating real-time collaborative features.