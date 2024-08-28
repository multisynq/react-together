import { useStateTogether } from 'react-together'

export default function CountButtonTogether() {
  const [count, set_count] = useStateTogether('count', 0)
  return (
    <div>
      <button
        className="bg-neutral-500 py-1 px-3 rounded"
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
    </div>
  )
}
