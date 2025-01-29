import { useEffect, useRef } from 'react'
import { useIsTogether, useMyId } from '../../hooks'
import { MessageListProps } from './types'

export default function MessageList({
  messages,
  MessageRow,
  MessageAvatar,
  MessageBody,
  ConnectPrompt,
  WelcomeMessage
}: MessageListProps) {
  const myId = useMyId()
  const isTogether = useIsTogether()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="rt-messageContainer">
      {isTogether ? (
        messages.length > 0 ? (
          messages.map(({ id, senderId, ...message }, index) => (
            <div
              key={id}
              ref={index === messages.length - 1 ? lastMessageRef : undefined}
            >
              <MessageRow
                senderId={senderId}
                {...message}
                isMe={senderId === myId}
                MessageAvatar={MessageAvatar}
                MessageBody={MessageBody}
              />
            </div>
          ))
        ) : (
          <WelcomeMessage />
        )
      ) : (
        <ConnectPrompt />
      )}
    </div>
  )
}
