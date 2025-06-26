import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'
import { UseActivitySynqDemo } from '@components/demo/reactTogether/UseActivitySynqDemo'
import { useState, useCallback, useRef, useMemo } from 'react'
import { ActivitySynqProvider, useActivitySynq, ActivityEvent } from 'react-together'

const codes = {
  demo: {
    basic: `
import { useState } from 'react'
import { ActivitySynqProvider, useActivitySynq } from 'react-together'

function UseActivitySynqDemo() {
  const { 
    registerActivity, 
    isReady, 
    status, 
    error, 
    userId, 
    activities 
  } = useActivitySynq()
  
  const [activityLog, setActivityLog] = useState([])

  const handleButtonClick = (buttonId: string) => {
    const activity = {
      type: 'button_click',
      data: { buttonId, timestamp: Date.now() }
    }
    
    registerActivity(activity.type, activity.data)
    
    // Add to local log for display
    setActivityLog(prev => [activity, ...prev].slice(0, 5))
  }

  const getStatusColor = () => {
    switch (status) {
      case 'ready': return 'green'
      case 'initializing': return 'yellow'
      case 'disconnected': return 'orange'
      case 'error': return 'red'
      default: return 'gray'
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="mb-4 p-3 rounded" style={{ backgroundColor: getStatusColor() + '20' }}>
        <h3>Connection Status</h3>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Ready:</strong> {isReady ? 'Yes' : 'No'}</p>
        <p><strong>User ID:</strong> {userId?.slice(0, 8)}...</p>
        <p><strong>Activities:</strong> {activities.length}</p>
        {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error.message}</p>}
      </div>

      <div className="mb-4">
        <h3>Test Activities</h3>
        <div className="flex gap-2 flex-wrap">
          <button 
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleButtonClick('primary-cta')}
          >
            Primary Action
          </button>
          <button 
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => handleButtonClick('secondary-action')}
          >
            Secondary Action
          </button>
          <button 
            className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={() => registerActivity('feature_usage', { feature: 'demo-feature' })}
          >
            Feature Usage
          </button>
        </div>
      </div>

      <div>
        <h3>Recent Activities (Local)</h3>
        <div className="bg-gray-100 p-3 rounded max-h-40 overflow-y-auto">
          {activityLog.length === 0 ? (
            <p className="text-gray-500">No activities yet. Try clicking the buttons above!</p>
          ) : (
            <ul className="space-y-1">
              {activityLog.map((activity, index) => (
                <li key={index} className="text-sm">
                  <strong>{activity.type}</strong>: {JSON.stringify(activity.data)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ActivitySynqProvider>
      <UseActivitySynqDemo />
    </ActivitySynqProvider>
  )
}
`,
  },

  usage: {
    basic: `
import { useActivitySynq } from 'react-together'

function YourComponent() {
  const { registerActivity, isReady, status } = useActivitySynq()

  const handleUserAction = () => {
    if (isReady) {
      // Register activity with type-safe data
      registerActivity('user_action', { 
        action: 'button_click',
        timestamp: Date.now(),
        metadata: { page: 'home' }
      })
    }
  }

  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={handleUserAction}>
        Track This Action
      </button>
    </div>
  )
}
`,
  },

  usage_typescript: {
    basic: `
import { useActivitySynq } from 'react-together'

interface ButtonClickData {
  buttonId: string
  location: string
  timestamp: number
}

function TypedComponent() {
  const { registerActivity } = useActivitySynq()

  const handleClick = (buttonId: string) => {
    // TypeScript will ensure data matches ButtonClickData interface
    registerActivity<ButtonClickData>('button_click', {
      buttonId,
      location: 'header',
      timestamp: Date.now()
    })
  }

  return <button onClick={() => handleClick('signup')}>Sign Up</button>
}
`,
  },
}

const api = (
  <>
    <HookParamsApi
      items={[
        {
          name: 'This hook takes no parameters',
          type: 'void',
          description: 'useActivitySynq must be used within an ActivitySynqProvider and requires no arguments.',
        },
      ]}
    />
    <HookReturnApi
      items={[
        {
          name: 'registerActivity',
          type: '<T = any>(type: string, data?: T) => void',
          description: 'Function to register a new activity. Activities are broadcast to ALL users in the session via their onActivity callbacks. Sent immediately when connected, or buffered when offline.',
        },
        {
          name: 'isReady',
          type: 'boolean',
          description: 'Whether ActivitySynq is connected and ready to send activities in real-time.',
        },
        {
          name: 'status',
          type: <LinkSpan text='ConnectionStatus' to='#connection-status' />,
          description: 'Current connection status: "initializing", "ready", "disconnected", or "error".',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Any connection error that occurred, or null if no error.',
        },
        {
          name: 'userId',
          type: 'string | undefined',
          description: 'The current user ID from the ActivitySynq configuration.',
        },
        {
          name: 'config',
          type: <LinkSpan text='ActivitySynqConfig' to='#activity-synq-config' />,
          description: 'The current ActivitySynq configuration object.',
        },
        {
          name: 'activities',
          type: 'ActivityEvent[]',
          description: 'All synchronized activities from the session.',
        },
      ]}
    />
    <InterfaceApi
      title='ConnectionStatus'
      id='connection-status'
      items={[
        {
          name: "'initializing'",
          type: 'string',
          description: 'ActivitySynq is starting up and connecting to the session.',
        },
        {
          name: "'ready'",
          type: 'string',
          description: 'Connected and ready to send/receive activities in real-time.',
        },
        {
          name: "'disconnected'",
          type: 'string',
          description: 'Temporarily disconnected. Activities will be buffered and sent when reconnected.',
        },
        {
          name: "'error'",
          type: 'string',
          description: 'Connection error occurred. Check the error object for details.',
        },
      ]}
    />
    <InterfaceApi
      title='ActivitySynqConfig'
      id='activity-synq-config'
      items={[
        {
          name: 'apiKey',
          type: 'string',
          description: 'The Multisynq API key.',
        },
        {
          name: 'appUrl',
          type: 'string',
          description: 'The application URL identifier.',
        },
        {
          name: 'sessionName',
          type: 'string',
          description: 'The session name for grouping users.',
        },
        {
          name: 'sessionPassword',
          type: 'string',
          description: 'The session password for security.',
        },
        {
          name: 'userId',
          type: 'string',
          description: 'The user identifier.',
        },
        {
          name: 'onActivity',
          type: '(activity: ActivityEvent) => void',
          description: '🔥 Multi-user callback that receives activities from ALL users in the session (not just this user). Essential for cross-user synchronization.',
        },
      ]}
    />
  </>
)

// Shared session wrapper for better performance
function UseActivitySynqPreview({ sessionParams }: { sessionParams: { name: string, password: string } }) {
  const [activityLog, setActivityLog] = useState<ActivityEvent[]>([])
  const processedActivitiesRef = useRef<Set<string>>(new Set())

  // Single activity handler for both demo instances
  const handleSharedActivity = useCallback((activity: ActivityEvent) => {
    const activityId = `${activity.userId}-${activity.type}-${activity.timestamp}-${JSON.stringify(activity.data)}`
    
    if (processedActivitiesRef.current.has(activityId)) return
    processedActivitiesRef.current.add(activityId)
    
    setActivityLog(prev => [activity, ...prev].slice(0, 20))
  }, [])

  // Shared configuration
  const sharedConfig = useMemo(() => ({
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    sessionName: sessionParams.name,
    sessionPassword: sessionParams.password,
    userId: 'preview-shared',
    onActivity: handleSharedActivity
  }), [sessionParams.name, sessionParams.password, handleSharedActivity])

  return (
    <ActivitySynqProvider config={sharedConfig}>
      <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
        <div className='flex-1 min-w-[400px] max-w-[500px]'>
          <div className='bg-blue-50 border border-blue-200 rounded-t-lg px-3 py-2'>
            <span className='text-sm font-medium text-blue-800'>User 1</span>
          </div>
          <div className='border-x border-b border-blue-200 rounded-b-lg overflow-hidden'>
            <UseActivitySynqDemoInstance 
              userId="demo-user-1"
              activityLog={activityLog}
              sessionName={sessionParams.name}
            />
          </div>
        </div>
        
        <div className='flex-1 min-w-[400px] max-w-[500px]'>
          <div className='bg-green-50 border border-green-200 rounded-t-lg px-3 py-2'>
            <span className='text-sm font-medium text-green-800'>User 2</span>
          </div>
          <div className='border-x border-b border-green-200 rounded-b-lg overflow-hidden'>
            <UseActivitySynqDemoInstance 
              userId="demo-user-2"
              activityLog={activityLog}
              sessionName={sessionParams.name}
            />
          </div>
        </div>
      </div>
    </ActivitySynqProvider>
  )
}

// Demo instance that shares a session
function UseActivitySynqDemoInstance({ 
  userId, 
  activityLog, 
  sessionName 
}: { 
  userId: string
  activityLog: ActivityEvent[]
  sessionName: string
}) {
  const { registerActivity, isReady, status, error, activities } = useActivitySynq()
  
  const handleButtonClick = useCallback((buttonId: string) => {
    registerActivity('button_click', {
      buttonId,
      timestamp: Date.now(),
      userId
    })
  }, [registerActivity, userId])

  const handleFeatureUsage = useCallback((feature: string) => {
    registerActivity('feature_usage', {
      feature,
      timestamp: Date.now(),
      userId
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

  // Filter activities for this specific user's UI perspective
  const filteredActivityLog = useMemo(() => 
    activityLog.slice(0, 8).map(activity => ({
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
        <h1 className="text-2xl font-bold mb-2">🪝 useActivitySynq Hook Demo</h1>
        <p className="text-gray-600 text-sm">Shared session demonstration</p>
      </div>

      {/* Connection Status Section */}
      <div className={`rounded-lg border-2 p-4 mb-4 ${getStatusColor()}`}>
        <h3 className="font-semibold mb-2">Hook State</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Ready:</strong> {isReady ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p><strong>User ID:</strong> <span className="font-mono text-xs">{userId?.slice(-8) || 'N/A'}</span></p>
            <p><strong>Activities:</strong> {activities.length}</p>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <p><strong>Session:</strong> <span className="font-mono">{sessionName || 'N/A'}</span></p>
        </div>
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            <strong>Error:</strong> {error.message}
          </div>
        )}
      </div>

      {/* Test Activities Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Test Activities</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 text-blue-800 font-medium"
            onClick={() => handleButtonClick('primary-cta')}
          >
            Primary Action
          </button>
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400 text-green-800 font-medium"
            onClick={() => handleButtonClick('secondary-action')}
          >
            Secondary Action
          </button>
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 text-purple-800 font-medium"
            onClick={() => handleFeatureUsage('demo-feature')}
          >
            Feature Usage
          </button>
          <button 
            className="px-4 py-2 rounded-lg border-2 transition-all duration-200 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-400 text-indigo-800 font-medium"
            onClick={() => handleFeatureUsage('advanced-tool')}
          >
            Advanced Tool
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          ✅ Activities tracked in shared session
        </p>
      </div>

      {/* Activity Log */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-3">🔔 Activity Log</h3>
        <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto border">
          {filteredActivityLog.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm">Click buttons above to see activities!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredActivityLog.map((entry) => {
                const isLocal = entry.userId === userId
                return (
                  <div key={entry.id} className={`rounded-lg p-2 border ${
                    isLocal
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${
                          isLocal ? 'text-blue-800' : 'text-green-800'
                        }`}>
                          {getUserDisplayName(entry)}
                        </span>
                        <span className="text-gray-600">
                          {entry.type === 'button_click' && `clicked "${entry.data?.buttonId}"`}
                          {entry.type === 'feature_usage' && `used "${entry.data?.feature}"`}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
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

      {/* Usage Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-1 text-sm">useActivitySynq Hook:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <code>registerActivity(type, data)</code> - Register new activities</li>
          <li>• <code>isReady</code> - Connection status for immediate feedback</li>
          <li>• <code>status</code> - Detailed connection state</li>
          <li>• <code>activities</code> - All synchronized activities</li>
        </ul>
      </div>
    </div>
  )
}

export default function UseActivitySynqDocumentationPage() {
  const [sessionName] = useLocalStorage('use-activity-synq-session-name', Math.random().toString(36).substring(2, 15))
  const sessionParams = {
    name: sessionName,
    password: 'use-activity-synq-demo-password',
  }

  // Debug logging to see what session parameters we're creating
  console.log('UseActivitySynqDocumentationPage - Session Params:', sessionParams)

  const content = (
    <GenericDocPage
      {...{
        title: 'useActivitySynq',
        description: (
          <>
            <p>
              The <CodeSpan text='useActivitySynq' /> hook provides access to <strong>real-time cross-user activity tracking</strong>.
              Register activities that are instantly synchronized across ALL users in the same session, enabling collaborative 
              features, live feeds, and real-time analytics.
            </p>
            <p>
              <strong>🚀 Multi-User Sync:</strong> All users in the session automatically receive each other's activities via 
              the <code>onActivity</code> callback. Activities are sent immediately when connected, or automatically buffered 
              when offline and sent when the connection is restored.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <UseActivitySynqPreview sessionParams={sessionParams} />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'UseActivitySynq' }).github_demo,
                      stackBlitz: 'https://stackblitz.com/edit/react-together-use-activity-synq?file=src%2FApp.tsx',
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: (
          <>
            <p>Basic usage:</p>
            <CodeBlock {...{ code: codes.usage }} />
            <p>TypeScript usage with typed activity data:</p>
            <CodeBlock {...{ code: codes.usage_typescript }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useActivitySynq', { exclude: ['source'] }) }} />
}