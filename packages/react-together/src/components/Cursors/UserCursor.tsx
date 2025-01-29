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
  const allNicknames = useAllNicknames()
  const nickname = allNicknames[userId]

  // Calculate the cursor position on the local page
  // We need to keep track of the window dimensions and scroll position
  // to calculate the cursor position on the local viewport
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [scrollX, setScrollX] = useState(window.scrollX)
  const [scrollY, setScrollY] = useState(window.scrollY)

  // Listen to window scroll and resize events
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

  // Horizontal coordinate is derived from the percentX value
  const pageX = percentX * document.body.scrollWidth
  const clientX = pageX - scrollX

  // Vertical coordinate is derived from the pageY value
  const clientY = pageY - scrollY

  // Check if cursor is out of bounds
  const isOutOfBounds =
    clientX < 0 ||
    clientX > windowWidth ||
    clientY < 0 ||
    clientY > windowHeight

  // Calculate edge position and direction
  // This padding avoids the cursor from being too close to the edge of the viewport
  const padding = 15
  const boundedX = Math.max(padding, Math.min(windowWidth - padding, clientX))
  const boundedY = Math.max(padding, Math.min(windowHeight - padding, clientY))

  // Track label dimensions to position it according to its size
  // So that the label does not overflow the viewport
  const labelRef = useRef<HTMLDivElement>(null)
  const [labelDimensions, setLabelDimensions] = useState({
    width: 0,
    height: 0
  })
  useEffect(() => {
    if (labelRef.current) {
      const { width, height } = labelRef.current.getBoundingClientRect()
      setLabelDimensions({ width, height })
    }
  }, [userId, nickname, scrollX, scrollY]) // Re-measure when userId changes as it affects label size
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
      clientX +
        defaultPosition.left +
        labelDimensions.width +
        overflowTolerance >
      windowWidth
    // Check if label would overflow bottom edge
    const wouldOverflowBottom =
      clientY +
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
  }, [clientX, clientY, windowWidth, windowHeight, labelDimensions])

  // Get cursor color
  const color = getUserColor(userId)

  return (
    <>
      <div
        className="user-cursor-container"
        style={{
          transform: `translate(${boundedX}px, ${boundedY}px)`,
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
              {nickname ?? userId}
            </div>
          </>
        )}
      </div>
    </>
  )
}
