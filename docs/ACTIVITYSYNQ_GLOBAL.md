# 🚀 ActivitySynq Global - Single-Line Integration

ActivitySynq Global provides a **single-line integration** pattern inspired by libraries like `react-toastify`. Instead of wrapping your entire app in a context provider, you simply place one component anywhere in your app and use the hook globally.

## Quick Start

### 1. Install Dependencies

```bash
npm install react-together zustand
```

### 2. Single-Line Setup

```jsx
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      
      {/* 🎉 Single line enables ActivitySynq globally! */}
      <ActivitySynqGlobal config={{
        apiKey: process.env.REACT_APP_MULTISYNQ_API_KEY,
        appId: process.env.REACT_APP_MULTISYNQ_APP_ID,
        sessionName: 'my-app-session',
        userId: currentUser.id
      }} />
    </div>
  )
}
```

### 3. Use Anywhere Without Context

```jsx
// This component can be anywhere in your app - no provider needed!
function FeatureTracker() {
  const { registerActivity, isReady } = useActivitySynqGlobal()
  
  const handleFeatureUse = (feature) => {
    registerActivity('feature_usage', { 
      feature, 
      timestamp: Date.now() 
    })
  }
  
  return (
    <button onClick={() => handleFeatureUse('search')}>
      Search {isReady ? '🟢' : '🟡'}
    </button>
  )
}
```

## API Reference

### `<ActivitySynqGlobal />` Component

The main component that enables global ActivitySynq functionality.

```jsx
<ActivitySynqGlobal 
  config={config}                    // Required: ActivitySynq configuration
  showNotifications={true}           // Optional: Enable toast notifications
  notificationComponent={CustomToast} // Optional: Custom notification component
  portalContainer="body"             // Optional: Where to render notifications
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `ActivitySynqConfig` | **Required** | Configuration object for ActivitySynq |
| `showNotifications` | `boolean` | `false` | Whether to show toast-like notifications for activities |
| `notificationComponent` | `React.ComponentType` | Built-in | Custom component for rendering notifications |
| `portalContainer` | `string` | `"body"` | CSS selector for notification portal container |

### `useActivitySynqGlobal()` Hook

Hook that works anywhere in your app without a context provider.

```jsx
const {
  registerActivity,     // Function to register new activities
  isReady,             // Boolean: whether connection is ready
  status,              // Connection status: 'initializing' | 'ready' | 'disconnected' | 'error'
  error,               // Error object if connection failed
  activities,          // Array of recent activities
  config,              // Current configuration
  bufferedEventCount   // Number of buffered activities when offline
} = useActivitySynqGlobal()
```

### Configuration Object

```jsx
const config = {
  apiKey: string,           // Required: Your Multisynq API key
  appId: string,            // Required: Your Multisynq app ID
  sessionName?: string,     // Optional: Session name (auto-generated if not provided)
  sessionPassword?: string, // Optional: Session password
  userId?: string,          // Optional: User identifier (auto-generated if not provided)
  onActivity?: (activity) => void  // Optional: Callback for all received activities
}
```

## Utility Functions

### `registerActivityGlobal()`

Register activities outside of React components:

```jsx
import { registerActivityGlobal } from 'react-together'

// Use in event handlers, utility functions, etc.
window.addEventListener('beforeunload', () => {
  registerActivityGlobal('page_exit', { 
    duration: Date.now() - startTime 
  })
})
```

### `getActivitySynqState()`

Get current state without subscribing to changes:

```jsx
import { getActivitySynqState } from 'react-together'

const { isReady, activities } = getActivitySynqState()
```

## Advanced Features

### Custom Notifications

Create your own notification component:

```jsx
function CustomActivityToast({ activity, onDismiss }) {
  return (
    <div className="custom-toast" onClick={onDismiss}>
      <h4>New Activity: {activity.type}</h4>
      <p>From: {activity.userId}</p>
      <small>{JSON.stringify(activity.data)}</small>
    </div>
  )
}

// Use it
<ActivitySynqGlobal 
  config={config}
  showNotifications={true}
  notificationComponent={CustomActivityToast}
/>
```

### Multiple Sessions

You can have different sessions in different parts of your app:

```jsx
// Main app session
<ActivitySynqGlobal config={{
  sessionName: 'main-app',
  userId: 'user-1'
}} />

// Admin dashboard session (separate component tree)
<ActivitySynqGlobal config={{
  sessionName: 'admin-dashboard', 
  userId: 'admin-1'
}} />
```

### SSR Compatibility

The global integration is SSR-safe:

```jsx
// Works with Next.js, Remix, etc.
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ActivitySynqGlobal config={config} />
    </>
  )
}
```

## Migration Guide

### From Context Provider Pattern

**Before (Context Pattern):**
```jsx
import { ActivitySynqProvider, useActivitySynq } from 'react-together'

function App() {
  return (
    <ActivitySynqProvider config={config}>
      <MyComponent />
    </ActivitySynqProvider>
  )
}

function MyComponent() {
  const { registerActivity } = useActivitySynq()
  // ...
}
```

**After (Global Pattern):**
```jsx
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

function App() {
  return (
    <div>
      <MyComponent />
      <ActivitySynqGlobal config={config} />
    </div>
  )
}

function MyComponent() {
  const { registerActivity } = useActivitySynqGlobal()
  // ...
}
```

### Gradual Migration

You can use both patterns simultaneously during migration:

```jsx
function App() {
  return (
    <div>
      {/* New components using global pattern */}
      <NewFeatures />
      
      {/* Legacy components still using context */}
      <ActivitySynqProvider config={legacyConfig}>
        <LegacyComponents />
      </ActivitySynqProvider>
      
      {/* Global integration for new features */}
      <ActivitySynqGlobal config={newConfig} />
    </div>
  )
}
```

## Best Practices

### 1. Place Component at App Root

```jsx
// ✅ Good - Place near app root
function App() {
  return (
    <div>
      <Router>
        <Routes>...</Routes>
      </Router>
      <ActivitySynqGlobal config={config} />
    </div>
  )
}

// ❌ Avoid - Placing inside routes
function SomePage() {
  return (
    <div>
      <PageContent />
      <ActivitySynqGlobal config={config} /> {/* Will remount on navigation */}
    </div>
  )
}
```

### 2. Stable Configuration

```jsx
// ✅ Good - Memoize configuration
const config = useMemo(() => ({
  apiKey: process.env.REACT_APP_API_KEY,
  appId: process.env.REACT_APP_APP_ID,
  userId: user.id
}), [user.id])

// ❌ Avoid - New object every render
<ActivitySynqGlobal config={{
  apiKey: process.env.REACT_APP_API_KEY,  // Creates new object every render
  appId: process.env.REACT_APP_APP_ID,
  userId: user.id
}} />
```

### 3. Error Handling

```jsx
function App() {
  const { error } = useActivitySynqGlobal()
  
  if (error) {
    console.error('ActivitySynq connection error:', error)
    // Handle error appropriately
  }
  
  return (
    <div>
      <AppContent />
      <ActivitySynqGlobal config={config} />
    </div>
  )
}
```

## Troubleshooting

### Hook Called Before Configuration

**Error:** "ActivitySynq: Hook called before configuration"

**Solution:** Ensure `<ActivitySynqGlobal />` is mounted before using the hook:

```jsx
// ✅ Correct order
function App() {
  return (
    <div>
      <ActivitySynqGlobal config={config} />  {/* Mount first */}
      <ComponentUsingHook />                   {/* Use hook after */}
    </div>
  )
}
```

### Multiple Instances Warning

**Warning:** "ActivitySynqGlobal has been mounted more than once"

**Solution:** Only mount the component once in your app:

```jsx
// ❌ Multiple instances
<ActivitySynqGlobal config={config1} />
<ActivitySynqGlobal config={config2} />

// ✅ Single instance
<ActivitySynqGlobal config={config} />
```

### Missing Environment Variables

**Error:** "ActivitySynq: appId and apiKey are required"

**Solution:** Set environment variables:

```bash
# .env
REACT_APP_MULTISYNQ_API_KEY=your_api_key
REACT_APP_MULTISYNQ_APP_ID=your_app_id
```

## Performance Considerations

### Memory Management

The global state automatically manages memory:

- Keeps only the latest 50 activities in memory
- Auto-cleanup on component unmount
- Singleton pattern prevents multiple sessions

### Bundle Size

- Zustand adds ~1KB to your bundle
- Core logic is framework-agnostic
- Tree-shakable exports

## Examples

See the complete working examples:

- [Basic Global Integration](../standalone-activitysynq-global-demo/)
- [Custom Notifications Example](../examples/ActivitySynqGlobalExample.tsx)
- [Migration Guide Examples](../examples/migration/)

## Comparison

| Feature | Context Pattern | Global Pattern |
|---------|----------------|----------------|
| Setup Complexity | Wrap entire app | Single component |
| Hook Usage | Inside provider only | Anywhere in app |
| Multiple Sessions | Multiple providers | Multiple components |
| Bundle Size | Smaller | +1KB (Zustand) |
| Performance | Good | Better (singleton) |
| Developer Experience | Good | Excellent |
| Toast Notifications | Manual | Built-in |

## Conclusion

ActivitySynq Global provides a modern, user-friendly integration pattern that:

- ✅ Reduces setup complexity
- ✅ Improves developer experience  
- ✅ Enables global hook usage
- ✅ Includes built-in notifications
- ✅ Maintains backward compatibility
- ✅ Follows industry best practices

Start using it today for a better ActivitySynq integration experience!