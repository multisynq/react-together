import { PrimeIcons } from 'primereact/api'
import { useState } from 'react'
import { MenuContent } from './MenuContent'

export function SessionMenu({ label, labelContent }) {
  const [isClosed, setIsClosed] = useState(false)
  return (
    <div className='flex gap-2 flex-col items-end'>
      {!isClosed && (
        <MenuContent
          label={label}
          labelContent={labelContent}
          handleClose={setIsClosed}
          ActionButton={
            <button className='button-caution'>
              <span className='font-extrabold tracking-tight'>Leave Session</span>
            </button>
          }
        />
      )}
      <button
        className='button-secondary flex gap-2 items-center justify-center px-4 w-[8rem]'
        onClick={() => setIsClosed((prev) => !prev)}
      >
        <i className={PrimeIcons.BARS}></i>
        <span className='font-extrabold tracking-tight'>Menu</span>
      </button>
    </div>
  )
}
