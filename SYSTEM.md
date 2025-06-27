# SYSTEM.md - React Together Framework Architecture

## Framework Overview

React Together is a real-time collaborative framework built on **Multisynq** - a client-side deterministic state synchronization system. Unlike traditional client-server architectures, Multisynq executes multiplayer logic on each client in a synchronized virtual machine, eliminating the need for server-side code.

### Core Architecture Principles

**Model-View Separation (Multisynq Foundation)**
- **Models**: Handle ALL computation and simulation, guaranteed identical across all users
- **Views**: Handle user input/output, display, and interaction (can differ between users)
- **THE FUNDAMENTAL RULE**: Models must be completely self-contained - no external state access, no view modifications of model state

**Deterministic Synchronization**
- All users execute the same model code in lockstep based on shared session time
- Views interact with models exclusively through events
- Published events are mirrored to all session participants
- Complete model state is automatically synchronized without explicit designation

**React Integration Pattern**
- React components assume the View role in the Model-View pattern
- A thin Multisynq View (`MultisynqReactView`) acts as bridge between React and Multisynq models
- View logic is implemented in React components, not traditional Multisynq Views

## Architecture Layers

### 1. Multisynq Core Layer (`@multisynq/client`)

**Session Management**
```javascript
// Basic Multisynq session setup
import * as Multisynq from "@multisynq/client"

class MyModel extends Multisynq.Model {
  init(options) {
    super.init(options)
    // Initialize model state - NEVER in constructor
    this.subscribe(this.sessionId, 'user-action', this.handleUserAction)
  }
  
  handleUserAction(data) {
    // Deterministic state changes only
    this.publish(this.sessionId, 'state-updated', newState)
  }
}
MyModel.register("MyModel")

// Join session
const session = await Multisynq.Session.join({
  apiKey: 'your-api-key',
  appId: 'your-app-id', 
  name: 'session-name',
  password: 'session-password',
  model: MyModel,
  view: MyView
})
```

**Critical Constraints**
- Models cannot store functions (breaks snapshotting)
- No async operations in models (breaks determinism)
- No external state access from models
- All model initialization in `init()`, never constructor

### 2. React Integration Layer (`@multisynq/react`)

**Core Components**
```typescript
// MultisynqRoot - Primary session manager
<MultisynqRoot
  sessionParams={{
    model: MyModel,
    apiKey: 'your-key',
    appId: 'your-app',
    name: 'session-name',
    password: 'session-password',
    viewData: { userId: 'user-123' }
  }}
  showChildrenWithoutSession={false}
  deferSession={false}
>
  <YourApp />
</MultisynqRoot>

// Alternative: InMultisynqSession (simpler)
<InMultisynqSession
  apiKey='your-key'
  appId='your-app'
  name='session-name'
  password='session-password'
  model={MyModel}
>
  <YourApp />
</InMultisynqSession>
```

**Essential Hooks**
```typescript
// Context access
const { session, view, model } = useMultisynqContext<MyModel>()

// Reactive model state
const value = useModelSelector((model: MyModel) => model.someProperty)

// Event publishing  
const publishEvent = usePublish<EventData>((eventData) => [
  model.id, 'event-name', eventData
])

// Event subscription
useSubscribe<EventData>(model.id, 'event-name', (data) => {
  console.log('Received:', data)
})

// Session utilities
const viewId = useViewId()
const isJoined = useIsJoined()
const { viewIds, viewCount } = useJoinedViews()
```

**Model Integration Pattern**
```typescript
export class ReactModel<T = unknown> extends Multisynq.Model {
  __reactEvents: { scope: string; event: string }[] = []
  __views: Map<string, ViewInfo<T>> | null = null

  init(options: any) {
    const { trackViews, ...opts } = options
    super.init(opts)
    
    // Track joined views if enabled
    if (trackViews === true) {
      this.__views = new Map()
    }
    
    // Automatic React re-render triggering
    this.subscribe(sessionId, 'view-join', this.__viewJoin)
    this.subscribe(sessionId, 'view-exit', this.__viewExit)
  }

  // Automatic re-render wrapper for subscriptions
  subscribe<T>(scope: string, event: string, handler: SubscriptionHandler<T>) {
    this.__reactEvents.push({ scope, event })
    
    const reactHandler = this.createQFunc({handler}, `(data) => {
      if (typeof handler === 'function') handler(data)
      else this[handler](data)
      this.publish(this.sessionId, 'react-updated') // Triggers React re-render
    }`)

    super.subscribe(scope, event, reactHandler)
  }
}
```

### 3. React Together Application Layer

**Dual Implementation Architecture**
React Together provides two distinct patterns for ActivitySynq integration:

**Context Pattern (Traditional)**
```typescript
import { ActivitySynqProvider, useActivitySynq } from 'react-together'

// Provider wrapper required
<ActivitySynqProvider config={{
  apiKey: 'your-key',
  appId: 'your-app',
  sessionName: 'activity-session',
  userId: 'user-123'
}}>
  <App />
</ActivitySynqProvider>

// Hook only works inside provider
function Component() {
  const { registerActivity, activities, isReady } = useActivitySynq()
  
  const handleAction = () => {
    registerActivity('user_click', { button: 'submit' })
  }
}
```

**Global Pattern (Singleton)**
```typescript
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

// Single component placement anywhere
<ActivitySynqGlobal config={{
  apiKey: 'your-key',
  appId: 'your-app', 
  sessionName: 'global-session',
  userId: 'user-123'
}} />

// Hook works globally without provider
function AnyComponent() {
  const { registerActivity, activities, isReady } = useActivitySynqGlobal()
  
  const handleAction = () => {
    registerActivity('user_click', { button: 'submit' })
  }
}
```

**ActivityModel Architecture**
```typescript
export default class ActivityModel extends ReactModel {
  activities: ActivityArgs[] = []
  maxActivities: number = 100
  connectedViews: Set<string> = new Set()

  init(options: ActivityModelOptions) {
    super.init({ ...options, trackViews: true })
    
    this.activities = []
    this.connectedViews = new Set()
    
    // Event handlers
    this.subscribe(this.id, 'add_activity', this.handleActivity)
    this.subscribe(this.id, 'clear_activities', this.clearActivities)
  }

  handleViewJoin(viewId: string, viewInfo: ViewInfo<{ userId?: string }>) {
    this.connectedViews.add(viewId)
    
    // Send historical activities to new view
    this.activities.forEach(activity => {
      this.publish(viewId, 'activity_received', activity)
    })
  }

  handleActivity(activityData: ActivityArgs) {
    const activity = {
      ...activityData,
      timestamp: this.now() // Use reflector time for consistency
    }
    
    this.activities.push(activity)
    
    // Maintain size limit
    if (this.activities.length > this.maxActivities) {
      this.activities.shift()
    }
    
    // Broadcast to all views
    this.publish(this.id, 'activity_received', activity)
  }
}
```

## Session Management Patterns

**Session Configuration**
```typescript
interface SessionParams {
  apiKey: string          // From https://multisynq.io/coder
  appId: string          // Unique app identifier  
  name?: string          // Session name (auto-generated if omitted)
  password?: string      // Session password (auto-generated if omitted)
  model?: typeof ReactModel // Custom model class
  viewData?: any         // Per-user data (e.g., userId)
  tps?: number          // Ticks per second (default varies)
  eventRateLimit?: number // Events per second limit
}
```

**Session Lifecycle**
```typescript
// Session creation with stable config to prevent reconnects
const stableConfig = useMemo(() => ({
  apiKey: process.env.VITE_API_KEY,
  appId: process.env.VITE_APP_ID,
  sessionName: 'my-session',
  sessionPassword: 'my-password',
  userId: userId
}), [userId]) // Only depend on userId, not onActivity callbacks

// Session transition
const setSession = useSetSession()
setSession({ name: 'new-session', password: 'new-password' })

// Leave session
const leaveSession = useLeaveSession()
leaveSession()
```

**URL-based Sessions**
```typescript
// URL parameters override config
// ?rtName=session-name&rtPwd=session-password
// Automatic when sessionIgnoresUrl={false} (default)
```

## State Management Patterns

**Synchronized State Hook**
```typescript
import { useStateTogether } from 'react-together'

function SharedCounter() {
  const [count, setCount] = useStateTogether('counter', 0)
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
```

**Per-User State Values**
```typescript
import { useStateTogetherWithPerUserValues } from 'react-together'

function UserPreferences() {
  const [theme, setTheme] = useStateTogetherWithPerUserValues('theme', 'light')
  // Each user maintains their own theme value
}
```

**Function Synchronization**
```typescript
import { useFunctionTogether } from 'react-together'

function SharedActions() {
  const triggerEffect = useFunctionTogether('shared-effect', (data) => {
    // This function runs on all connected clients
    console.log('Effect triggered by:', data.userId)
  })
  
  return <button onClick={() => triggerEffect({ message: 'Hello' })}>
    Trigger Shared Effect
  </button>
}
```

## Advanced Patterns

**Multi-Model Architecture**
```typescript
class GameModel extends ReactModel {
  players: PlayerModel[] = []
  
  init(options) {
    super.init(options)
    this.players = [
      PlayerModel.create({ id: 'player1' }),
      PlayerModel.create({ id: 'player2' })
    ]
  }
  
  getModel<T extends ReactModel>(id: string): T | null {
    // Access child models by ID
    return this.players.find(p => p.id === id) as T || null
  }
}

// Usage in React
const player1 = useModelById<PlayerModel>('player1')
const playerCount = useModelSelector((game: GameModel) => game.players.length)
```

**Real-time Features**
```typescript
// Chat system
import { useChat } from 'react-together'
const { messages, sendMessage } = useChat()

// Cursor tracking  
import { useCursors } from 'react-together'
const cursors = useCursors()

// Connected users
import { useConnectedUsers } from 'react-together'
const users = useConnectedUsers()

// Hover highlighting
import { HoverHighlighter } from 'react-together'
<HoverHighlighter>
  <div>This will show hover states from all users</div>
</HoverHighlighter>
```

**Custom Model Implementation**
```typescript
class CustomModel extends ReactTogetherModel {
  gameState: GameState = { phase: 'waiting', scores: {} }
  
  init(options) {
    super.init(options)
    this.subscribe(this.sessionId, 'game-action', this.handleGameAction)
  }
  
  handleGameAction(action: GameAction) {
    switch(action.type) {
      case 'start-game':
        this.gameState.phase = 'playing'
        this.publish(this.sessionId, 'game-started', this.gameState)
        break
      case 'update-score':
        this.gameState.scores[action.userId] = action.score
        this.publish(this.sessionId, 'scores-updated', this.gameState.scores)
        break
    }
  }
}

// Usage with custom model
<ReactTogether sessionParams={{ model: CustomModel, ...config }}>
  <GameInterface />
</ReactTogether>
```

## Integration Best Practices

**Environment Setup**
```typescript
// .env configuration
VITE_API_KEY=your_multisynq_api_key
VITE_APP_ID=com.yourcompany.yourapp

// Stable session configuration
const config = useMemo(() => ({
  apiKey: import.meta.env.VITE_API_KEY,
  appId: import.meta.env.VITE_APP_ID,
  sessionName: sessionName,
  sessionPassword: sessionPassword,
  userId: userId
}), [sessionName, sessionPassword, userId])
```

**Error Handling**
```typescript
// Session error recovery
const { session, view, model } = useMultisynqContext()

if (!session) {
  return <div>Connecting to session...</div>
}

if (!view || !model) {
  return <div>Synchronizing...</div>
}

// Connection status monitoring
const isJoined = useIsJoined()
if (!isJoined) {
  return <div>Reconnecting...</div>
}
```

**Performance Optimization**
```typescript
// Efficient model selectors
const specificValue = useModelSelector((model: MyModel) => model.specificProperty)
// Better than accessing entire model

// Debounced publishing
const debouncedPublish = useMemo(() => 
  debounce(publishEvent, 100), [publishEvent]
)

// Memoized components for expensive renders
const ExpensiveComponent = memo(({ data }) => {
  // Expensive rendering logic
})
```

This framework architecture enables building sophisticated real-time collaborative applications with automatic synchronization, deterministic behavior across all clients, and seamless React integration while maintaining the separation of concerns between synchronized logic (Models) and user interface (Views/React components).