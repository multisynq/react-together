import { ChatHeaderProps } from './types'

export default function ChatHeader({
  chatName,
  minimizeChat
}: ChatHeaderProps) {
  return (
    <button className="rt-chatHeader" onClick={minimizeChat}>
      <span className="rt-chatHeader-title">{chatName}</span>
      <div className="rt-chatHeader-button">
        <span className="rt-chatHeader-button-label">-</span>
      </div>
    </button>
  )
}
