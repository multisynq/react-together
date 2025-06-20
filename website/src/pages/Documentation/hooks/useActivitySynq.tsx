import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

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
    bufferedEventCount 
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
        <p><strong>Buffered Events:</strong> {bufferedEventCount}</p>
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
          description: 'Function to register a new activity. Activities are sent immediately when connected, or buffered when offline.',
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
          name: 'bufferedEventCount',
          type: 'number',
          description: 'Number of activities currently buffered (waiting to be sent when connection is restored).',
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
          description: 'Optional callback for all activity events.',
        },
      ]}
    />
  </>
)

export default function UseActivitySynqDocumentationPage() {
  const [sessionName] = useLocalStorage('use-activity-synq-session-name', Math.random().toString(36).substring(2, 15))
  const sessionParams = {
    name: sessionName,
    password: 'use-activity-synq-demo-password',
  }

  const content = (
    <GenericDocPage
      {...{
        title: 'useActivitySynq',
        description: (
          <>
            <p>
              The <CodeSpan text='useActivitySynq' /> hook provides access to real-time activity tracking functionality.
              It allows you to register user activities that are automatically synchronized across all users in the same session.
            </p>
            <p>
              Activities are sent immediately when connected, or automatically buffered when offline and sent when the connection is restored.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useActivitySynq' session1={sessionParams} session2={sessionParams} />,
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