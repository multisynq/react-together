import { useMemo } from 'react'
import { MessageProps } from './types'

function generateColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h = hash % 360
  return `hsl(${h}, 70%, 60%)`
}

function formatTime(timestamp: number) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Message({
  message,
  sender,
  timestamp,
  isMe
}: MessageProps) {
  const senderColor = useMemo(() => generateColor(sender), [sender])

  const initials = useMemo(() => {
    if (!sender) return ''
    const trimmedSender = sender.trim()
    return `${trimmedSender[0]}${trimmedSender[trimmedSender.length - 1]}`.toUpperCase()
  }, [sender])

  return (
    <div>
      <div className={`rt-message-box ${isMe ? 'isMe' : ''}`}>
        <div
          className={`rt-avatar ${isMe ? 'isMe' : ''}`}
          style={{ backgroundColor: senderColor }}
        >
          <label className="rt-initials">{initials}</label>
        </div>
        <div className={`rt-message-divider ${isMe ? 'isMe' : ''}`}>
          <div className={`rt-message-border ${isMe ? 'isMe' : ''}`}>
            <span className="rt-messageLabel">{sender}</span>
            <div>
              <span className="rt-message-text text-wrap">{message}</span>{' '}
              <span className="rt-messageLabel">
                {timestamp ? formatTime(timestamp) : '???'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
