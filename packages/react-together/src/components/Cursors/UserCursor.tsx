import { Cursor } from '../../hooks/useCursors'
import { getUserColor as defaultGetUserColor } from '../../utils'
import CursorSVG from './CursorSVG'

export interface UserCursorOptions {
  transitionTime?: number
  getUserColor?: (userId: string) => string
}

export interface UserCursorProps extends Cursor, UserCursorOptions {
  userId: string
}

export default function UserCursor({
  userId,
  percentX,
  pageY,
  transitionTime = 100,
  getUserColor = defaultGetUserColor
}: UserCursorProps) {
  const windowWidth = document.body.scrollWidth

  const color = getUserColor(userId)

  // Convert X position to absolute position
  // Use original Y absolute position
  const x = percentX * windowWidth - window.scrollX
  const y = pageY - window.scrollY

  return (
    <div
      className="user-cursor-container"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${transitionTime}ms linear`
      }}
    >
      <CursorSVG width={20} height={18} color={color} />

      <div className="cursor-label" style={{ backgroundColor: color }}>
        {userId}
      </div>
    </div>
  )
}
