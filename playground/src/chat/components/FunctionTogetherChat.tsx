import { useCallback, useEffect, useRef, useState } from 'react'
import { useFunctionTogether } from 'react-together'
import './Chat.css'
import ChatInput from './ChatInput'
import Message from './Message'

interface Message {
  ts: number
  userId: string
  message: string
}

export interface SendMessageArgs {
  ts: number
  userId: string
  message: string
}

export default function Chat() {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const send = useFunctionTogether(
    'ding',
    useCallback(({ message, ts, userId }: SendMessageArgs) => {
      console.log('send', { message, ts })
      setMessages((prev) => [...prev, { ts, userId, message }])
    }, [])
  )

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="chat">
      <h3>IRC Together</h3>
      <div className="messages-container">
        {messages.map(({ userId, ts, message }, idx) => {
          return (
            <div
              key={idx}
              ref={idx === messages.length - 1 ? lastMessageRef : undefined}
            >
              <Message sender={userId} message={message} timestamp={ts} />
            </div>
          )
        })}
      </div>
      here
      <ChatInput onSend={send} />
    </div>
  )
}
