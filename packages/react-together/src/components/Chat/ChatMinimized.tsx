import { ChatMinimizedProps } from './types'

export default function ChatMinimized({
  chatName,
  expandChat
}: ChatMinimizedProps) {
  return (
    <button className="rt-minChatContainer" onClick={() => expandChat()}>
      <span className="rt-chatHeader-title">{chatName}</span>
      <div className="rt-chatHeader-button">
        <span className="rt-chatHeader-button-label">+</span>
      </div>
    </button>
  )
}
