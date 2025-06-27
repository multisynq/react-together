# ActivitySynq Architecture - Two Implementation Patterns

Based on the @multisynq/react codebase analysis, here's the full architecture for implementing ActivitySynq with two distinct patterns:

## 1. Global/Singleton Pattern (like react-toastify)

### **Architecture Overview**
- **Single `<ActivitySynqGlobal />` component** placed anywhere in the app
- **Global hook `useActivitySynqGlobal()`** works from any component
- **Singleton session manager** handles Multisynq connections
- **Event emitter pattern** for pub/sub communication
- **Portal-based rendering** for UI components

### **Key Components**

#### **ActivitySynqGlobalManager (Singleton)**
```typescript
class ActivitySynqGlobalManager {
  private static instance: ActivitySynqGlobalManager | null = null
  private session: MultisynqSession<MultisynqReactView<ActivityModel>> | null = null
  private eventEmitter: EventEmitter = new EventEmitter()
  private config: ActivitySynqConfig | null = null

  static getInstance(): ActivitySynqGlobalManager {
    if (!this.instance) {
      this.instance = new ActivitySynqGlobalManager()
    }
    return this.instance
  }

  async initialize(config: ActivitySynqConfig) {
    // Create session using createMultisynqSession from @multisynq/react
    this.session = await createMultisynqSession({
      model: ActivityModel,
      name: config.sessionName,
      password: config.sessionPassword,
      apiKey: config.apiKey,
      appId: config.appId,
      viewData: { userId: config.userId },
      tps: 10
    })
    
    // Subscribe to model events and emit to global event bus
    this.session.view.subscribe(this.session.view.model.id, 'activity_received', (activity) => {
      this.eventEmitter.emit('activity_received', activity)
    })
  }

  registerActivity(type: string, data?: any) {
    if (!this.session) return
    this.session.view.publish(this.session.view.model.id, 'add_activity', { type, data })
  }

  subscribe(event: string, callback: Function) {
    this.eventEmitter.on(event, callback)
  }

  unsubscribe(event: string, callback: Function) {
    this.eventEmitter.off(event, callback)
  }
}
```

#### **ActivitySynqGlobal Component**
```typescript
export function ActivitySynqGlobal({ config }: { config: ActivitySynqConfig }) {
  const manager = ActivitySynqGlobalManager.getInstance()
  
  useEffect(() => {
    manager.initialize(config)
  }, [config, manager])

  // Portal-based rendering for notifications/UI if needed
  return createPortal(
    <div id="activity-synq-global-container" />,
    document.body
  )
}
```

#### **useActivitySynqGlobal Hook**
```typescript
export function useActivitySynqGlobal() {
  const manager = ActivitySynqGlobalManager.getInstance()
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const handleActivity = (activity: ActivityEvent) => {
      setActivities(prev => [activity, ...prev])
    }
    
    manager.subscribe('activity_received', handleActivity)
    return () => manager.unsubscribe('activity_received', handleActivity)
  }, [manager])

  const registerActivity = useCallback((type: string, data?: any) => {
    manager.registerActivity(type, data)
  }, [manager])

  return { registerActivity, activities, isReady, status: 'ready' }
}
```

### **Usage Pattern**
```typescript
// App.tsx - Single component anywhere
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <ActivitySynqGlobal config={{
        apiKey: 'xxx',
        appId: 'yyy',
        sessionName: 'global-session'
      }} />
    </div>
  )
}

// AnyComponent.tsx - Hook works anywhere
function AnyComponent() {
  const { registerActivity } = useActivitySynqGlobal()
  
  return (
    <button onClick={() => registerActivity('click', { button: 'header' })}>
      Track Click
    </button>
  )
}
```

## 2. Context Wrapper Pattern (traditional)

### **Architecture Overview**
- **Provider wrapper `<ActivitySynqProvider />`** around app section
- **Context hook `useActivitySynq()`** only works inside provider
- **Direct @multisynq/react integration** using `MultisynqRoot`
- **Standard React Context** for state management

### **Key Components**

#### **ActivitySynqProvider Component**
```typescript
export function ActivitySynqProvider({ 
  children, 
  config 
}: { 
  children: ReactNode
  config: ActivitySynqConfig 
}) {
  // Use MultisynqRoot directly following @multisynq/react patterns
  return (
    <MultisynqRoot
      sessionParams={{
        model: ActivityModel,
        name: config.sessionName,
        password: config.sessionPassword,
        apiKey: config.apiKey,
        appId: config.appId,
        viewData: { userId: config.userId },
        tps: 10,
        options: { trackViews: true }
      }}
      showChildrenWithoutSession
    >
      <ActivitySynqInternalProvider config={config}>
        {children}
      </ActivitySynqInternalProvider>
    </MultisynqRoot>
  )
}
```

#### **ActivitySynqInternalProvider (Context)**
```typescript
const ActivitySynqContext = createContext<IActivitySynqContext | undefined>(undefined)

function ActivitySynqInternalProvider({ children, config }) {
  // Use @multisynq/react hooks directly
  const activities = useModelSelector((model: ActivityModel) => model.activities) ?? []
  const isReady = useView() !== null
  
  const publishAddActivity = usePublish<{ type: string; data?: any }>((type, data) => [
    model?.id || '',
    'add_activity',
    { type, data }
  ])

  const registerActivity = useCallback((type: string, data?: any) => {
    if (!isReady) return
    publishAddActivity(type, data)
  }, [publishAddActivity, isReady])

  return (
    <ActivitySynqContext.Provider value={{
      registerActivity,
      activities,
      isReady,
      status: isReady ? 'ready' : 'initializing'
    }}>
      {children}
    </ActivitySynqContext.Provider>
  )
}
```

#### **useActivitySynq Hook**
```typescript
export function useActivitySynq(): IActivitySynqContext {
  const context = useContext(ActivitySynqContext)
  if (!context) {
    throw new Error('useActivitySynq must be used within ActivitySynqProvider')
  }
  return context
}
```

### **Usage Pattern**
```typescript
// App.tsx - Provider wrapper required
function App() {
  return (
    <ActivitySynqProvider config={{
      apiKey: 'xxx',
      appId: 'yyy', 
      sessionName: 'context-session'
    }}>
      <Header />
      <MainContent />
    </ActivitySynqProvider>
  )
}

// Component.tsx - Must be inside provider
function Component() {
  const { registerActivity } = useActivitySynq()
  
  return (
    <button onClick={() => registerActivity('click', { button: 'main' })}>
      Track Click
    </button>
  )
}
```

## 3. ActivityModel Implementation

### **Shared Model for Both Patterns**
```typescript
export default class ActivityModel extends ReactModel {
  activities: ActivityEvent[] = []
  maxActivities = 1000

  init(options: any) {
    super.init({ ...options, trackViews: true })
    
    // Event handlers following @multisynq/react patterns
    this.subscribe(this.id, 'add_activity', this.addActivity)
    this.subscribe(this.id, 'clear_activities', this.clearActivities)
  }

  addActivity(event: { type: string; data?: any }) {
    const activity: ActivityEvent = {
      type: event.type,
      data: event.data,
      timestamp: this.now() // Use Multisynq reflector time
    }

    this.activities = [activity, ...this.activities].slice(0, this.maxActivities)
    
    // Publish to views using proper @multisynq/react pattern
    this.publish(this.id, 'activity_received', activity)
  }

  clearActivities() {
    this.activities = []
    this.publish(this.id, 'activities_cleared', {})
  }

  getHistoricalActivities(): ActivityEvent[] {
    return [...this.activities]
  }
}

ActivityModel.register('ActivityModel')
```

## 4. Key Implementation Differences

### **Global Pattern Benefits:**
- **No provider wrapper needed** - works anywhere
- **Single-line integration** - just drop in component  
- **Better for micro-frontends** - self-contained
- **Similar to react-toastify** - familiar pattern

### **Context Pattern Benefits:**
- **Traditional React patterns** - familiar to React developers
- **Better TypeScript integration** - proper context typing
- **Clearer component boundaries** - explicit provider scope
- **Direct @multisynq/react usage** - no abstraction layer

### **Shared Technical Foundation:**
- **Same ActivityModel** - identical Multisynq model implementation
- **Same @multisynq/react hooks** - `useModelSelector`, `usePublish`, etc.
- **Same session management** - `MultisynqRoot` and `createMultisynqSession`
- **Same event patterns** - proper Model/View event flow

Both implementations follow @multisynq/react best practices but offer different developer experiences - global for convenience, context for explicit architecture.

---

## File Path References

### **Current Implementation Files:**
- **Context Implementation**: `packages/react-together/src/context/ActivitySynqContext.tsx`
- **ActivityModel**: `packages/react-together/src/models/ActivityModel.ts`
- **Global Component**: `packages/react-together/src/components/ActivitySynqGlobal.tsx`
- **Global Hook**: `packages/react-together/src/hooks/useActivitySynqGlobal.tsx`
- **Utils**: `packages/react-together/src/utils/activityUtils.ts`

### **Demo Applications:**
- **Standalone Global Demo**: `standalone-activitysynq-global-demo/`
- **Standalone Test Demo**: `standalone-activitysynq-test/`
- **Website Demos**: `website/src/components/demo/reactTogether/ActivitySynqDemo.tsx`
- **Documentation**: `website/src/pages/Documentation/components/reactTogether/ActivitySynq.tsx`

### **Test Files:**
- **Playwright Tests**: `playwright-tests/activitysynq-global.spec.ts`
- **E2E Tests**: `e2e/activity-synq-emoji-voting.spec.ts`
- **Test Utils**: `packages/react-together/src/testing/test-utils.tsx`

### **Export Files:**
- **Main Package Index**: `packages/react-together/src/index.ts`
- **Context Index**: `packages/react-together/src/context/index.ts`
- **Components Index**: `packages/react-together/src/components/index.ts`
- **Hooks Index**: `packages/react-together/src/hooks/index.ts`

### **Configuration Files:**
- **Package Config**: `packages/react-together/package.json`
- **Build Config**: `packages/react-together/vite.config.ts`
- **TypeScript Config**: `packages/react-together/tsconfig.json`

### **Documentation Files:**
- **Architecture Notes**: `docs/ActivitySynq-Architecture.md`
- **Global Pattern**: `docs/ACTIVITYSYNQ_GLOBAL.md`
- **Multi-User Guide**: `ACTIVITYSYNQ_MULTI_USER.md`

### **Key Features Status:**
- ✅ **Context Pattern**: Fully implemented with @multisynq/react integration
- ✅ **Global Pattern**: Implemented with react-toastify-style API
- ✅ **ActivityModel**: Shared model following ReactModel patterns
- ✅ **Session Stability**: Fixed reconnection issues with stable configs
- ✅ **TypeScript Support**: Full type safety for both patterns
- ✅ **Standalone Demos**: Working demos for both implementations
- ✅ **Test Coverage**: Playwright tests for multi-user scenarios

### **Implementation Status:**
✅ **Remove backwards compatibility code** from ActivitySynqContext.tsx
✅ **Implement clean separation** between Global and Context patterns  
✅ **Create separate exports** for each pattern to avoid confusion
✅ **Add EventEmitter implementation** for Global pattern pub/sub (BrowserEventEmitter)
✅ **Test both patterns** in isolation - both standalone demos build successfully

### **What Was Implemented:**

#### **Clean Context Pattern (ActivitySynqContext.tsx):**
- ✅ Removed stable/volatile context split - now single clean context
- ✅ Direct @multisynq/react integration with useModelSelector, usePublish, useView
- ✅ Simplified hook: `useActivitySynq()` returns single interface
- ✅ Traditional React Context pattern requiring Provider wrapper

#### **Global Singleton Pattern (New Implementation):**
- ✅ `ActivitySynqGlobalManager` - Singleton session manager
- ✅ `BrowserEventEmitter` - Custom EventEmitter for browser compatibility  
- ✅ `ActivitySynqGlobal` - Component with portal-based rendering
- ✅ `useActivitySynqGlobal()` - Hook that works anywhere without Provider
- ✅ React-toastify style integration pattern

#### **Clean Export Separation (index.ts):**
```typescript
// Context Pattern (Traditional React Context)
export {
  ActivitySynqProvider,
  useActivitySynq,
  type IActivitySynqContext
} from './context/ActivitySynqContext'

// Global Pattern (Singleton/Portal Pattern like react-toastify)  
export {
  ActivitySynqGlobal
} from './global/ActivitySynqGlobal'
export {
  useActivitySynqGlobal,
  type IActivitySynqGlobalContext
} from './global/useActivitySynqGlobal'
```

### **Testing Results:**
- ✅ TypeScript compilation: All errors resolved
- ✅ Vite build: Successful for main package
- ✅ Context pattern demo: `standalone-activitysynq-test` builds successfully  
- ✅ Global pattern demo: `standalone-activitysynq-global-demo` builds successfully
- ✅ Both patterns use identical ActivityModel and @multisynq/react foundation

### **Architecture Achieved:**
Both implementations now follow the documented architecture with clean separation, no backwards compatibility overhead, and distinct usage patterns suitable for different application architectures.