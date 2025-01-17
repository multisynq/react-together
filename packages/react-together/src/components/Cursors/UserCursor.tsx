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
  const bodyWidth = document.body.scrollWidth
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const scrollX = window.scrollX
  const scrollY = window.scrollY

  const color = getUserColor(userId)

  // Convert X position to absolute position
  // Use original Y absolute position
  const bodyX = percentX * bodyWidth
  const bodyY = pageY

  // Check if cursor is out of bounds
  const isOutOfBounds =
    bodyX < scrollX ||
    bodyX > scrollX + windowWidth ||
    bodyY < scrollY ||
    bodyY > scrollY + windowHeight

  // Calculate edge position and direction
  const padding = 20
  const edgeX = Math.max(padding, Math.min(windowWidth - padding, bodyX))
  const edgeY = Math.max(padding, Math.min(windowHeight - padding, bodyY))

  // Determine which edge to show the indicator on
  const position = {
    left: bodyX < scrollX ? 0 : undefined,
    right: bodyX > scrollX + windowWidth ? 0 : undefined,
    top: bodyY < scrollY ? 0 : undefined,
    bottom: bodyY > scrollY + windowHeight ? 0 : undefined
  }

  console.log({
    // userId,
    bodyX,
    bodyY,
    edgeX,
    edgeY,
    isOutOfBounds
  })

  return (
    <>
      <div
        className="user-cursor-container"
        style={{
          transform: `translate(${edgeX}px, ${edgeY}px)`,
          transition: `transform ${transitionTime}ms linear`,
          opacity: isOutOfBounds ? 0 : 1
        }}
      >
        <CursorSVG width={20} height={18} color={color} />
        <div className="cursor-label" style={{ backgroundColor: color }}>
          {userId}
        </div>
      </div>

      {isOutOfBounds && (
        <div
          className="edge-indicator"
          style={{
            position: 'fixed',
            transform: `translate(${edgeX}px, ${edgeY}px)`,
            transition: `transform ${transitionTime}ms linear`
            // ...position
          }}
        >
          <div
            className="indicator-dot"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: color
            }}
          />
        </div>
      )}
    </>
  )
}
