import { useEffect, useRef } from 'react'
import { useMyId } from '../../hooks'
import { MessagesContainerProps } from './types'

export default function MessagesContainer({
  messages,
  MessageComponent,
  AvatarComponent,
  MessageBodyComponent
}: MessagesContainerProps) {
  const myId = useMyId()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="rt-messageContainer">
      {messages.map(({ id, senderId, sentAt, message }, index) => (
        <div
          key={id}
          ref={index === messages.length - 1 ? lastMessageRef : undefined}
        >
          <MessageComponent
            sender={senderId}
            message={message}
            timestamp={sentAt}
            isMe={senderId === myId}
            AvatarComponent={AvatarComponent}
            MessageBodyComponent={MessageBodyComponent}
          />
        </div>
      ))}
    </div>
  )
}
