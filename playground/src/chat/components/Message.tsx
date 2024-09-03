import { useMemo } from 'react'

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

interface MessageProps {
  message: string
  sender: string
  timestamp: number
}
export default function Message({ message, sender, timestamp }: MessageProps) {
  const senderColor = useMemo(() => generateColor(sender), [sender])
  return (
    <div className="message">
      <span className="timestamp">
        {timestamp ? formatTime(timestamp) : '???'}
      </span>
      <span className="sender" style={{ color: senderColor }}>
        {sender}
      </span>
      <span className="content">{message}</span>
    </div>
  )
}
