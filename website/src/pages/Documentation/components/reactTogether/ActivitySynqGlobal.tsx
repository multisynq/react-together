import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import { useMemo } from 'react'
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import { PreviewSourceCodeTabs } from '../../PreviewSourceCodeTabs'
import HookParamsApi from '../../hooks/HookParamsApi'
import HookReturnApi from '../../hooks/HookReturnApi'

// Corrected code examples for the documentation view
const codes = {
  demo: {
    basic: `
import React from 'react'
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

function ActivityDemo() {
  // CORRECT: Get activities directly from the hook!
  const { registerActivity, isReady, status, activities } = useActivitySynqGlobal()

  const gameActivities = [
    { id: 'rolled_dice', icon: '🎲', label: 'Rolled Dice', action: 'rolled dice' },
    { id: 'cast_spell', icon: '🪄', label: 'Cast Spell', action: 'cast fireball' },
    { id: 'bet_money', icon: '💰', label: 'Bet $20', action: 'bet $20' },
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
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {gameActivities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => handleGameAction(activity)}
            className="p-3 border rounded hover:bg-blue-50"
            disabled={!isReady}
          >
            <span className="text-xl">{activity.icon}</span>
            <div>{activity.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-3 rounded">
        <h3>Live Activity Feed</h3>
        {/* CORRECT: Use the 'activities' array from the hook directly */}
        {activities.length === 0 ? (
          <p>No activities yet.</p>
        ) : (
          <div className="space-y-2">
            {activities.slice(-10).map((activity, index) => (
              <div key={activity.timestamp + index} className="p-2 bg-white rounded border">
                {activity.data?.icon} {activity.data?.action}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Single line enables everything above! */}
      {/* CORRECT: No 'onActivity' callback needed in config */}
      <ActivitySynqGlobal 
        config={{
          apiKey: 'your-api-key',
          appId: 'your-app-id',
          sessionName: 'game-session'
        }} 
      />
    </div>
  )
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
  const { registerActivity, isReady, activities } = useActivitySynqGlobal()

  const handleUserAction = () => {
    registerActivity('user_action', {
      action: 'button_click',
      timestamp: Date.now()
    })
  }

  return (
    <div>
      <button onClick={handleUserAction} disabled={!isReady}>
        Track This Action
      </button>
      <div>
        <h3>Recent Activities:</h3>
        <ul>
          {activities.slice(-5).map(act => <li key={act.timestamp}>{act.type}</li>)}
        </ul>
      </div>
    </div>
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
  // CORRECT: No local state for activities is needed here.
  // The hook will provide the synchronized state to each instance.

  const sharedConfig = useMemo(() => ({
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    sessionName: sessionParams.name,
    sessionPassword: sessionParams.password,
  }), [sessionParams.name, sessionParams.password])

  return (
    <div className='w-full flex items-start flex-wrap gap-3 justify-center bg-white-100'>
      <div className='flex-1 min-w-[400px] max-w-[500px]'>
        <div className='bg-blue-50 border border-blue-200 rounded-t-lg px-3 py-2'>
          <span className='text-sm font-medium text-blue-800'>User 1</span>
        </div>
        <div className='border-x border-b border-blue-200 rounded-b-lg overflow-hidden'>
          {/* CORRECT: No longer passing activityLog as a prop */}
          <ActivitySynqGlobalDemoInstance
            userId="global-user-1"
          />
        </div>
      </div>

      <div className='flex-1 min-w-[400px] max-w-[500px]'>
        <div className='bg-green-50 border border-green-200 rounded-t-lg px-3 py-2'>
          <span className='text-sm font-medium text-green-800'>User 2</span>
        </div>
        <div className='border-x border-b border-green-200 rounded-b-lg overflow-hidden'>
          {/* CORRECT: No longer passing activityLog as a prop */}
          <ActivitySynqGlobalDemoInstance
            userId="global-user-2"
          />
        </div>
      </div>

      {/* Single line enables global functionality for both instances above */}
      <ActivitySynqGlobal config={sharedConfig} />
    </div>
  )
}

// Demo instance that correctly uses the global hook
function ActivitySynqGlobalDemoInstance({ userId }: { userId: string }) {
  // CORRECT: Get the activities array directly from the hook.
  const { registerActivity, isReady, status, error, activities } = useActivitySynqGlobal()

  const gameActivities = [
    { id: 'rolled_dice', icon: '🎲', label: 'Roll Dice', action: 'rolled dice', color: '#3b82f6' },
    { id: 'cast_spell', icon: '🪄', label: 'Cast Spell', action: 'cast fireball', color: '#dc2626' },
    { id: 'bet_money', icon: '💰', label: 'Bet $20', action: 'bet $20', color: '#10b981' },
    { id: 'pet_cat', icon: '🐱', label: 'Pet Cat', action: 'pet cat', color: '#f59e0b' },
    { id: 'order_pizza', icon: '🍕', label: 'Order Pizza', action: 'ordered pizza', color: '#8b5cf6' }
  ]

  const handleGameAction = (activity: any) => {
    // The hook's function handles sending the activity to the global state
    registerActivity('user_action', {
      action: activity.action,
      icon: activity.icon,
      userId: userId, // Identify which user performed the action
      timestamp: Date.now()
    })
  }

  const getStatusColor = () => {
    switch (status) {
      case 'ready': return 'bg-green-100 border-green-300 text-green-800'
      case 'initializing': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'disconnected': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'error': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getUserDisplayName = (entryUserId: string) => {
    if (entryUserId === userId) return 'You'
    if (entryUserId?.includes('user-1')) return 'User 1'
    if (entryUserId?.includes('user-2')) return 'User 2'
    return 'Other'
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold mb-2">🌍 ActivitySynq Global Demo</h1>
      </div>

      <div className={`rounded-lg border-2 p-3 mb-4 text-sm ${getStatusColor()}`}>
        <div className="flex justify-between items-center">
          <strong>Status:</strong> {status}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">🎮 Your Actions</h3>
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
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-2">🔔 Live Activity Feed (Last 6)</h3>
        <div className="bg-gray-50 rounded-lg p-2 h-32 overflow-y-auto border text-xs">
          {activities.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p>Click buttons to see activities!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {activities.slice(-6).map((entry) => {
                const entryUserId = entry.data?.userId || 'unknown'
                const isLocal = entryUserId === userId
                return (
                  <div key={`${entry.timestamp}-${entryUserId}`} className={`rounded p-2 border ${isLocal
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-green-50 border-green-200'
                    }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium ${isLocal ? 'text-blue-800' : 'text-green-800'
                          }`}>
                          {getUserDisplayName(entryUserId)}
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
    </div>
  )
}

// --- The rest of the documentation page component ---
const api = (
  <>
    <HookParamsApi
      items={[
        {
          name: 'config',
          type: 'ActivitySynqConfig',
          description: 'Configuration object for ActivitySynq Global setup.',
        },
      ]}
    />
    <HookReturnApi
      items={[
        {
          name: 'registerActivity',
          type: '<T = any>(type: string, data?: T) => void',
          description: 'Function to register activities globally.',
        },
        {
          name: 'activities',
          type: 'ActivityEvent[]',
          description: 'Array of recent activities from all users in the session.',
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
      ]}
    />
  </>
)

export default function ActivitySynqGlobalDocumentationPage() {
  const [sessionName] = useLocalStorage('activity-synq-global-session-name-2', Math.random().toString(36).substring(2, 15))
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
              activity tracking without context wrappers.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <ActivitySynqGlobalPreview sessionParams={sessionParams} />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'ActivitySynqGlobal' }).github_demo,
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: (
          <>
            <p>Setup ActivitySynq Global in 2 simple steps:</p>
            <h4>1. Add the Global Component</h4>
            <CodeBlock {...{ code: codes.setup }} />
            <h4>2. Use the Hook Anywhere</h4>
            <CodeBlock {...{ code: codes.usage }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('ActivitySynqGlobal', { exclude: ['source'] }) }} />
}
