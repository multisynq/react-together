import { useViewId } from '@croquet/react'
import ColorHash from 'color-hash'
import { useHoveringUsers } from '../hooks'

const colorHash = new ColorHash()

type PresenceDivProps = {
  rtKey: string
  children: ReactChildren
  className?: string
  highlightMyself?: boolean
}
export default function PresenceDiv({
  rtKey,
  children,
  className,
  highlightMyself = false
}: PresenceDivProps) {
  const debug = false
  const [ref, hoveringUsers, isHovering] = useHoveringUsers(rtKey)
  const myId = useViewId()

  let style = {}
  const users = highlightMyself
    ? hoveringUsers
    : hoveringUsers.filter((v) => v !== myId)
  if (users.length > 0 || (highlightMyself && isHovering)) {
    const color = colorHash.hex(users[0] ?? rtKey)
    style = {
      outline: `2px solid ${color}`,
      animation: 'clippath 3s linear infinite',
      borderRadius: '10px'
    }
  }

  return (
    <>
      <div ref={ref} style={style} {...{ className }}>
        {children}
      </div>
      {debug && (
        <>
          <h5>Hovering Ids:</h5>
          <ul>
            {hoveringUsers.map((user) => (
              <li key={user}>
                {user === myId && !highlightMyself ? (
                  <s className="line-through">{user}</s>
                ) : (
                  user
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
