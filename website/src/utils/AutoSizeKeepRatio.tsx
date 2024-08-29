import { useCallback, useEffect, useRef, useState } from 'react'

export function AutoSizeKeepRatio({ children, maxWidth, maxHeight, wrapStyle }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const [scale, setScale] = useState(1)

  const doResize = useCallback(() => {
    if (!wrapperRef.current || !contentRef.current) return

    const wd = wrapperRef.current.clientWidth
    const ht = wrapperRef.current.clientHeight

    const newScale = Math.min(wd / maxWidth, ht / maxHeight)

    setScale(newScale)
  }, [maxWidth, maxHeight])

  useEffect(() => {
    doResize()

    const resizeObserver = new ResizeObserver(doResize)
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current)
    }

    return () => {
      if (wrapperRef.current) {
        resizeObserver.unobserve(wrapperRef.current)
      }
    }
  }, [doResize])

  const wrapStl = wrapStyle || {}

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...wrapStl,
      }}
    >
      <div
        ref={contentRef}
        style={{
          // position: 'absolute',
          position: 'relative',
          left: '50%',
          top: '50%',
          width: maxWidth,
          height: maxHeight,
          transformOrigin: 'center center',
          transform: `translate(-50%, -50%) scale(${scale})`,
          // background: 'red',
        }}
      >
        {children}
      </div>
    </div>
  )
}
