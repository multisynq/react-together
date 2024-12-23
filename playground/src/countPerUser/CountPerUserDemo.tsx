import { SessionManager } from 'react-together'
import { CountPerUser } from './CountPerUser'

export function CountPerUserDemo() {
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
      <CountPerUser />
    </div>
  )
}
