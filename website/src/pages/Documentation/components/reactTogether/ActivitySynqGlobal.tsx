import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import InterfaceApi from '../../InterfaceApi'
import { PreviewSourceCodeTabs } from '../../PreviewSourceCodeTabs'
import HookParamsApi from '../../hooks/HookParamsApi'
import HookReturnApi from '../../hooks/HookReturnApi'
import { useState, useCallback, useRef, useMemo } from 'react'
import { ActivitySynqGlobal, useActivitySynqGlobal, ActivityEvent } from 'react-together'

const codes = {
  demo: {
    basic: `
import React, { useState, useCallback } from 'react'
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

function ActivityDemo() {
  const { registerActivity, isReady, status } = useActivitySynqGlobal()
  const [activities, setActivities] = useState([])

  const handleActivity = useCallback((activity) => {
    setActivities(prev => [activity, ...prev].slice(0, 10))
  }, [])

  const gameActivities = [
    { id: 'rolled_dice', icon: '🎲', label: 'Rolled Dice', action: 'rolled dice' },
    { id: 'cast_spell', icon: '🪄', label: 'Cast Spell', action: 'cast fireball' },
    { id: 'bet_money', icon: '💰', label: 'Bet $20', action: 'bet $20' },
    { id: 'pet_cat', icon: '🐱', label: 'Pet Cat', action: 'pet cat' },
    { id: 'order_pizza', icon: '🍕', label: 'Order Pizza', action: 'ordered pizza' }
  ]

  const handleGameAction = (activity) => {
    registerActivity('user_action', {
      action: activity.action,
      icon: activity.icon,
      timestamp: Date.now()
    })
  }

  return (
    <div className="p-4">
      <h2>🎮 Game Activities Demo</h2>
      
      <div className="mb-4 p-3 rounded bg-gray-100">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Ready:</strong> {isReady ? 'Yes' : 'No'}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {gameActivities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => handleGameAction(activity)}
            className="p-3 border rounded hover:bg-blue-50"
          >
            <span className="text-xl">{activity.icon}</span>
            <div>{activity.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-3 rounded">
        <h3>Activity Feed</h3>
        {activities.length === 0 ? (
          <p>No activities yet. Try the buttons above!</p>
        ) : (
          <div className="space-y-2">
            {activities.map((activity, index) => (
              <div key={index} className="p-2 bg-white rounded border">
                {activity.data?.icon} {activity.data?.action}
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Single line enables everything above! */}
      <ActivitySynqGlobal 
        config={{
          apiKey: 'your-api-key',
          appId: 'your-app-id',
          sessionName: 'game-session',
          onActivity: handleActivity
        }} 
      />
    </div>
  )
}

export default function App() {
  return <ActivityDemo />
}
`,
  },

  setup: {
    basic: `
// 1. Add ActivitySynqGlobal component anywhere in your app
import { ActivitySynqGlobal } from 'react-together'

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      
      {/* Single line enables global ActivitySynq */}
      <ActivitySynqGlobal config={{
        apiKey: process.env.REACT_APP_MULTISYNQ_API_KEY,
        appId: process.env.REACT_APP_MULTISYNQ_APP_ID,
        sessionName: 'my-app-session'
      }} />
    </div>
  )
}
`,
  },

  usage: {
    basic: `
// 2. Use the hook anywhere in your app (no provider needed!)
import { useActivitySynqGlobal } from 'react-together'

function AnyComponent() {
  const { registerActivity, isReady } = useActivitySynqGlobal()

  const handleUserAction = () => {
    registerActivity('user_action', {
      action: 'button_click',
      timestamp: Date.now()
    })
  }

  return (
    <button onClick={handleUserAction}>
      Track This Action
    </button>
  )
}
`,
  },

  notifications: {
    basic: `
// 3. Optional: Enable toast-style notifications
import { ActivitySynqGlobal } from 'react-together'

function App() {
  return (
    <div>
      <YourApp />
      
      <ActivitySynqGlobal 
        config={config}
        showNotifications={true}
        notificationComponent={CustomNotification}
        portalContainer="body"
      />
    </div>
  )
}
`,
  },
}

// Shared session wrapper for better performance
function ActivitySynqGlobalPreview({ sessionParams }: { sessionParams: { name: string, password: string } }) {
  const [activityLog, setActivityLog] = useState<ActivityEvent[]>([])
  const processedActivitiesRef = useRef<Set<string>>(new Set())

  // Single activity handler for both demo instances
  const handleSharedActivity = useCallback((activity: ActivityEvent) => {
    const activityId = `${activity.userId}-${activity.type}-${activity.timestamp}-${JSON.stringify(activity.data)}`
    
    if (processedActivitiesRef.current.has(activityId)) return
    processedActivitiesRef.current.add(activityId)
    
    setActivityLog(prev => [activity, ...prev].slice(0, 20))
  }, [])

  // Shared configuration with stable onActivity reference
  const onActivityRef = useRef(handleSharedActivity)
  onActivityRef.current = handleSharedActivity

  const sharedConfig = useMemo(() => ({
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    sessionName: sessionParams.name,
    sessionPassword: sessionParams.password,
    userId: 'global-preview-shared',
    onActivity: (activity: ActivityEvent) => onActivityRef.current(activity)
  }), [sessionParams.name, sessionParams.password])

  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
      <div className='flex-1 min-w-[400px] max-w-[500px]'>
        <div className='bg-blue-50 border border-blue-200 rounded-t-lg px-3 py-2'>
          <span className='text-sm font-medium text-blue-800'>User 1</span>
        </div>
        <div className='border-x border-b border-blue-200 rounded-b-lg overflow-hidden'>
          <ActivitySynqGlobalDemoInstance 
            userId="global-user-1"
            activityLog={activityLog}
            sessionName={sessionParams.name}
            config={sharedConfig}
          />
        </div>
      </div>
      
      <div className='flex-1 min-w-[400px] max-w-[500px]'>
        <div className='bg-green-50 border border-green-200 rounded-t-lg px-3 py-2'>
          <span className='text-sm font-medium text-green-800'>User 2</span>
        </div>
        <div className='border-x border-b border-green-200 rounded-b-lg overflow-hidden'>
          <ActivitySynqGlobalDemoInstance 
            userId="global-user-2"
            activityLog={activityLog}
            sessionName={sessionParams.name}
            config={sharedConfig}
          />
        </div>
      </div>

      {/* Single line enables global functionality */}
      <ActivitySynqGlobal config={sharedConfig} />
    </div>
  )
}

// Demo instance that uses global hook
function ActivitySynqGlobalDemoInstance({ 
  userId, 
  activityLog, 
  sessionName,
  config
}: { 
  userId: string
  activityLog: ActivityEvent[]
  sessionName: string
  config: any
}) {
  const { registerActivity, isReady, status, error } = useActivitySynqGlobal()
  
  const gameActivities = [
    { id: 'rolled_dice', icon: '🎲', label: 'Roll Dice', action: 'rolled dice', color: '#3b82f6' },
    { id: 'cast_spell', icon: '🪄', label: 'Cast Spell', action: 'cast fireball', color: '#dc2626' },
    { id: 'bet_money', icon: '💰', label: 'Bet $20', action: 'bet $20', color: '#10b981' },
    { id: 'pet_cat', icon: '🐱', label: 'Pet Cat', action: 'pet cat', color: '#f59e0b' },
    { id: 'order_pizza', icon: '🍕', label: 'Order Pizza', action: 'ordered pizza', color: '#8b5cf6' }
  ]

  const handleGameAction = useCallback((activity: any) => {
    registerActivity('user_action', {
      action: activity.action,
      icon: activity.icon,
      userId: userId,
      timestamp: Date.now()
    })
  }, [registerActivity, userId])

  const getStatusColor = () => {
    switch (status) {
      case 'ready': return 'bg-green-100 border-green-300 text-green-800'
      case 'initializing': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'disconnected': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'error': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  // Filter activities for this user's perspective
  const filteredActivityLog = useMemo(() => 
    activityLog.slice(0, 6).map(activity => ({
      id: crypto.randomUUID(),
      type: activity.type,
      userId: activity.userId || 'unknown',
      data: activity.data,
      timestamp: activity.timestamp,
      isLocal: activity.userId === userId
    })), [activityLog, userId]
  )

  const getUserDisplayName = useCallback((entry: any) => {
    const isLocal = entry.userId === userId
    
    if (isLocal) {
      if (userId.includes('user-1')) return 'User1 (You)'
      if (userId.includes('user-2')) return 'User2 (You)'
      return 'You'
    }
    if (entry.userId?.includes('user-1')) return 'User1'
    if (entry.userId?.includes('user-2')) return 'User2'
    return entry.userId?.slice(-8) || 'Other User'
  }, [userId])

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold mb-2">🌍 ActivitySynq Global Demo</h1>
        <p className="text-gray-600 text-xs">Single-line integration • No context wrapper needed</p>
      </div>

      {/* Connection Status */}
      <div className={`rounded-lg border-2 p-3 mb-4 text-sm ${getStatusColor()}`}>
        <div className="flex justify-between items-center">
          <div>
            <strong>Status:</strong> {status} • <strong>Ready:</strong> {isReady ? 'Yes' : 'No'}
          </div>
          <div className="text-xs">
            {userId?.slice(-8) || 'N/A'}
          </div>
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-600">
            <strong>Error:</strong> {error.message}
          </div>
        )}
      </div>

      {/* Game Activities */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">🎮 Game Activities</h3>
        <div className="grid grid-cols-2 gap-2">
          {gameActivities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => handleGameAction(activity)}
              disabled={!isReady}
              className="p-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isReady ? activity.color + '20' : '#f3f4f6',
                borderColor: isReady ? activity.color + '60' : '#d1d5db',
                color: isReady ? activity.color : '#6b7280'
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{activity.icon}</span>
                <span>{activity.label}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          ✨ Activities sync globally across all users
        </p>
      </div>

      {/* Activity Feed */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-2">🔔 Live Activity Feed</h3>
        <div className="bg-gray-50 rounded-lg p-2 h-32 overflow-y-auto border text-xs">
          {filteredActivityLog.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <div className="text-lg mb-1">🎮</div>
              <p>Click game buttons to see activities!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredActivityLog.map((entry) => {
                const isLocal = entry.userId === userId
                return (
                  <div key={entry.id} className={`rounded p-2 border ${
                    isLocal
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium ${
                          isLocal ? 'text-blue-800' : 'text-green-800'
                        }`}>
                          {getUserDisplayName(entry)}
                        </span>
                        <span className="text-gray-600">
                          {entry.data?.icon} {entry.data?.action}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200 text-xs">
        <h4 className="font-semibold text-blue-900 mb-1">✨ Global Benefits:</h4>
        <ul className="text-blue-800 space-y-0.5">
          <li>• <code>useActivitySynqGlobal()</code> works anywhere</li>
          <li>• No provider wrapper needed</li>
          <li>• Single-line setup</li>
          <li>• Real-time cross-user sync</li>
        </ul>
      </div>
    </div>
  )
}

const api = (
  <>
    <HookParamsApi
      items={[
        {
          name: 'config',
          type: 'ActivitySynqConfig',
          description: 'Configuration object for ActivitySynq Global setup.',
        },
        {
          name: 'showNotifications',
          type: 'boolean',
          description: 'Optional. Enable toast-style notifications for activities. Default: false.',
        },
        {
          name: 'notificationComponent',
          type: 'React.ComponentType',
          description: 'Optional. Custom notification component to use instead of the default.',
        },
        {
          name: 'portalContainer',
          type: 'string | HTMLElement',
          description: 'Optional. Container for notification portal. Default: "body".',
        },
      ]}
    />
    <HookReturnApi
      items={[
        {
          name: 'registerActivity',
          type: '<T = any>(type: string, data?: T) => void',
          description: 'Function to register activities globally. Works from any component without provider.',
        },
        {
          name: 'isReady',
          type: 'boolean',
          description: 'Whether the global ActivitySynq is connected and ready.',
        },
        {
          name: 'status',
          type: 'ConnectionStatus',
          description: 'Current connection status of the global session.',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Any connection error that occurred.',
        },
        {
          name: 'activities',
          type: 'ActivityEvent[]',
          description: 'Array of recent activities from all users in the session.',
        },
      ]}
    />
  </>
)

export default function ActivitySynqGlobalDocumentationPage() {
  const [sessionName] = useLocalStorage('activity-synq-global-session-name', Math.random().toString(36).substring(2, 15))
  const sessionParams = {
    name: sessionName,
    password: 'activity-synq-global-demo-password',
  }

  const content = (
    <GenericDocPage
      {...{
        title: 'ActivitySynq Global',
        description: (
          <>
            <p>
              <CodeSpan text='ActivitySynqGlobal' /> provides a <strong>single-line integration</strong> for real-time 
              activity tracking without context wrappers. Simply drop in the component anywhere and use{' '}
              <code>useActivitySynqGlobal()</code> in any component to register and track activities across all users.
            </p>
            <p>
              <strong>🌍 Global Access:</strong> Unlike the traditional context pattern, this approach allows you to 
              access ActivitySynq functionality from anywhere in your app without provider setup, making it perfect 
              for modern component architectures and micro-frontends.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <ActivitySynqGlobalPreview sessionParams={sessionParams} />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'ActivitySynqGlobal' }).github_demo,
                      stackBlitz: 'https://stackblitz.com/edit/react-together-activity-synq-global?file=src%2FApp.tsx',
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: (
          <>
            <p>Setup ActivitySynq Global in 3 simple steps:</p>
            
            <h4>1. Add the Global Component</h4>
            <CodeBlock {...{ code: codes.setup }} />
            
            <h4>2. Use the Hook Anywhere</h4>
            <CodeBlock {...{ code: codes.usage }} />
            
            <h4>3. Optional: Enable Notifications</h4>
            <CodeBlock {...{ code: codes.notifications }} />
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 Key Benefits vs Context Pattern</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-800 mb-1">❌ Old Way (Context)</h5>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Wrap entire app in provider</li>
                    <li>• Complex provider setup</li>
                    <li>• Hook only works inside provider</li>
                    <li>• Performance overhead</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-1">✅ New Way (Global)</h5>
                  <ul className="text-green-700 space-y-1">
                    <li>• Single component anywhere</li>
                    <li>• Zero provider setup</li>
                    <li>• Hook works everywhere</li>
                    <li>• Better performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('ActivitySynqGlobal', { exclude: ['source'] }) }} />
}