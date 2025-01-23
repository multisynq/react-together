import { useCursors } from 'react-together'

export function UseCursorsDemo() {
  const { myCursor, allCursors } = useCursors({ deleteOnLeave: true })

  return (
    <div className='relative w-full h-screen overflow-hidden flex justify-center items-center'>
      {/* Render other users' cursors */}
      {Object.entries(allCursors).map(([userId, cursor]) => {
        if (!cursor) return null
        return (
          <div
            key={userId}
            className='fixed w-2 h-2 rounded-full bg-emerald-500'
            style={{
              left: cursor.pageX,
              top: cursor.pageY,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.1s linear',
            }}
          />
        )
      })}
      <p className='text-center px-4'>
        {myCursor ? (
          <>
            {myCursor.pageX} x {myCursor.pageY}
          </>
        ) : (
          <>Move your cursor to broadcast its position to other people in the room.</>
        )}
      </p>
    </div>
  )
}
