export function MenuContent({ label, labelContent, handleClose, ActionButton }) {
  return (
    <div className='bg-blue-50 w-[24rem] rounded-2xl border-neutral-900 border flex flex-col gap-3 px-5 py-3 shadow-button'>
      <button className='button-secondary w-[2.5rem]' onClick={() => handleClose(true)}>
        <span className='font-extrabold'>X</span>
      </button>
      <div className='flex items-center gap-2'>
        <span className='tracking-tight font-bold'>{`${label}:`}</span>
        <div className='flex items-center border rounded-3xl border-neutral-900 gap-2 w-full bg-white shadow-button'>
          <span className='ml-3 w-full font-bold tracking-tight text-sm'>{`${labelContent}`}</span>
          <button className='py-1 px-3 bg-neutral-500 text-neutral-50 border border-neutral-900 hover:bg-neutral-400 rounded-full m-[-1px]'>
            <span className='tracking-tight font-extrabold'>Copy</span>
          </button>
        </div>
      </div>
      {ActionButton}
    </div>
  )
}
