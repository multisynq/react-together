import { useEffect, useRef, useState } from 'react'
import { useChat, useMyId } from 'react-together'
import './Chat.css'
import ChatInput from './ChatInput'
import Message from './Message'

const CHAT_HEADER_TITLE = 'Chat Group'

function ChatWindow({ isMinimized, toggleMinimize }) {
  return (
    <div className="px-4 pt-3 pb-2 flex items-center bg-gray-50 border-b border-gray-200 justify-between">
      <span className="font-bold">{CHAT_HEADER_TITLE}</span>
      <button
        className="ml-2 h-[2rem] w-[2rem] rounded-full flex items-center justify-center"
        onClick={toggleMinimize}
      >
        <span className="font-semibold text-2xl mb-1">
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
