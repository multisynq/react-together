import { ActivityEvent, ActivitySynqProvider, useActivitySynq } from '../context/ActivitySynqContext'

interface ButtonClickData {
  buttonId: string
  timestamp: number
}

interface SignupData {
  source: string
}

interface FormSubmitData {
  formId: string
}

function ActivityDemo() {
  const { registerActivity, isReady, userId } = useActivitySynq()

  const handleSignUp = () => {
    registerActivity<SignupData>('user_signup', { source: 'landing_page' })
    console.log('User clicked sign up!')
  }

  const handleButtonClick = () => {
    registerActivity<ButtonClickData>('button_click', { 
      buttonId: 'example-button', 
      timestamp: Date.now() 
    })
  }

  const handleFormSubmit = () => {
    registerActivity<FormSubmitData>('form_submit', { formId: 'contact-form' })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>ActivitySynq Example - Multi-User Real-Time Sync!</h1>
      <p>Track user activities and see them synchronized instantly across ALL users in the same session.</p>
      <p><strong>✨ NEW:</strong> Activities from other users are automatically received via onActivity callback!</p>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        backgroundColor: isReady ? '#d4edda' : '#f8d7da', 
        border: '1px solid', 
        borderColor: isReady ? '#c3e6cb' : '#f5c6cb',
        borderRadius: '4px'
      }}>
        <strong>Status:</strong> {isReady ? 'Ready ✅' : 'Initializing...'}
        <br />
        <strong>User ID:</strong> {userId}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', maxWidth: '300px' }}>
        <button 
          onClick={handleSignUp} 
          disabled={!isReady}
          style={{ 
            padding: '10px', 
            fontSize: '16px',
            opacity: isReady ? 1 : 0.6,
            cursor: isReady ? 'pointer' : 'not-allowed'
          }}
        >
          Sign Up (Typed)
        </button>
        
        <button 
          onClick={handleButtonClick} 
          disabled={!isReady}
          style={{ 
            padding: '10px', 
            fontSize: '16px',
            opacity: isReady ? 1 : 0.6,
            cursor: isReady ? 'pointer' : 'not-allowed'
          }}
        >
          Click Me (Typed)
        </button>
        
        <button 
          onClick={handleFormSubmit} 
          disabled={!isReady}
          style={{ 
            padding: '10px', 
            fontSize: '16px',
            opacity: isReady ? 1 : 0.6,
            cursor: isReady ? 'pointer' : 'not-allowed'
          }}
        >
          Submit Form (Typed)
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Multi-User Sync Features:</h3>
        <ol>
          <li><strong>Real-time sync:</strong> Activities from ALL users appear instantly via onActivity callback</li>
          <li><strong>Type-safe events:</strong> <code>registerActivity&lt;MyData&gt;({`'event', data`})</code></li>
          <li><strong>Session-based:</strong> Only users in the same session see each other's activities</li>
          <li><strong>Offline buffering:</strong> Activities are queued when offline and sent when reconnected</li>
          <li><strong>No globals needed:</strong> Clean React Context pattern</li>
        </ol>
        
        <h4>Environment Variables:</h4>
        <ul>
          <li><code>VITE_API_KEY</code> - Your API key</li>
          <li><code>VITE_SESSION_NAME</code> - Session name (optional)</li>
          <li><code>VITE_SESSION_PASSWORD</code> - Session password (optional)</li>
          <li><code>VITE_APP_ID</code> - App ID (optional)</li>
        </ul>
      </div>
    </div>
  )
}

export default function ActivitySynqExample() {
  const config = {
    // Configuration can be passed here or via environment variables
    sessionName: 'activity-example-session', // Users with same sessionName see each other's activities
    sessionPassword: 'example-password', // Secure the session
    userId: 'example-user-' + Math.random().toString(36).substring(2, 8), // Unique user identifier
    onActivity: (activity: ActivityEvent) => {
      // ✨ This callback receives activities from ALL users in the session!
      // Perfect for updating UI, analytics, or triggering notifications
      const activityUserId = activity.data?.userId || 'unknown'
      console.log('Activity from user:', activityUserId, '→', activity.type, activity.data)
      
      // Example: Show a toast notification for activities from other users
      if (activityUserId !== config.userId) {
        console.log(`🔔 Another user (${activityUserId}) performed: ${activity.type}`)
      }
    }
  }

  return (
    <ActivitySynqProvider config={config}>
      <ActivityDemo />
    </ActivitySynqProvider>
  )
}