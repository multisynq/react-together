import { MessageRowProps } from './types'

export default function MessageRow({
  senderId,
  sentAt,
  isMe,
  MessageAvatar,
  MessageBody,
  ...message
}: MessageRowProps) {
  return (
    <div className={`rt-message-row ${isMe ? 'isMe' : ''}`}>
      <MessageAvatar isMe={isMe} senderId={senderId} />
      <MessageBody
        isMe={isMe}
        senderId={senderId}
        sentAt={sentAt}
        {...message}
      />
    </div>
  )
}
