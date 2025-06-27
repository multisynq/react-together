import { useState } from 'react'
import { activitySynq, ActivitySynqContainer, useActivitySynqGlobal } from 'react-together'

// Demo component that shows how to use the new global pattern
function FeatureTracker({ sectionName }: { sectionName: string }) {
  const { registerActivity, activities, isReady, status } = useActivitySynqGlobal()
  const [localCounter, setLocalCounter] = useState(0)

  const features = [
    { name: '🔍 Search', type: 'feature_usage', data: { feature: 'search', section: sectionName } },
    { name: '🔽 Filter', type: 'feature_usage', data: { feature: 'filter', section: sectionName } },
    { name: '📁 Export', type: 'feature_usage', data: { feature: 'export', section: sectionName } }
  ]

  const handleFeatureClick = (feature: typeof features[0]) => {
    registerActivity(feature.type, feature.data)
    setLocalCounter(prev => prev + 1)
  }

  const handleDirectApiCall = () => {
    // Demonstrate direct API usage (like toast.success())
    activitySynq.registerActivity('user_action', {
      action: 'direct_api_call',
      section: sectionName,
      timestamp: Date.now()
    })
    setLocalCounter(prev => prev + 1)
  }

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: '#f8fafc'
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#2d3748' }}>{sectionName}</h3>

      <div style={{ marginBottom: '12px', fontSize: '14px', color: '#4a5568' }}>
        <div>Status: <code style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '3px' }}>{status}</code></div>
        <div>Ready: <code style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '3px' }}>{isReady ? 'Yes' : 'No'}</code></div>
        <div>Local clicks: <code style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '3px' }}>{localCounter}</code></div>
        <div>Global activities: <code style={{ background: '#e2e8f0', padding: '2px 4px', borderRadius: '3px' }}>{activities.length}</code></div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => handleFeatureClick(feature)}
            style={{
              padding: '8px 12px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px',
              backgroundColor: '#white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {feature.name}
          </button>
        ))}

        <button
          onClick={handleDirectApiCall}
          style={{
            padding: '8px 12px',
            border: '1px solid #38a169',
            borderRadius: '4px',
            backgroundColor: '#f0fff4',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#38a169'
          }}
        >
          + Add Activity
        </button>
      </div>
    </div>
  )
}

function ActivityFeed() {
  const { activities, clearActivities } = useActivitySynqGlobal()

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: '#2d3748' }}>Live Activity Feed</h3>
        <button
          onClick={clearActivities}
          style={{
            padding: '4px 8px',
            border: '1px solid #e53e3e',
            borderRadius: '4px',
            backgroundColor: '#fed7d7',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#e53e3e'
          }}
        >
          Clear All
        </button>
      </div>

      <div style={{
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        backgroundColor: 'white'
      }}>
        {activities.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#a0aec0' }}>
            No activities yet. Click buttons above to see real-time activity tracking!
          </div>
        ) : (
          activities.slice(0, 10).map((activity, index) => (
            <div
              key={index}
              style={{
                padding: '8px 12px',
                borderBottom: index < Math.min(activities.length, 10) - 1 ? '1px solid #e2e8f0' : 'none',
                fontSize: '14px'
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                {activity.type}
                <span style={{ fontWeight: 'normal', color: '#718096', marginLeft: '8px' }}>
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {activity.data && (
                <div style={{ color: '#4a5568', fontSize: '12px', marginTop: '2px' }}>
                  {JSON.stringify(activity.data)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function IntegrationExplanation() {
  const { userId, config } = useActivitySynqGlobal()

  return (
    <div style={{
      border: '1px solid #bee3f8',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      backgroundColor: '#ebf8ff'
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#2b6cb0' }}>Integration Pattern</h3>

      <div style={{ marginBottom: '16px' }}>
        <strong>Your User ID:</strong> <code style={{ background: '#white', padding: '2px 6px', borderRadius: '3px' }}>{userId || 'Not set'}</code>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', border: '1px solid #fed7d7', borderRadius: '6px', backgroundColor: '#fed7d7' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#c53030' }}>Old Way (Context Wrapper)</h4>
          <pre style={{ fontSize: '12px', margin: 0, color: '#2d3748' }}>{`<ActivitySynqProvider config={...}>
  <MyComponent />
</ActivitySynqProvider>

function MyComponent() {
  const { registerActivity } = useActivitySynq()
  // Must be inside provider
}`}</pre>
        </div>

        <div style={{ padding: '12px', border: '1px solid #c6f6d5', borderRadius: '6px', backgroundColor: '#c6f6d5' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#38a169' }}>New Way (Single Component)</h4>
          <pre style={{ fontSize: '12px', margin: 0, color: '#2d3748' }}>{`function App() {
  return (
    <div>
      <Header />
      <MyComponent />
      <ActivitySynqContainer config={...} />
    </div>
  )
}

function MyComponent() {
  const { registerActivity } = useActivitySynqGlobal()
  // Works anywhere! No wrapper needed
}`}</pre>
        </div>
      </div>

      <div style={{ padding: '12px', border: '1px solid #fbb6ce', borderRadius: '6px', backgroundColor: '#fbb6ce' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#b83280' }}>✨ The Magic</h4>
        <p style={{ margin: '0', fontSize: '14px', color: '#2d3748' }}>
          <code>useActivitySynqGlobal()</code> works in any component without requiring the calling component
          to be wrapped in a context provider. It uses the react-toastify pattern with event emitters and portals.
        </p>
      </div>
    </div>
  )
}

export default function ActivitySynqGlobalDemo() {
  const config = {
    apiKey: 'demo-api-key',
    appId: 'demo-app-id',
    sessionName: 'v2-demo-session',
    userId: `demo-user-${Math.random().toString(36).substring(2, 6)}`
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '8px' }}>
        ActivitySynq Container Demo
      </h1>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '24px' }}>
        Like react-toastify: single component, no wrapper needed
      </p>

      <IntegrationExplanation />

      <h2 style={{ color: '#2d3748', marginBottom: '16px' }}>Feature Tracking Components</h2>
      <p style={{ color: '#4a5568', marginBottom: '16px' }}>
        Each component below uses <code>useActivitySynqGlobal()</code> independently,
        without any wrapper around them:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
        <FeatureTracker sectionName="Product Features" />
        <FeatureTracker sectionName="Analytics Tools" />
        <FeatureTracker sectionName="User Dashboard" />
      </div>

      <ActivityFeed />

      <div style={{
        border: '1px solid #fbb6ce',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        backgroundColor: '#fef5e7'
      }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#d69e2e' }}>🚀 How It Works</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#2d3748' }}>
          <li>Single <code>&lt;ActivitySynqContainer /&gt;</code> component like <code>&lt;ToastContainer /&gt;</code></li>
          <li>Singleton event emitter for pub/sub communication</li>
          <li>Global session manager handles Multisynq connections</li>
          <li>Portal-based rendering (separate DOM tree)</li>
          <li>Hook subscriptions to global events for reactive updates</li>
          <li>Global API object (like <code>toast.success()</code>)</li>
        </ul>
      </div>

      {/* Single component like ToastContainer - placed anywhere */}
      <ActivitySynqContainer config={config} />
    </div>
  )
}