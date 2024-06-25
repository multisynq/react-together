import { useSharedState } from '../../react-together'

export default function SharedCountButton() {
  const [count, set_count] = useSharedState('count', 0)
  return (
    <>
      <button
        onClick={() => set_count((prev) => prev + 1)}
        onContextMenu={(e) => {
          e.preventDefault()
          set_count(0)
        }}
      >
        Count: {count}
      </button>
      <p style={{ color: '#888888', fontSize: '0.7rem' }}>
        Left click to reset
      </p>
    </>
  )
}
