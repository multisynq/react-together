import { useEffect, useRef } from 'react'
import { useMyId } from '../../hooks'
import { MessageListProps } from './types'

export default function MessageList({
  messages,
  MessageRow,
  MessageAvatar,
  MessageBody
}: MessageListProps) {
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
          <MessageRow
            senderId={senderId}
            message={message}
            sentAt={sentAt}
            isMe={senderId === myId}
            MessageAvatar={MessageAvatar}
            MessageBody={MessageBody}
          />
        </div>
      ))}
    </div>
  )
}
