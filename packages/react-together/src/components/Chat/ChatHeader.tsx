import { ChatHeaderProps } from './types'

export default function ChatHeader({
  chatName,
  collapseChat
}: ChatHeaderProps) {
  return (
    <button className="rt-chatHeader" onClick={collapseChat}>
      <span className="rt-chatHeader-title">{chatName}</span>
      <div className="rt-chatHeader-button">
        <span className="rt-chatHeader-button-label">-</span>
      </div>
    </button>
  )
}
