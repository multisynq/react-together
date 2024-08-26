import { useEffect, useRef, useState } from 'react'
import { useFunctionTogether } from 'react-together'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import './Chat.css'

interface Message {
  ts: number
  viewId: string
  content: string
}

export default function Chat() {
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const send = useFunctionTogether('ding', (args: any) => {
    const { data, viewId } = args
    console.log(args)
    const { message, ts } = data[0]
    setMessages((prev) => [...prev, { ts, viewId, content: message }])
  })

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="chat">
      <h3>IRC Together</h3>
      <div className="messages-container">
        {messages.map(({ viewId, ts, content }, idx) => {
          return (
            <div
              key={idx}
              ref={idx === messages.length - 1 ? lastMessageRef : undefined}
            >
              <Message sender={viewId} message={content} timestamp={ts} />
            </div>
          )
        })}
      </div>
      <ChatInput onSend={send} />
    </div>
  )
}
