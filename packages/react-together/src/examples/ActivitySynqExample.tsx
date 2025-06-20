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
      <h1>ActivitySynq Example - Context Pattern!</h1>
      <p>Track user activities across multiple users in real-time using React Context (no globals!).</p>
      
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
        <h3>New Usage Pattern:</h3>
        <ol>
          <li>Wrap your app: <code>&lt;ActivitySynqProvider config={`{{...}}`}&gt;</code></li>
          <li>Use the hook: <code>const {`{registerActivity}`} = useActivitySynq()</code></li>
          <li>Type-safe events: <code>registerActivity&lt;MyData&gt;({`'event', data`})</code></li>
          <li>No globals needed!</li>
        </ol>
        
        <h4>Environment Variables:</h4>
        <ul>
          <li><code>VITE_API_KEY</code> - Your API key</li>
          <li><code>VITE_SESSION_NAME</code> - Session name (optional)</li>
          <li><code>VITE_SESSION_PASSWORD</code> - Session password (optional)</li>
          <li><code>VITE_APP_URL</code> - App URL (optional)</li>
        </ul>
      </div>
    </div>
  )
}

export default function ActivitySynqExample() {
  const config = {
    // Configuration can be passed here or via environment variables
    onActivity: (activity: ActivityEvent) => {
      console.log('Activity tracked:', activity)
    }
  }

  return (
    <ActivitySynqProvider config={config}>
      <ActivityDemo />
    </ActivitySynqProvider>
  )
}