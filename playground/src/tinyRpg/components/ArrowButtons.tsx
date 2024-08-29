interface ButtonProps {
  onClick: () => void
  children?: React.ReactNode
}
function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-gray-200 rounded text-2xl w-12 h-12 flex items-center justify-center"
    >
      {children}
    </button>
  )
}

interface ArrowButtonsProps {
  moveCharacter: (s: string) => void
}
export default function ArrowButtons({ moveCharacter }: ArrowButtonsProps) {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <Button onClick={() => moveCharacter('w')}>↑</Button>
      <div className="flex gap-2">
        <Button onClick={() => moveCharacter('a')}>←</Button>
        <Button onClick={() => moveCharacter('s')}>↓</Button>
        <Button onClick={() => moveCharacter('d')}>→</Button>
      </div>
    </div>
  )
}
