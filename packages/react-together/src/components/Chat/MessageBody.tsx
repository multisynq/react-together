import { useAllNicknames } from '../../hooks'
import { MessageBodyProps } from './types'

function timeToLocale(timestamp: number) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBody({
  isMe,
  senderId,
  message,
  sentAt,
  formatTime = timeToLocale
}: MessageBodyProps) {
  const allNicknames = useAllNicknames()
  const senderNickname = allNicknames[senderId] ?? senderId
  return (
    <div className={`rt-message-divider ${isMe ? 'isMe' : ''}`}>
      <div className={`rt-message-border ${isMe ? 'isMe' : ''}`}>
        <span className="rt-messageLabel">{senderNickname}</span>
        <div>
          <span className="rt-message-text">{message}</span>{' '}
          <span className="rt-messageLabel">
            {sentAt ? formatTime(sentAt) : '???'}
          </span>
        </div>
      </div>
    </div>
  )
}
