import { useEffect, useRef } from 'react'
import { useStateTogetherWithPerUserValues } from '../hooks'

export interface Cursor {
  pageX: number
  pageY: number
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

  useEffect(() => {
    // Add event listener to the document
    const handleMouseMove = (event: MouseEvent | Touch) => {
      const updateCursor = () => {
        const pageX = event.pageX
        const pageY = event.pageY
        const percentX = pageX / document.body.scrollWidth
        const percentY = pageY / document.body.scrollHeight
        setMyCursor({
          pageX,
          pageY,
          percentX,
          percentY
        })
        throttledEventsRef.current = 0
      }

      // Make sure updateCursor is called at most every THROTTLE_TIME ms
      // If the current event is too close to the last one, we schedule
      // the update.
      const now = Date.now()
      if (now - lastUpdateRef.current < throttleTime) {
        // console.log('throttling')
        throttledEventsRef.current++
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        const delta = throttleTime - (now - lastUpdateRef.current)
        timeoutRef.current = setTimeout(() => {
          updateCursor()
          lastUpdateRef.current = Date.now()
        }, delta)
        return
      }
      lastUpdateRef.current = now
      updateCursor()
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

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [setMyCursor, deleteOnLeave, throttleTime])

  return { myCursor, allCursors }
}
