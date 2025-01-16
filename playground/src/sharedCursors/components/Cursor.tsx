interface CursorProps {
  color: string
  pageX: number
  pageY: number
  percentX: number
  percentY: number
  transitionTime?: number
}

export function Cursor({
  color,
  percentX,
  pageY,
  transitionTime = 100
}: CursorProps) {
  const windowWidth = window.innerWidth

  const cursorWidth = 20
  const cursorHeight = 18

  const x = percentX * windowWidth
  const y = pageY - window.scrollY

  return (
    <svg
      width={cursorWidth}
      height={cursorHeight}
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        transition: `transform ${transitionTime}ms linear`
      }}
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
    </svg>
  )
}
