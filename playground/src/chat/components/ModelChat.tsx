import { useEffect, useRef, useState } from 'react'
import { useChat, useMyId } from 'react-together'
import './Chat.css'
import ChatInput from './ChatInput'
import Message from './Message'

const CHAT_HEADER_TITLE = 'Chat Group'

export default function Chat() {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage } = useChat('chat')
  const myId = useMyId()

  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  useEffect(() => {
    if (!isMinimized && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isMinimized])

  return (
    <div className="rt-chat">
      {isMinimized ? (
        <button className="rt-minChatContainer" onClick={toggleMinimize}>
          <span className="rt-chatHeader-title">{CHAT_HEADER_TITLE}</span>
          <div className="rt-chatHeader-button">
            <span className="rt-chatHeader-button-label">+</span>
          </div>
        </button>
      ) : (
        <div className="rt-chatContainer">
          <button className="rt-chatHeader" onClick={toggleMinimize}>
            <span className="rt-chatHeader-title">{CHAT_HEADER_TITLE}</span>
            <div className="rt-chatHeader-button">
              <span className="rt-chatHeader-button-label">-</span>
            </div>
          </button>

          <div className="rt-messageContainer">
            {messages.map(({ id, senderId, sentAt, message }, index) => (
              <div
                key={id}
                ref={index === messages.length - 1 ? lastMessageRef : undefined}
              >
                <Message
                  sender={senderId}
                  message={message}
                  timestamp={sentAt}
                  isMe={senderId === myId}
                />
              </div>
            ))}
          </div>
          <ChatInput onSend={sendMessage} />
        </div>
      )}
    </div>
  )
}
