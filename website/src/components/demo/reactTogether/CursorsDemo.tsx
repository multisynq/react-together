import { Cursors } from 'react-together'

export function CursorsDemo() {
  return (
    <>
      <Cursors deleteOnLeave />
      <div className='h-screen w-screen px-4 text-center flex items-center justify-center'>
        <h6 className='text-lg font-bold'>Move your cursor in this area to broadcast it to other users</h6>
      </div>
    </>
  )
}
