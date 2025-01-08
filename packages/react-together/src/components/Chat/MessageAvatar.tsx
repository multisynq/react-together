import { useMemo } from 'react'
import { getUserColor } from '../../utils'
import { AvatarProps } from './types'

export default function MessageAvatar({ isMe, sender }: AvatarProps) {
  const senderColor = useMemo(() => getUserColor(sender), [sender])

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
