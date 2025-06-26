import { useState } from 'react'
import { ActivitySynqProvider, useActivitySynq } from '../context/ActivitySynqContext'

// Example test component showing different connection states
function ConnectionStatusDemo() {
  const { registerActivity, isReady, status, error, userId, activities } = useActivitySynq()

  const getStatusColor = () => {
    switch (status) {
      case 'ready': return '#d4edda'
      case 'initializing': return '#fff3cd'
      case 'disconnected': return '#f8d7da'
      case 'error': return '#f5c6cb'
      default: return '#e9ecef'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'ready': return 'Connected and Ready ✅'
      case 'initializing': return 'Connecting... ⏳'
      case 'disconnected': return 'Disconnected ⚠️'
      case 'error': return 'Error ❌'
      default: return 'Unknown'
    }
  }

  const handleTestActivity = () => {
    registerActivity('test_button_click', { 
      timestamp: Date.now(),
      demo: true 
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Connection Status Demo</h2>
      
      <div style={{
        padding: '15px',
        backgroundColor: getStatusColor(),
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>Status: {getStatusText()}</h3>
        <p><strong>Is Ready:</strong> {isReady ? 'Yes' : 'No'}</p>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Raw Status:</strong> {status}</p>
        <p><strong>Activities:</strong> {activities.length}</p>
        {error && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
            <strong>Error:</strong> {error.message}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleTestActivity}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isReady ? '#28a745' : '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isReady ? 'Send Activity (Live)' : 'Send Activity (Buffered)'}
        </button>
        
        {activities.length > 0 && (
          <div style={{
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px',
            alignSelf: 'center'
          }}>
            📊 {activities.length} activities synchronized
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#6c757d' }}>
        <h4>🔄 Offline Buffering Features:</h4>
        <ul>
          <li><strong>Ready:</strong> Activities sent immediately to other users</li>
          <li><strong>Disconnected/Error:</strong> Activities buffered locally (max 100)</li>
          <li><strong>Reconnection:</strong> All buffered activities automatically sent</li>
          <li><strong>Buffer indicator:</strong> Shows how many events are waiting</li>
        </ul>
        <p>Try clicking the button in different connection states to see buffering in action!</p>
      </div>
    </div>
  )
}

// Demo showing dynamic user switching
function UserSwitchDemo() {
  const [currentUser, setCurrentUser] = useState('user-1')
  
  const config = {
    userId: currentUser,
    onActivity: (activity: any) => {
      console.log(`Activity from ${activity.userId}:`, activity)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dynamic User Switch Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Current User: 
          <select 
            value={currentUser} 
            onChange={(e) => setCurrentUser(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="user-1">User 1</option>
            <option value="user-2">User 2</option>
            <option value="user-3">User 3</option>
          </select>
        </label>
      </div>

      <ActivitySynqProvider config={config} key={currentUser}>
        <ConnectionStatusDemo />
      </ActivitySynqProvider>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#6c757d' }}>
        <p>Switching users will reinitialize the session with a new userId.</p>
        <p>This simulates login/logout scenarios in real applications.</p>
      </div>
    </div>
  )
}

export default function ActivitySynqTestExample() {
  return (
    <div>
      <h1>ActivitySynq Advanced Testing Examples</h1>
      <UserSwitchDemo />
    </div>
  )
}