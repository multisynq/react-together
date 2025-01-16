import { useEffect, useRef } from 'react'
import { useStateTogetherWithPerUserValues } from 'react-together'
import { Cursor } from './Cursor'

function getUserColor(userId: string) {
  const COLORS = [
    '#E57373',
    '#9575CD',
    '#4FC3F7',
    '#81C784',
    '#FFF176',
    '#FF8A65',
    '#F06292',
    '#7986CB'
  ]

  return COLORS[userId.charCodeAt(0) % COLORS.length]
}

interface Mouse {
  pageX: number
  pageY: number
  percentX: number
  percentY: number
}

/*
TO DO:
 - Scroll
 - Touch
 - Add `ref` parameter to do something related to that ref
  - Other configs that may come out of this
*/

export function Canvas() {
  // Options
  const THROTTLE_TIME = 55
  const deleteOnLeave = true
  const deleteOnTouchEnd = true

  const [mouse, setMyCursor, allCursors] =
    useStateTogetherWithPerUserValues<Mouse | null>('cursors', null, {
      omitMyValue: true
    })
  const lastUpdateRef = useRef<number>(0)
  const timeoutRef = useRef<Timer | null>(null)

  useEffect(() => {
    // Add event listener to the document
    // const handleMouseMove = (event: MouseEvent | Touch) => {
    //   console.log('handleMouseMove', event)
    //   const updateCursor = () => {
    //     const pageX = event.pageX
    //     const pageY = event.pageY
    //     const percentX = pageX / window.innerWidth
    //     const percentY = pageY / window.innerHeight
    //     setMyCursor({
    //       pageX,
    //       pageY,
    //       percentX,
    //       percentY
    //     })
    //   }

    //   // Make sure updateCursor is called at most every THROTTLE_TIME ms
    //   // If the current event is too close to the last one, we schedule
    //   // the update.
    //   const now = Date.now()
    //   if (now - lastUpdateRef.current < THROTTLE_TIME) {
    //     if (timeoutRef.current) {
    //       clearTimeout(timeoutRef.current)
    //     }

    //     const delta = THROTTLE_TIME - (now - lastUpdateRef.current)
    //     timeoutRef.current = setTimeout(updateCursor, delta)
    //     return
    //   }
    //   lastUpdateRef.current = now
    //   updateCursor()
    // }

    // const handleMouseLeave = () => {
    //   console.log('handleMouseLeave')
    //   if (deleteOnLeave) {
    //     setMyCursor(null)
    //   }
    // }

    // const handleTouchMove = (event: TouchEvent) => {
    //   console.log('handleTouchMove', event)
    //   // Handling just the first touch point
    //   const touch = event.touches[0]
    //   if (touch) {
    //     handleMouseMove(touch)
    //   }
    // }

    // const handleTouchEnd = () => {
    //   console.log('handleTouchEnd')
    //   if (deleteOnTouchEnd) {
    //     setMyCursor(null)
    //   }
    // }

    // const handleTouchCancel = () => {
    //   console.log('handleTouchCancel')
    //   handleTouchEnd()
    // }

    // document.addEventListener('mousemove', handleMouseMove)
    // document.addEventListener('mouseleave', handleMouseLeave)
    // document.addEventListener('touchmove', handleTouchMove)
    // document.addEventListener('touchend', handleTouchEnd)
    // document.addEventListener('touchcancel', handleTouchCancel)
    // return () => {
    //   document.removeEventListener('mousemove', handleMouseMove)
    //   document.removeEventListener('mouseleave', handleMouseLeave)
    //   document.removeEventListener('touchmove', handleTouchMove)
    //   document.removeEventListener('touchend', handleTouchEnd)
    //   document.removeEventListener('touchcancel', handleTouchCancel)
    // }
    const handlePointerMove = (event: PointerEvent) => {
      // console.log('handlePointerMove', event)
      event.preventDefault()
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
      }

      // Make sure updateCursor is called at most every THROTTLE_TIME ms
      // If the current event is too close to the last one, we schedule
      // the update.
      const now = Date.now()
      if (now - lastUpdateRef.current < THROTTLE_TIME) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        const delta = THROTTLE_TIME - (now - lastUpdateRef.current)
        timeoutRef.current = setTimeout(updateCursor, delta)
        return
      }
      lastUpdateRef.current = now
      updateCursor()
    }

    const handlePointerOut = () => {
      console.log('handlePointerOut')
      if (deleteOnLeave) {
        setMyCursor(null)
      }
    }

    document.addEventListener('pointermove', handlePointerMove)
    // document.addEventListener('pointerout', handlePointerOut)
    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      // document.removeEventListener('pointerout', handlePointerOut)
    }
  }, [setMyCursor, deleteOnLeave, deleteOnTouchEnd])

  return (
    <>
      {/* Cursors container */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {Object.entries(allCursors).map(
          ([userId, cursor]) =>
            cursor && (
              <Cursor key={userId} {...cursor} color={getUserColor(userId)} />
            )
        )}
      </div>
      <div className="fixed bottom-0 left-0 text-sm pl-2">
        {`(${formatNumber(mouse?.pageX)}, ${formatNumber(mouse?.pageY)})`}
        <br />
        {`(${formatPercent(mouse?.percentX)}, ${formatPercent(mouse?.percentY)})`}
      </div>
      <div className="w-[100px] h-[500px] bg-rose-500 rounded m-auto" />
      <div className="w-[100px] h-[100px] bg-blue-500 rounded m-auto" />
    </>
  )
}

function formatNumber(number: number | undefined) {
  if (number === undefined) return 'undefined'
  return `${number.toFixed(2)}`
}

function formatPercent(percent: number | undefined) {
  if (percent === undefined) return 'undefined'
  return `${(percent * 100).toFixed(2)}%`
}
