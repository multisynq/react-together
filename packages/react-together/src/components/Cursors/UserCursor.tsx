import { useEffect, useMemo, useRef, useState } from 'react'
import useAllNicknames from '../../hooks/useAllNicknames'
import { Cursor } from '../../hooks/useCursors'
import { getUserColor as defaultGetUserColor } from '../../utils'
import CursorSVG from './CursorSVG'

export interface UserCursorOptions {
  transitionDuration?: number
  getUserColor?: (userId: string) => string
}

export interface UserCursorProps extends Cursor, UserCursorOptions {
  userId: string
}

export default function UserCursor({
  userId,
  percentX,
  pageY,
  transitionDuration = 100,
  getUserColor = defaultGetUserColor
}: UserCursorProps) {
  const bodyWidth = document.body.scrollWidth

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [scrollX, setScrollX] = useState(window.scrollX)
  const [scrollY, setScrollY] = useState(window.scrollY)

  const allNicknames = useAllNicknames()

  // Add state for label dimensions
  const [labelDimensions, setLabelDimensions] = useState({
    width: 0,
    height: 0
  })

  // Add ref to measure label
  const labelRef = useRef<HTMLDivElement>(null)

  const nickName = allNicknames[userId]

  // Measure label dimensions after render
  useEffect(() => {
    if (labelRef.current) {
      const { width, height } = labelRef.current.getBoundingClientRect()
      setLabelDimensions({ width, height })
    }
  }, [userId, nickName, scrollX, scrollY]) // Re-measure when userId changes as it affects label size

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
  const padding = 15
  const edgeX = Math.max(padding, Math.min(windowWidth - padding, windowX))
  const edgeY = Math.max(padding, Math.min(windowHeight - padding, windowY))

  // Calculate label position based on cursor position and label dimensions
  const labelPosition = useMemo(() => {
    const padding = 5
    const overflowTolerance = 30
    const defaultPosition = {
      left: 20, // Default position to right of cursor
      top: 20 // Default position below cursor
    }

    // Check if label would overflow right edge
    const wouldOverflowRight =
      windowX +
        defaultPosition.left +
        labelDimensions.width +
        overflowTolerance >
      windowWidth
    // Check if label would overflow bottom edge
    const wouldOverflowBottom =
      windowY +
        defaultPosition.top +
        labelDimensions.height +
        overflowTolerance >
      windowHeight

    return {
      left: wouldOverflowRight
        ? -(labelDimensions.width + padding)
        : defaultPosition.left,
      top: wouldOverflowBottom
        ? -(labelDimensions.height + padding)
        : defaultPosition.top
    }
  }, [windowX, windowY, windowWidth, windowHeight, labelDimensions])

  return (
    <>
      <div
        className="user-cursor-container"
        style={{
          transform: `translate(${edgeX}px, ${edgeY}px)`,
          transition: `transform ${transitionDuration}ms linear`
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
            <CursorSVG color={color} />
            <div
              ref={labelRef}
              className="cursor-label"
              style={{
                backgroundColor: color,
                transition: `all ${transitionDuration * 2}ms linear`,
                ...labelPosition
              }}
            >
              {nickName ?? userId}
            </div>
          </>
        )}
      </div>
    </>
  )
}
