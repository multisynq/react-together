import { useMouse } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useMyId, useStateTogetherWithPerUserValues } from 'react-together'
import { Cursor } from './Cursor'

function getUserColor(userId: string) {
  const COLORS = [
    '#E57373',
    '#9575CD',
    '#4FC3F7',
    '#81C784',
    '#FFF176',
    '#FF8A65',
    '#F06292',
    '#7986CB'
  ]

  return COLORS[userId.charCodeAt(0) % COLORS.length]
}

export function Canvas() {
  const [mouse] = useMouse<HTMLDivElement>()
  const myId = useMyId()
  const [, setMyCursor, allCursors] = useStateTogetherWithPerUserValues(
    'cursors',
    {
      x: mouse.x,
      y: mouse.y
    }
  )

  useEffect(() => {
    setMyCursor({ x: mouse.x, y: mouse.y })
  }, [setMyCursor, mouse.x, mouse.y])

  return (
    <>
      {Object.entries(allCursors).map(
        ([userId, cursor]) =>
          userId !== myId && (
            <Cursor
              key={userId}
              x={cursor.x}
              y={cursor.y}
              color={getUserColor(userId)}
            />
          )
      )}
    </>
  )
}
