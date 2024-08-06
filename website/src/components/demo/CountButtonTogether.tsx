import { useStateTogether } from 'react-together'

export default function CountButtonTogether() {
  const [count, set_count] = useStateTogether('count', 0)
  return (
    <div className='flex flex-col align-items-center'>
      <button
        className='bg-slate-400 py-2 px-4 rounded-md text-white'
        onClick={() => set_count((prev) => (prev === undefined ? 1 : prev + 1))}
        onContextMenu={(e) => {
          e.preventDefault()
          set_count(0)
        }}
      >
        Count: {count}
      </button>
      <p style={{ color: '#888888', fontSize: '0.7rem' }}>Right click to reset to zero</p>
    </div>
  )
}
