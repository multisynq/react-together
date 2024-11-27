import { useState } from 'react'
import { SessionManager } from 'react-together'
import { CountPerUser } from './CountPerUser'

export function CountPerUserDemo() {
  const searchParams = new URLSearchParams(window.location.search)
  const [username, setUsername] = useState(searchParams.get('username') || '')
  const [localUsername, setLocalUsername] = useState(username || '')

  return (
    <div className="m-5">
      <div className="fixed bottom-2 right-2 z-50">
        <SessionManager />
      </div>
      <h1>Count Per User Demo</h1>
      <p>
        This demo explores the use of useStateTogetherWithPerUserValues to
        maintain a count of the number of times a button has been clicked per
        user. Log in with a username to see and update the count for that user.
      </p>
      <div>
        {username ? (
          <>
            <p className="mb-4">
              Logged in as: <strong>{username}</strong>
              <button
                className="mx-2 underline"
                onClick={() => setUsername('')}
              >
                Logout
              </button>
            </p>
            {/* <CountPerUser username={username} /> */}
          </>
        ) : (
          <>
            <p className="mb-4">Enter a username to login</p>
            <input
              value={localUsername}
              onChange={(e) => setLocalUsername(e.target.value)}
            />
            <button
              className="mx-2 underline"
              onClick={() => setUsername(localUsername)}
            >
              Login
            </button>
          </>
        )}
      </div>
      <CountPerUser username={username} />
    </div>
  )
}
