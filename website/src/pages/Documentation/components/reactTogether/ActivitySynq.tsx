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
    basic: `import { ActivitySynqProvider, useActivitySynq } from 'react-together'
import { useState, useEffect } from 'react'

// Activity data interface for emoji voting
interface EmojiVoteData {
  emoji: string
  timestamp: number
}

function EmojiVotingDemo() {
  const { registerActivity, isReady, status, bufferedEventCount } = useActivitySynq()
  const [voteCount, setVoteCount] = useState<Record<string, number>>({})
  
  // Available emojis for voting
  const emojis = ['😍', '🚀', '💡', '🎉', '❤️', '👍']

  const handleEmojiVote = (emoji: string) => {
    const voteData: EmojiVoteData = {
      emoji,
      timestamp: Date.now()
    }
    
    registerActivity('emoji_vote', voteData)
    
    // Update local vote count immediately
    setVoteCount(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }))
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1>🗳️ Emoji Voting Demo</h1>
      
      {/* Connection Status */}
      <div>Status: {status} | Ready: {isReady ? 'Yes' : 'No'}</div>
      {bufferedEventCount > 0 && (
        <div>Buffered events: {bufferedEventCount}</div>
      )}
      
      {/* Emoji Voting Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiVote(emoji)}
            disabled={!isReady}
            className="p-3 border rounded-lg text-center hover:bg-blue-50"
          >
            <div className="text-2xl">{emoji}</div>
            <div className="text-xs">{voteCount[emoji] || 0} votes</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ActivitySynqProvider 
      config={{
        sessionName: 'emoji-voting-demo',
        sessionPassword: 'vote-together'
      }}
    >
      <EmojiVotingDemo />
    </ActivitySynqProvider>
  )
}`,
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
          description: (
            <div>
              <p><strong>Required.</strong> Your Multisynq API key for authentication.</p>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Get your API key from <a href="https://multisynq.io" className="text-blue-600">multisynq.io</a></li>
                <li>Can be set via environment variable <CodeSpan text="VITE_API_KEY" /></li>
                <li>Without this, ActivitySynq will show an error state</li>
              </ul>
            </div>
          ),
        },
        {
          name: 'appId',
          type: 'string',
          description: (
            <div>
              <p><strong>Application identifier</strong> - Groups all sessions for your app.</p>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Think of it as your app's namespace in Multisynq</li>
                <li>All sessions with the same appId can potentially communicate</li>
                <li>Can be set via environment variable <CodeSpan text="VITE_APP_ID" /></li>
                <li>Defaults to 'default-app' if not provided</li>
              </ul>
            </div>
          ),
        },
        {
          name: 'sessionName',
          type: 'string',
          description: (
            <div>
              <p><strong>Session name</strong> - Groups users together in the same activity session.</p>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Users with the same sessionName see each other's activities</li>
                <li>Use unique names for different rooms/groups (e.g., 'game-room-1', 'meeting-abc')</li>
                <li>Can be set via environment variable <CodeSpan text="VITE_SESSION_NAME" /></li>
                <li>If not provided, generates a unique session automatically</li>
              </ul>
            </div>
          ),
        },
        {
          name: 'sessionPassword',
          type: 'string',
          description: (
            <div>
              <p><strong>Session password</strong> - Secures access to the activity session.</p>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Only users with the same password can join the session</li>
                <li>Prevents unauthorized access to your activity data</li>
                <li>Can be set via environment variable <CodeSpan text="VITE_SESSION_PASSWORD" /></li>
                <li>Defaults to 'activity-session-password' if not provided</li>
              </ul>
            </div>
          ),
        },
        {
          name: 'userId',
          type: 'string',
          description: (
            <div>
              <p><strong>User identifier</strong> - Identifies the current user in activity events.</p>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li>Used to distinguish activities from different users</li>
                <li>If not provided, generates a random ID and stores it in localStorage</li>
                <li>Use consistent userIds to track the same user across sessions</li>
                <li>Consider using your app's user authentication ID</li>
              </ul>
            </div>
          ),
        },
        {
          name: 'onActivity',
          type: '(activity: ActivityEvent) => void',
          description: (
            <div>
              <p><strong>🔥 Multi-User Activity Callback</strong> - Called whenever ANY activity is registered by ANY user in the session.</p>
              <ul className="text-xs mt-1 ml-4 list-disc">
                <li><strong>Cross-user sync:</strong> Receives activities from ALL users in the same session (not just this user)</li>
                <li><strong>Real-time updates:</strong> Perfect for live activity feeds, notifications, and collaborative features</li>
                <li><strong>User identification:</strong> Use <code>activity.userId</code> to distinguish between users</li>
                <li><strong>Use cases:</strong> Live dashboards, user activity logs, real-time analytics, collaboration notifications</li>
                <li>The activity object includes type, data, userId, and timestamp</li>
              </ul>
            </div>
          ),
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
              ActivitySynq provides <strong>real-time activity tracking and synchronization across all users</strong> in the same session, 
              with automatic offline buffering capabilities. Track any user actions (clicks, form submissions, feature usage, etc.) 
              and see them appear instantly across all connected users.
            </p>
            <p>
              <strong>🚀 Multi-User Sync:</strong> Activities from ALL users in the session are automatically received via your 
              <code>onActivity</code> callback, enabling real-time collaboration, live activity feeds, and cross-user notifications.
            </p>
            <p>
              Key features include <strong>cross-user real-time synchronization</strong>, automatic offline buffering, 
              connection status tracking, TypeScript support with generic event types, and environment variable configuration.
            </p>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">📋 Complete Setup Guide</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <p><strong>1. Get API Key:</strong> Sign up at <a href="https://multisynq.io" className="text-blue-600 underline">multisynq.io</a> to get your API key.</p>
                <p><strong>2. Environment Variables:</strong> Set <CodeSpan text="VITE_API_KEY" /> and optionally <CodeSpan text="VITE_APP_ID" /> in your <CodeSpan text=".env" /> file.</p>
                <p><strong>3. Configure Sessions:</strong> Use <CodeSpan text="sessionName" /> to group users and <CodeSpan text="sessionPassword" /> to secure access.</p>
                <p><strong>4. Add onActivity Callback:</strong> Receive activities from ALL users in the session via <CodeSpan text="onActivity(activity)" />.</p>
                <p><strong>5. Track Activities:</strong> Call <CodeSpan text="registerActivity(type, data)" /> to track any user action in real-time.</p>
                <p><strong>6. Handle Offline:</strong> Activities are automatically buffered when offline and synced when reconnected.</p>
              </div>
            </div>
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