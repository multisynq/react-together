import { MessageBodyProps } from './types'

function timeToLocale(timestamp: number) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBody({
  isMe,
  sender,
  message,
  timestamp,
  formatTime = timeToLocale
}: MessageBodyProps) {
  return (
    <div className={`rt-message-divider ${isMe ? 'isMe' : ''}`}>
      <div className={`rt-message-border ${isMe ? 'isMe' : ''}`}>
        <span className="rt-messageLabel">{sender}</span>
        <div>
          <span className="rt-message-text">{message}</span>{' '}
          <span className="rt-messageLabel">
            {timestamp ? formatTime(timestamp) : '???'}
          </span>
        </div>
      </div>
    </div>
  )
}
