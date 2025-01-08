import { useCreateRandomSession } from '../../hooks'
import QuestionMarkIcon from './QuestionMarkIcon'

export default function ConnectPrompt() {
  const createRandomSession = useCreateRandomSession()
  return (
    <div className="rt-message-prompt">
      <div className="rt-message-prompt-content">
        <QuestionMarkIcon />
        <h3>Not Connected to a Session</h3>
        <p>Create a new session to start chatting!</p>
        <button
          className="rt-message-prompt-button"
          onClick={() => createRandomSession()}
        >
          Create New Session
        </button>
      </div>
    </div>
  )
}
