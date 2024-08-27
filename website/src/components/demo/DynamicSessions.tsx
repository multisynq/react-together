import { PrimeIcons } from 'primereact/api'
import { useState } from 'react'

const twButton = {
  primary: 'py-1 px-2 bg-blue-500 text-neutral-50 border border-neutral-900 rounded-3xl hover:bg-blue-400 line-border',
  secondary: 'py-1 px-2 bg-neutral-500 text-neutral-50 border border-neutral-900 rounded-3xl hover:bg-neutral-400 line-border',
  accent: 'py-1 px-2 bg-red-500 text-neutral-50 border border-neutral-900 rounded-3xl hover:bg-red-400 line-border',
}

function SessionMenu({ label, labelContent }) {
  const [isClosed, setIsClosed] = useState(false)
  return (
    <div className='flex gap-2 flex-col'>
      {!isClosed && (
        <div className='bg-blue-50 w-[24rem] rounded-xl border-neutral-900 border flex flex-col gap-2 px-3 py-2'>
          <button className={`${twButton.secondary} w-[2.5rem]`} onClick={() => setIsClosed(true)}>
            X
          </button>
          <div className='flex items-center gap-2'>
            <span>{`${label}:`}</span>
            <div className='flex items-center border rounded-3xl border-neutral-900 gap-2 w-full bg-white'>
              <span className='ml-3 w-full'>{`${labelContent}`}</span>
              <button className={twButton.secondary}>Copy</button>
            </div>
          </div>
          <button className={twButton.accent}>Leave Session</button>
        </div>
      )}
      <button className={`${twButton.secondary} inline-flex gap-2 items-center px-4`} onClick={() => setIsClosed((prev) => !prev)}>
        <i className={PrimeIcons.BARS}></i>
        <span>Menu</span>
      </button>
    </div>
  )
}

export function DynamicsSession() {
  return (
    <div className='w-full h-[20rem] flex gap-2 bg-blue-300 items-end'>
      <SessionMenu label={'URL'} labelContent={'website.io/session=123abc'} />
      <div className='h-full bg-blue-800'> filler</div>
    </div>
  )
}
