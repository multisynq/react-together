import { useStateTogether } from 'react-together'

export default function CountButtonTogether() {
  const [count, set_count] = useStateTogether('count', 0)
  return (
    <div className='flex flex-row align-items-center gap-2'>
      <button className='bg-slate-400 py-2 px-4 rounded-md text-white' onClick={() => set_count(0)}>
        <i className='pi pi-refresh'></i>
      </button>
      <button className='bg-slate-400 py-2 px-4 rounded-md text-white' onClick={() => set_count((prev) => prev + 1)}>
        Count: {count}
      </button>
    </div>
  )
}
