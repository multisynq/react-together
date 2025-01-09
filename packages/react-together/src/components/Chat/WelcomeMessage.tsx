import MessageIcon from './MessageIcon'

export default function WelcomeMessage() {
  return (
    <div className="rt-message-prompt">
      <div className="rt-message-prompt-content">
        <MessageIcon />
        <h3>Start the Conversation</h3>
        <p>Be the first one to send a message!</p>
      </div>
    </div>
  )
}
