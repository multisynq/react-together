import { MessageProps } from './types'

export default function MessageRow({
  message,
  sender,
  timestamp,
  isMe,
  AvatarComponent,
  MessageBodyComponent
}: MessageProps) {
  return (
    <div className={`rt-message-row ${isMe ? 'isMe' : ''}`}>
      <AvatarComponent isMe={isMe} sender={sender} />
      <MessageBodyComponent
        isMe={isMe}
        sender={sender}
        timestamp={timestamp}
        message={message}
      />
    </div>
  )
}
