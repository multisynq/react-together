import { useEffect, useRef } from 'react'
import { useStateTogetherWithPerUserValues } from '../hooks'

export interface Cursor {
  pageX: number
  pageY: number
  clientX: number
  clientY: number
  percentX: number
  percentY: number
}

interface UseCursorsReturn {
  myCursor: Cursor | null
  allCursors: Record<string, Cursor | null>
}

export interface UseCursorsOptions {
  throttleTime?: number
  deleteOnLeave?: boolean
  omitMyValue?: boolean
}
export default function useCursors(
  options: UseCursorsOptions = {}
): UseCursorsReturn {
  const {
    throttleTime = 50,
    deleteOnLeave = false,
    omitMyValue = true
  } = options
  const [myCursor, setMyCursor, allCursors] =
    useStateTogetherWithPerUserValues<Cursor | null>('__cursors', null, {
      omitMyValue
    })
  const lastUpdateRef = useRef<number>(0)
  const timeoutRef = useRef<Timer | null>(null)
  const throttledEventsRef = useRef<number>(0)
  const lastCursorRef = useRef<Cursor | null>(null)

  useEffect(() => {
    // Add event listener to the document
    const updateCursor = (cursor: Cursor) => {
      lastCursorRef.current = cursor

      const doUpdate = () => {
        setMyCursor(cursor)
        throttledEventsRef.current = 0
      }

      // Make sure updateCursor is called at most every THROTTLE_TIME ms
      // If the current event is too close to the last one, we schedule
      // the update.
      const now = Date.now()
      if (now - lastUpdateRef.current < throttleTime) {
        throttledEventsRef.current++
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        const delta = throttleTime - (now - lastUpdateRef.current)
        timeoutRef.current = setTimeout(() => {
          doUpdate()
          lastUpdateRef.current = Date.now()
        }, delta)
        return
      }
      lastUpdateRef.current = now
      doUpdate()
    }
    const handleMouseMove = (event: MouseEvent | Touch) => {
      updateCursor({
        pageX: event.pageX,
        pageY: event.pageY,
        clientX: event.clientX,
        clientY: event.clientY,
        percentX: event.pageX / document.body.scrollWidth,
        percentY: event.pageY / document.body.scrollHeight
      })
    }

    const handleMouseLeave = () => {
      if (deleteOnLeave) {
        setMyCursor(null)
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      // Handling just the first touch point
      const touch = event.touches[0]
      if (touch) {
        handleMouseMove(touch)
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      // Handling just the first touch point
      const touch = event.touches[0]
      if (touch) {
        handleMouseMove(touch)
      }
    }

    const handleScroll = () => {
      if (lastCursorRef.current) {
        const pageX = lastCursorRef.current.clientX + window.scrollX
        const pageY = lastCursorRef.current.clientY + window.scrollY
        const clientX = lastCursorRef.current.clientX
        const clientY = lastCursorRef.current.clientY
        const percentX = pageX / document.body.scrollWidth
        const percentY = pageY / document.body.scrollHeight
        updateCursor({
          pageX,
          pageY,
          clientX,
          clientY,
          percentX,
          percentY
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [setMyCursor, deleteOnLeave, throttleTime])

  return { myCursor, allCursors }
}
