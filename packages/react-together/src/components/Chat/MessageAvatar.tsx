import { useMemo } from 'react'
import { getUserColor } from '../../utils'
import { MessageAvatarProps } from './types'

export default function MessageAvatar({ isMe, senderId }: MessageAvatarProps) {
  const senderColor = useMemo(() => getUserColor(senderId), [senderId])

  const initials = useMemo(() => {
    if (!senderId) return ''
    const trimmedSender = senderId.trim()
    return `${trimmedSender[0]}${trimmedSender[trimmedSender.length - 1]}`.toUpperCase()
  }, [senderId])

  return (
    <div
      className={`rt-avatar ${isMe ? 'isMe' : ''}`}
      style={{ backgroundColor: senderColor }}
    >
      <label className="rt-initials">{initials}</label>
    </div>
  )
}
