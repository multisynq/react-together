import { useState } from 'react'
import { MenuContent } from './MenuContent'

export function CreateSession({ label, labelContent }) {
  const [isClosed, setIsClosed] = useState(false)
  return (
    <div className='flex gap-2 flex-col items-end'>
      {!isClosed && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <MenuContent
            label={label}
            labelContent={labelContent}
            handleClose={setIsClosed}
            ActionButton={
              <button className='button-primary'>
                <span className='font-extrabold tracking-tight'>Create Session</span>
              </button>
            }
          />
        </div>
      )}
      <button className='gap-2 items-center px-4 w-[10rem] button-primary flex justify-center' onClick={() => setIsClosed((prev) => !prev)}>
        <span className='font-extrabold tracking-tight'>Create Session</span>
      </button>
    </div>
  )
}
