import { useEffect, useRef } from 'react'
import { useChat, useMyId } from 'react-together'
import './Chat.css'
import ChatInput from './ChatInput'
import Message from './Message'

export default function Chat() {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage } = useChat('chat')
  const myId = useMyId()
  // const { messages } = useChat('the-key');

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="rt-chatContainer">
      <div className="rt-messageContainer">
        {messages.map(({ id, senderId, sentAt, message }) => {
          return (
            <div
              key={id}
              ref={id === messages.length - 1 ? lastMessageRef : undefined}
            >
              <Message
                sender={senderId}
                message={message}
                timestamp={sentAt}
                isMe={senderId === myId}
              />
            </div>
          )
        })}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  )
}
