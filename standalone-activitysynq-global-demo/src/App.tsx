import { useState, useCallback } from 'react'
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'

// Demo component that showcases features in different parts of the app
function FeatureTracker({ title, color }: { title: string, color: string }) {
  const { registerActivity, isReady, status } = useActivitySynqGlobal()

  const trackFeature = useCallback((feature: string) => {
    registerActivity('feature_usage', {
      feature,
      section: title,
      timestamp: Date.now(),
      userAgent: navigator.userAgent.slice(0, 50)
    })
  }, [registerActivity, title])

  return (
    <div style={{ 
      padding: '20px', 
      border: `2px solid ${color}`, 
      borderRadius: '12px', 
      margin: '10px',
      backgroundColor: `${color}10`,
      minHeight: '200px'
    }}>
      <h3 style={{ color, marginTop: 0 }}>🎯 {title}</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Status: <strong style={{ color: status === 'ready' ? 'green' : 'orange' }}>{status}</strong> | 
        Ready: <strong>{isReady ? '✅' : '⏳'}</strong>
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
        <button 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: color, 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => trackFeature('search')}
        >
          🔍 Search
        </button>
        <button 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: color, 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => trackFeature('filter')}
        >
          🔽 Filter
        </button>
        <button 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: color, 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => trackFeature('export')}
        >
          📁 Export
        </button>
      </div>

      <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#888' }}>
        ✨ This component works without any context wrapper!
      </p>
    </div>
  )
}

// Activity feed that shows real-time activities
function ActivityFeed() {
  const { activities, registerActivity } = useActivitySynqGlobal()

  const simulateUserAction = useCallback(() => {
    const actions = ['page_view', 'button_click', 'form_submit', 'scroll', 'hover']
    const action = actions[Math.floor(Math.random() * actions.length)]
    
    registerActivity('user_action', {
      action,
      page: window.location.pathname,
      timestamp: Date.now(),
      randomId: Math.random().toString(36).substring(2, 8)
    })
  }, [registerActivity])

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #8b5cf6', 
      borderRadius: '12px', 
      margin: '10px',
      backgroundColor: '#8b5cf610'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#8b5cf6', margin: 0 }}>📡 Live Activity Feed</h3>
        <button 
          onClick={simulateUserAction}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#8b5cf6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          + Add Activity
        </button>
      </div>

      <div style={{ 
        maxHeight: '300px', 
        overflow: 'auto', 
        backgroundColor: 'white', 
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '10px'
      }}>
        {activities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌟</div>
            <p>No activities yet. Start clicking buttons above!</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>
              Showing {activities.length} recent activities
            </p>
            {activities.slice(0, 20).map((activity, index) => {
              const isLocal = activity.data?.userId?.includes('demo-user')
              return (
                <div 
                  key={`${activity.timestamp}-${index}`}
                  style={{ 
                    padding: '10px', 
                    marginBottom: '8px',
                    backgroundColor: isLocal ? '#dbeafe' : '#f3f4f6',
                    border: `1px solid ${isLocal ? '#93c5fd' : '#d1d5db'}`,
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: isLocal ? '#1d4ed8' : '#374151' }}>
                      {activity.type}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {new Date(activity.timestamp || 0).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    User: {activity.data?.userId?.slice(-8) || 'Unknown'} | 
                    Data: {JSON.stringify(activity.data).slice(0, 80)}
                    {JSON.stringify(activity.data).length > 80 && '...'}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Main app demonstrating single-line integration
function App() {
  const [userId] = useState(() => 
    `demo-user-${Math.random().toString(36).substring(2, 8)}`
  )

  // Configuration for ActivitySynq
  const activityConfig = {
    apiKey: import.meta.env.VITE_API_KEY || 'demo-api-key',
    appId: import.meta.env.VITE_APP_ID || 'demo-app-id', 
    sessionName: 'global-demo-session',
    sessionPassword: 'global-demo-password',
    userId: userId,
    onActivity: (activity: any) => {
      console.log('🎉 Global ActivitySynq received:', activity)
    }
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 10px 0'
        }}>
          🚀 ActivitySynq Global Demo
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          Demonstrating <strong>single-line integration</strong> - no context wrapper needed!
          The <code>&lt;ActivitySynqGlobal /&gt;</code> component enables the hook to work anywhere.
        </p>
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#0c4a6e' }}>
            👤 Your User ID: <code style={{ fontWeight: 'bold' }}>{userId}</code>
          </p>
        </div>
      </div>

      {/* Demo sections - these work without any context wrapper! */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <FeatureTracker title="Product Features" color="#ef4444" />
        <FeatureTracker title="Analytics Tools" color="#10b981" />
        <FeatureTracker title="User Dashboard" color="#f59e0b" />
      </div>

      {/* Activity feed */}
      <ActivityFeed />

      {/* Integration explanation */}
      <div style={{ 
        marginTop: '40px', 
        padding: '30px', 
        backgroundColor: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '12px'
      }}>
        <h3 style={{ color: '#1e293b', marginTop: 0 }}>🎯 Integration Pattern</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h4 style={{ color: '#dc2626' }}>❌ Old Way (Context Wrapper)</h4>
            <pre style={{ 
              backgroundColor: '#fef2f2', 
              padding: '15px', 
              borderRadius: '6px',
              fontSize: '12px',
              overflow: 'auto',
              border: '1px solid #fecaca'
            }}>
{`<ActivitySynqProvider config={config}>
  <App />
</ActivitySynqProvider>`}
            </pre>
          </div>
          <div>
            <h4 style={{ color: '#059669' }}>✅ New Way (Single Line)</h4>
            <pre style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '15px', 
              borderRadius: '6px',
              fontSize: '12px',
              overflow: 'auto',
              border: '1px solid #bbf7d0'
            }}>
{`function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <ActivitySynqGlobal config={config} />
    </div>
  )
}`}
            </pre>
          </div>
        </div>
        <p style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#dbeafe', 
          borderRadius: '6px',
          fontSize: '14px',
          color: '#1e40af',
          border: '1px solid #93c5fd'
        }}>
          💡 <strong>The magic:</strong> <code>useActivitySynqGlobal()</code> works in any component 
          without needing a context provider. Just place <code>&lt;ActivitySynqGlobal /&gt;</code> 
          anywhere in your app!
        </p>
      </div>

      {/* Single line integration - this enables everything above! */}
      <ActivitySynqGlobal 
        config={activityConfig}
      />
    </div>
  )
}

export default App