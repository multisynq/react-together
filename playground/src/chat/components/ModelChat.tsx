import { useEffect, useRef } from 'react'
import { useChat } from 'react-together'
import './Chat.css'
import ChatInput from './ChatInput'
import Message from './Message'

export default function Chat() {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage } = useChat('chat')

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="chat">
      <h3>IRC Together</h3>
      <div className="messages-container">
        {messages.map(({ id, senderId, sentAt, message }) => {
          return (
            <div
              key={id}
              ref={id === messages.length - 1 ? lastMessageRef : undefined}
            >
              <Message sender={senderId} message={message} timestamp={sentAt} />
            </div>
          )
        })}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  )
}
