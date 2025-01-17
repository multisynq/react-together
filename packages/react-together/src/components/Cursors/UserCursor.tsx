import { useEffect, useState } from 'react'
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

function DebugPanel(props: object) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)'
      }}
      className="text-xs border border-gray-200"
    >
      <h4 className="text-center text-xs font-bold">Debug panel</h4>
      <ul>
        {Object.entries(props).map(([key, value]) => (
          <li key={key}>
            <span className="font-bold">{key}:</span> {JSON.stringify(value)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function UserCursor({
  userId,
  percentX,
  pageY,
  transitionTime = 100,
  getUserColor = defaultGetUserColor
}: UserCursorProps) {
  const bodyWidth = document.body.scrollWidth

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [scrollX, setScrollX] = useState(window.scrollX)
  const [scrollY, setScrollY] = useState(window.scrollY)

  // Listen to window scroll and resize
  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX)
      setScrollY(window.scrollY)
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const color = getUserColor(userId)

  // Convert X position to absolute position
  // Use original Y absolute position
  const bodyX = percentX * bodyWidth
  const bodyY = pageY

  const windowX = bodyX - scrollX
  const windowY = bodyY - scrollY

  // Check if cursor is out of bounds
  const isOutOfBounds =
    windowX < 0 ||
    windowX > windowWidth ||
    windowY < 0 ||
    windowY > windowHeight

  // Calculate edge position and direction
  const padding = 15 // 20
  const edgeX = Math.max(padding, Math.min(windowWidth - padding, windowX))
  const edgeY = Math.max(padding, Math.min(windowHeight - padding, windowY))

  return (
    <>
      <DebugPanel
        {...{ bodyX, bodyY, scrollX, scrollY, edgeX, edgeY, isOutOfBounds }}
      />
      <div
        className="user-cursor-container"
        style={{
          transform: `translate(${edgeX}px, ${edgeY}px)`,
          transition: `transform ${transitionTime}ms linear`
        }}
      >
        {isOutOfBounds ? (
          <div
            className="indicator-dot"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: color
            }}
          />
        ) : (
          <>
            <CursorSVG width={20} height={18} color={color} />
            <div className="cursor-label" style={{ backgroundColor: color }}>
              {userId}
            </div>
          </>
        )}
      </div>
    </>
  )
}
