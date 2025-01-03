import { useEffect, useRef, useState } from 'react'
import { useChat, useMyId } from 'react-together'
import './Chat.css'
import ChatInput from './ChatInput'
import Message from './Message'

const CHAT_HEADER_TITLE = 'Chat Group'

interface ChatWindowProps {
  isMinimized: boolean
  toggleMinimize: () => void
}

function ChatWindow({ isMinimized, toggleMinimize }: ChatWindowProps) {
  return (
    <div className="rt-chatHeader">
      <span className="rt-chatHeader-title">{CHAT_HEADER_TITLE}</span>
      <button className="rt-chatHeader-button" onClick={toggleMinimize}>
        <span className="rt-chatHeader-button-label">
          {isMinimized ? '+' : '-'}
        </span>
      </button>
    </div>
  )
}

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
    <div className="rt-chatContainer">
      <ChatWindow isMinimized={isMinimized} toggleMinimize={toggleMinimize} />
      {!isMinimized && (
        <>
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
        </>
      )}
    </div>
  )
}
