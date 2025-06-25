// ActivitySynq Global Example
import { ActivitySynqGlobal, useActivitySynqGlobal } from '../index'

/**
 * Example demonstrating the single-line ActivitySynq integration.
 * This pattern removes the need for context providers.
 */

// A component that uses ActivitySynq anywhere in the app
function FeatureUsageTracker() {
  const { registerActivity, isReady, status } = useActivitySynqGlobal()

  const trackFeatureUsage = (feature: string) => {
    registerActivity('feature_usage', {
      feature,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    })
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Feature Usage Tracker</h3>
      <p>Status: <strong>{status}</strong> | Ready: <strong>{isReady ? 'Yes' : 'No'}</strong></p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => trackFeatureUsage('search')}>
          Use Search
        </button>
        <button onClick={() => trackFeatureUsage('filter')}>
          Use Filter
        </button>
        <button onClick={() => trackFeatureUsage('export')}>
          Use Export
        </button>
        <button onClick={() => trackFeatureUsage('settings')}>
          Use Settings
        </button>
      </div>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        This component works without any context wrapper! 🎉
      </p>
    </div>
  )
}

// Another component in a different part of the app
function UserActionLogger() {
  const { registerActivity, activities } = useActivitySynqGlobal()

  const logAction = (action: string) => {
    registerActivity('user_action', {
      action,
      page: window.location.pathname,
      timestamp: Date.now()
    })
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', margin: '10px' }}>
      <h3>User Action Logger</h3>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => logAction('page_view')}>
          Log Page View
        </button>
        <button onClick={() => logAction('click')}>
          Log Click
        </button>
        <button onClick={() => logAction('scroll')}>
          Log Scroll
        </button>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h4>Recent Activities ({activities.length})</h4>
        <div style={{ maxHeight: '150px', overflow: 'auto', fontSize: '12px' }}>
          {activities.slice(0, 10).map((activity, index) => (
            <div key={index} style={{ 
              padding: '5px', 
              borderBottom: '1px solid #f0f0f0',
              backgroundColor: activity.userId?.includes('demo') ? '#f9f9f9' : '#fff'
            }}>
              <strong>{activity.type}</strong> by {activity.userId?.slice(-8) || 'Unknown'}
              <br />
              <small>{JSON.stringify(activity.data)}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main app with single-line integration
export default function ActivitySynqGlobalExample() {
  const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    appId: import.meta.env.VITE_APP_ID,
    sessionName: 'global-example-session',
    sessionPassword: 'global-demo-password',
    userId: `demo-user-${Math.random().toString(36).substring(2, 8)}`,
    onActivity: (activity: any) => {
      console.log('Global ActivitySynq received:', activity)
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>🚀 Single-Line ActivitySynq Integration Demo</h1>
      <p>
        This example shows how to use ActivitySynq with a single component instead of a context provider.
        The <code>&lt;ActivitySynqGlobal /&gt;</code> component can be placed anywhere in your app,
        and <code>useActivitySynqGlobal()</code> works in any component without a provider.
      </p>

      {/* Components that use ActivitySynq without any wrapper */}
      <FeatureUsageTracker />
      <UserActionLogger />

      {/* Single line to enable ActivitySynq globally - can be placed anywhere! */}
      <ActivitySynqGlobal 
        config={config}
        showNotifications={true}  // Optional: show toast-like notifications
      />

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3>🎯 Integration Pattern</h3>
        <pre style={{ 
          backgroundColor: '#fff', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`// Old way: Context wrapper required
<ActivitySynqProvider config={config}>
  <YourApp />
</ActivitySynqProvider>

// New way: Single line anywhere!
function YourApp() {
  return (
    <div>
      <Header />
      <MainContent />
      <ActivitySynqGlobal config={config} />
    </div>
  )
}

// Hook works globally without wrapper
function AnyComponent() {
  const { registerActivity } = useActivitySynqGlobal()
  // Works anywhere! 🎉
}`}
        </pre>
      </div>
    </div>
  )
}