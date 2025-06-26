import React, { useState, useCallback, useMemo } from 'react'
import { ActivitySynqGlobal, useActivitySynqGlobal } from 'react-together'
import type { ActivityEvent } from 'react-together'

// Customizable Activity Feed Component
interface ActivityFeedProps {
  maxItems?: number
  opacity?: number
  backgroundColor?: string
  borderColor?: string
  scrollable?: boolean
  showTimestamps?: boolean
  showUserInfo?: boolean
  height?: string
  className?: string
}

function CustomizableActivityFeed({
  maxItems = 10,
  opacity = 1,
  backgroundColor = '#ffffff',
  borderColor = '#e5e7eb',
  scrollable = true,
  showTimestamps = true,
  showUserInfo = true,
  height = '300px',
  className = ''
}: ActivityFeedProps) {
  const { activities } = useActivitySynqGlobal()

  const feedStyle = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    opacity: opacity,
    height: scrollable ? height : 'auto',
    overflow: scrollable ? 'auto' : 'visible',
    border: `1px solid ${borderColor}`,
    borderRadius: '8px',
    padding: '12px',
    transition: 'all 0.3s ease'
  }

  const displayedActivities = activities.slice(0, maxItems)

  return (
    <div style={feedStyle} className={className}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
          🔔 Activity Feed ({displayedActivities.length})
        </h4>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          Max: {maxItems} | Opacity: {Math.round(opacity * 100)}%
        </div>
      </div>

      {displayedActivities.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
          <p style={{ margin: 0, fontSize: '14px' }}>No activities yet. Try the buttons below!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {displayedActivities.map((activity, index) => {
            const activityUserId = activity.data?.userId || 'Unknown'
            const isLocal = activityUserId.includes('demo-user')
            return (
              <div
                key={`${activity.timestamp}-${index}`}
                style={{
                  padding: '10px',
                  backgroundColor: isLocal ? '#dbeafe' : '#f3f4f6',
                  border: `1px solid ${isLocal ? '#93c5fd' : '#d1d5db'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: isLocal ? '#1d4ed8' : '#374151',
                    textTransform: 'capitalize'
                  }}>
                    {activity.data?.metadata?.icon && `${activity.data.metadata.icon} `}
                    {activity.data?.action || activity.type.replace('_', ' ')}
                  </span>
                  {showTimestamps && (
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  )}
                </div>
                
                {showUserInfo && (
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    👤 {activityUserId?.slice(-8) || 'Unknown'} | 
                    📊 {JSON.stringify(activity.data).slice(0, 60)}
                    {JSON.stringify(activity.data).length > 60 && '...'}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Feature Demo Section
function FeatureDemo({ userId }: { userId: string }) {
  const { registerActivity, isReady, status } = useActivitySynqGlobal()

  const features = [
    { id: 'rolled_dice', icon: '🎲', label: 'Rolled Dice', color: '#3b82f6', activity: 'rolled dice' },
    { id: 'cast_fireball', icon: '🪄', label: 'Cast Fireball', color: '#dc2626', activity: 'cast fireball' },
    { id: 'bet_money', icon: '💰', label: 'Bet $20', color: '#10b981', activity: 'bet $20' },
    { id: 'pet_cat', icon: '🐱', label: 'Pet Cat', color: '#f59e0b', activity: 'pet cat' },
    { id: 'ordered_pizza', icon: '🍕', label: 'Ordered Pizza', color: '#8b5cf6', activity: 'ordered a pizza' }
  ]

  const handleFeatureUse = useCallback((feature: any) => {
    registerActivity('user_action', {
      action: feature.activity,
      feature: feature.id,
      userId: userId,
      timestamp: Date.now(),
      metadata: {
        page: 'global-demo',
        icon: feature.icon,
        version: '1.0.0'
      }
    })
  }, [registerActivity, userId])

  const handleCustomActivity = useCallback(() => {
    const activityTypes = ['user_action', 'page_view', 'form_submit', 'click_event', 'scroll_event']
    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
    
    registerActivity(randomType, {
      action: randomType,
      userId: userId,
      timestamp: Date.now(),
      randomData: Math.random().toString(36).substring(2, 8)
    })
  }, [registerActivity, userId])

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #e5e7eb', 
      borderRadius: '12px', 
      backgroundColor: '#f9fafb',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#1f2937' }}>🎯 Feature Demo</h3>
        <div style={{ 
          padding: '4px 8px', 
          borderRadius: '4px', 
          fontSize: '12px',
          backgroundColor: status === 'ready' ? '#dcfce7' : '#fef3c7',
          color: status === 'ready' ? '#166534' : '#92400e'
        }}>
          {status === 'ready' ? '🟢 Ready' : '🟡 Connecting...'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '15px' }}>
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => handleFeatureUse(feature)}
            disabled={!isReady}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: feature.color,
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: isReady ? 'pointer' : 'not-allowed',
              opacity: isReady ? 1 : 0.6,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              if (isReady) e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span>{feature.icon}</span>
            <span>{feature.label}</span>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleCustomActivity}
          disabled={!isReady}
          style={{
            padding: '10px 20px',
            border: '2px solid #6366f1',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#6366f1',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: isReady ? 'pointer' : 'not-allowed',
            opacity: isReady ? 1 : 0.6,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (isReady) {
              e.currentTarget.style.backgroundColor = '#6366f1'
              e.currentTarget.style.color = 'white'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#6366f1'
          }}
        >
          🎲 Generate Random Activity
        </button>
      </div>
    </div>
  )
}

// Feed Customization Controls
interface FeedControlsProps {
  maxItems: number
  setMaxItems: (value: number) => void
  opacity: number
  setOpacity: (value: number) => void
  backgroundColor: string
  setBackgroundColor: (value: string) => void
  borderColor: string
  setBorderColor: (value: string) => void
  scrollable: boolean
  setScrollable: (value: boolean) => void
  showTimestamps: boolean
  setShowTimestamps: (value: boolean) => void
  showUserInfo: boolean
  setShowUserInfo: (value: boolean) => void
  height: string
  setHeight: (value: string) => void
}

function FeedCustomizationControls({
  maxItems, setMaxItems,
  opacity, setOpacity,
  backgroundColor, setBackgroundColor,
  borderColor, setBorderColor,
  scrollable, setScrollable,
  showTimestamps, setShowTimestamps,
  showUserInfo, setShowUserInfo,
  height, setHeight
}: FeedControlsProps) {
  const presetThemes = [
    { name: 'Default', bg: '#ffffff', border: '#e5e7eb' },
    { name: 'Dark', bg: '#1f2937', border: '#374151' },
    { name: 'Blue', bg: '#eff6ff', border: '#bfdbfe' },
    { name: 'Green', bg: '#f0fdf4', border: '#bbf7d0' },
    { name: 'Purple', bg: '#faf5ff', border: '#d8b4fe' },
    { name: 'Orange', bg: '#fff7ed', border: '#fed7aa' }
  ]

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #d1d5db', 
      borderRadius: '12px', 
      backgroundColor: '#f9fafb',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>⚙️ Feed Customization</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        
        {/* Quantity Controls */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            📊 Max Items: {maxItems}
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={maxItems}
            onChange={(e) => setMaxItems(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
            1 - 50 activities
          </div>
        </div>

        {/* Opacity Control */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            👻 Opacity: {Math.round(opacity * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
            10% - 100% transparency
          </div>
        </div>

        {/* Height Control */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            📏 Height: {height}
          </label>
          <select
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              border: '1px solid #d1d5db' 
            }}
          >
            <option value="200px">Small (200px)</option>
            <option value="300px">Medium (300px)</option>
            <option value="400px">Large (400px)</option>
            <option value="500px">X-Large (500px)</option>
            <option value="auto">Auto-fit</option>
          </select>
        </div>

        {/* Color Controls */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            🎨 Background Color
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{ width: '100%', height: '32px', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            🖼️ Border Color
          </label>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            style={{ width: '100%', height: '32px', borderRadius: '4px' }}
          />
        </div>

        {/* Toggle Controls */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
            🔧 Display Options
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={scrollable}
                onChange={(e) => setScrollable(e.target.checked)}
              />
              📜 Scrollable feed
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={showTimestamps}
                onChange={(e) => setShowTimestamps(e.target.checked)}
              />
              ⏰ Show timestamps
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={showUserInfo}
                onChange={(e) => setShowUserInfo(e.target.checked)}
              />
              👤 Show user info
            </label>
          </div>
        </div>
      </div>

      {/* Preset Themes */}
      <div style={{ marginTop: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          🎭 Quick Themes
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {presetThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                setBackgroundColor(theme.bg)
                setBorderColor(theme.border)
              }}
              style={{
                padding: '6px 12px',
                border: `2px solid ${theme.border}`,
                borderRadius: '6px',
                backgroundColor: theme.bg,
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: theme.name === 'Dark' ? 'white' : 'black'
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main ActivitySynq Global Demo Page
export default function ActivitySynqGlobalPage() {
  // User simulation
  const [currentUser, setCurrentUser] = useState(() => 
    `demo-user-${Math.random().toString(36).substring(2, 8)}`
  )

  // Feed customization state
  const [maxItems, setMaxItems] = useState(10)
  const [opacity, setOpacity] = useState(1)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [borderColor, setBorderColor] = useState('#e5e7eb')
  const [scrollable, setScrollable] = useState(true)
  const [showTimestamps, setShowTimestamps] = useState(true)
  const [showUserInfo, setShowUserInfo] = useState(true)
  const [height, setHeight] = useState('300px')

  // Stable onActivity callback to prevent config recreation
  const onActivity = useCallback((activity: ActivityEvent) => {
    console.log('🎉 Global ActivitySynq received:', activity)
  }, [])

  // ActivitySynq configuration with stable references
  const activityConfig = useMemo(() => ({
    apiKey: import.meta.env.VITE_API_KEY || 'demo-api-key',
    appId: import.meta.env.VITE_APP_ID || 'demo-app-id',
    sessionName: 'global-website-demo',
    sessionPassword: 'website-demo-password',
    userId: currentUser,
    onActivity
  }), [currentUser, onActivity])

  const simulateOtherUser = useCallback(() => {
    const otherUserId = `demo-user-${Math.random().toString(36).substring(2, 8)}`
    const { registerActivity } = useActivitySynqGlobal()
    
    registerActivity('simulated_activity', {
      simulatedBy: currentUser,
      actualUser: otherUserId,
      action: 'other_user_action',
      timestamp: Date.now()
    })
  }, [currentUser])

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 15px 0'
        }}>
          🚀 ActivitySynq Global
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '800px', margin: '0 auto 20px' }}>
          Single-line integration with customizable activity feeds. 
          No context wrappers needed - just drop in <code>&lt;ActivitySynqGlobal /&gt;</code> and use the hook anywhere!
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '20px',
          flexWrap: 'wrap',
          marginTop: '20px'
        }}>
          <div style={{ 
            padding: '12px 20px',
            backgroundColor: '#f0f9ff',
            border: '2px solid #0ea5e9',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            👤 <strong>Current User:</strong> <code>{currentUser}</code>
          </div>
          
          <button
            onClick={() => setCurrentUser(`demo-user-${Math.random().toString(36).substring(2, 8)}`)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 Switch User
          </button>
        </div>
      </div>

      {/* Feature Demo */}
      <FeatureDemo userId={currentUser} />

      {/* Feed Customization Controls */}
      <FeedCustomizationControls
        maxItems={maxItems}
        setMaxItems={setMaxItems}
        opacity={opacity}
        setOpacity={setOpacity}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        scrollable={scrollable}
        setScrollable={setScrollable}
        showTimestamps={showTimestamps}
        setShowTimestamps={setShowTimestamps}
        showUserInfo={showUserInfo}
        setShowUserInfo={setShowUserInfo}
        height={height}
        setHeight={setHeight}
      />

      {/* Customizable Activity Feed */}
      <CustomizableActivityFeed
        maxItems={maxItems}
        opacity={opacity}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        scrollable={scrollable}
        showTimestamps={showTimestamps}
        showUserInfo={showUserInfo}
        height={height}
      />

      {/* Integration Info */}
      <div style={{ 
        marginTop: '40px', 
        padding: '30px', 
        backgroundColor: '#ffffff',
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ color: '#1e293b', marginTop: 0, fontSize: '24px' }}>
          🎯 Implementation Pattern
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
          <div>
            <h4 style={{ color: '#dc2626', fontSize: '18px' }}>❌ Old Way (Context Wrapper)</h4>
            <pre style={{ 
              backgroundColor: '#fef2f2', 
              padding: '20px', 
              borderRadius: '8px',
              fontSize: '13px',
              overflow: 'auto',
              border: '1px solid #fecaca'
            }}>
{`<ActivitySynqProvider config={config}>
  <App />
</ActivitySynqProvider>`}
            </pre>
          </div>
          
          <div>
            <h4 style={{ color: '#059669', fontSize: '18px' }}>✅ New Way (Single Line)</h4>
            <pre style={{ 
              backgroundColor: '#f0fdf4', 
              padding: '20px', 
              borderRadius: '8px',
              fontSize: '13px',
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

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#dbeafe', 
          borderRadius: '8px',
          border: '1px solid #93c5fd'
        }}>
          <h4 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>✨ Key Benefits</h4>
          <ul style={{ margin: 0, color: '#1e40af', fontSize: '14px' }}>
            <li><strong>Simple Setup:</strong> Single component instead of app wrapper</li>
            <li><strong>Global Access:</strong> <code>useActivitySynqGlobal()</code> works anywhere</li>
            <li><strong>Customizable Feeds:</strong> Built-in styling and behavior options</li>
            <li><strong>Better Performance:</strong> Singleton pattern prevents multiple sessions</li>
            <li><strong>Toast Notifications:</strong> Optional real-time activity notifications</li>
          </ul>
        </div>
      </div>

      {/* Single line integration - enables everything above! */}
      <ActivitySynqGlobal 
        config={activityConfig}
        showNotifications={true}
        portalContainer="body"
      />
    </div>
  )
}