interface CursorSVGProps {
  color: string
}

export default function CursorSVG({ color }: CursorSVGProps) {
  return (
    <svg
      width={20}
      height={18}
      viewBox="0 0 12 18"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" />
    </svg>
  )
}
