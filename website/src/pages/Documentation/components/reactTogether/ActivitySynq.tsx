import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { PreviewSourceCodeTabs } from '@pages/Documentation/PreviewSourceCodeTabs'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import InterfaceApi from '../../InterfaceApi'
import ComponentPropsTable from '../ComponentPropsTable'

const codes = {
  usage_1: {
    basic: `import { ActivitySynqProvider, useActivitySynq } from 'react-together'`,
  },

  usage_2: {
    basic: `function App() {
  return (
    <ActivitySynqProvider>
      <MyComponent />
    </ActivitySynqProvider>
  )
}

function MyComponent() {
  const { registerActivity } = useActivitySynq()
  
  return (
    <button onClick={() => registerActivity('button_click', { buttonId: 'signup' })}>
      Sign Up
    </button>
  )
}`,
  },

  demo: {
    basic: `
import { ActivitySynqProvider, useActivitySynq } from 'react-together'

function ActivitySynqDemo() {
  const { registerActivity, isReady, status, bufferedEventCount } = useActivitySynq()
  
  const handleSignup = () => {
    registerActivity('signup_attempt', { 
      source: 'demo',
      timestamp: Date.now() 
    })
  }

  const handleFeatureClick = (feature: string) => {
    registerActivity('feature_click', { 
      feature,
      userAgent: navigator.userAgent 
    })
  }

  return (
    <div>
      <div>Status: {status} | Ready: {isReady ? 'Yes' : 'No'}</div>
      {bufferedEventCount > 0 && (
        <div>Buffered events: {bufferedEventCount}</div>
      )}
      
      <button onClick={handleSignup}>
        Sign Up
      </button>
      
      <button onClick={() => handleFeatureClick('dark-mode')}>
        Toggle Dark Mode
      </button>
    </div>
  )
}

export default function App() {
  return (
    <ActivitySynqProvider>
      <ActivitySynqDemo />
    </ActivitySynqProvider>
  )
}
`,
  },
}

const api = (
  <>
    <h5>ActivitySynqProvider Props</h5>
    <ComponentPropsTable
      items={[
        {
          name: 'config',
          type: 'ActivitySynqConfig',
          description: <p>Configuration object for ActivitySynq. See <CodeSpan text="ActivitySynqConfig" /> interface below.</p>,
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: <p>The components that will have access to ActivitySynq context.</p>,
        },
      ]}
    />

    <InterfaceApi
      title='ActivitySynqConfig'
      items={[
        {
          name: 'apiKey',
          type: 'string',
          description: <p>The Multisynq API key. Can also be set via environment variable VITE_API_KEY.</p>,
        },
        {
          name: 'appUrl',
          type: 'string',
          description: <p>The application URL identifier. Defaults to environment variables or 'default-app'.</p>,
        },
        {
          name: 'sessionName',
          type: 'string',
          description: <p>The session name for grouping users. Defaults to environment variables or 'default'.</p>,
        },
        {
          name: 'sessionPassword',
          type: 'string',
          description: <p>The session password for security. Defaults to environment variables or 'default-session'.</p>,
        },
        {
          name: 'userId',
          type: 'string',
          description: <p>The user identifier. If not provided, a random ID will be generated and stored in localStorage.</p>,
        },
        {
          name: 'onActivity',
          type: '(activity: ActivityEvent) => void',
          description: <p>Optional callback function that gets called whenever an activity is registered (both locally and from other users).</p>,
        },
      ]}
    />

    <InterfaceApi
      title='ActivityEvent'
      items={[
        {
          name: 'type',
          type: 'string',
          description: <p>The type/name of the activity (e.g., 'button_click', 'signup_attempt').</p>,
        },
        {
          name: 'data',
          type: 'T (generic)',
          description: <p>Optional data payload associated with the activity. Can be any JSON-serializable object.</p>,
        },
        {
          name: 'userId',
          type: 'string',
          description: <p>The ID of the user who triggered this activity.</p>,
        },
        {
          name: 'timestamp',
          type: 'number',
          description: <p>The timestamp when the activity was registered (milliseconds since epoch).</p>,
        },
      ]}
    />

    <InterfaceApi
      title='ConnectionStatus'
      items={[
        {
          name: "'initializing'",
          type: 'string',
          description: <p>ActivitySynq is starting up and connecting to the session.</p>,
        },
        {
          name: "'ready'",
          type: 'string',
          description: <p>Connected and ready to send/receive activities in real-time.</p>,
        },
        {
          name: "'disconnected'",
          type: 'string',
          description: <p>Temporarily disconnected from the session. Activities will be buffered.</p>,
        },
        {
          name: "'error'",
          type: 'string',
          description: <p>An error occurred with the connection. Check the error object for details.</p>,
        },
      ]}
    />
  </>
)

export default function ActivitySynqDocumentationPage() {
  const [sessionName] = useLocalStorage('activity-synq-session-name', Math.random().toString(36).substring(2, 15))
  const sessionParams = {
    name: sessionName,
    password: 'activity-demo-password',
  }

  const content = (
    <GenericDocPage
      {...{
        title: 'ActivitySynq',
        description: (
          <>
            <p>
              ActivitySynq provides real-time activity tracking across users with offline buffering capabilities. 
              It allows you to track any user actions (clicks, form submissions, feature usage, etc.) and 
              synchronize them with other users in the same session.
            </p>
            <p>
              Key features include automatic offline buffering, connection status tracking, TypeScript support 
              with generic event types, and environment variable configuration.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='ActivitySynq' session1={sessionParams} session2={sessionParams} aspectRatio='3 / 2' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'ActivitySynq' }).github_demo,
                      stackBlitz: 'https://stackblitz.com/edit/react-together-activity-synq?file=src%2FApp.tsx',
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: (
          <>
            <p>Import the ActivitySynq provider and hook:</p>
            <CodeBlock {...{ code: codes.usage_1 }} />
            <p>Wrap your app with the provider and use the hook to register activities:</p>
            <CodeBlock {...{ code: codes.usage_2 }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('ActivitySynq', { exclude: ['source'] }) }} />
}