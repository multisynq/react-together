import { useMemo } from 'react'
import { AvatarProps } from './types'

function generateColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h = hash % 360
  return `hsl(${h}, 70%, 60%)`
}

export default function Avatar({ isMe, sender }: AvatarProps) {
  const senderColor = useMemo(() => generateColor(sender), [sender])

  const initials = useMemo(() => {
    if (!sender) return ''
    const trimmedSender = sender.trim()
    return `${trimmedSender[0]}${trimmedSender[trimmedSender.length - 1]}`.toUpperCase()
  }, [sender])

  return (
    <div
      className={`rt-avatar ${isMe ? 'isMe' : ''}`}
      style={{ backgroundColor: senderColor }}
    >
      <label className="rt-initials">{initials}</label>
    </div>
  )
}
