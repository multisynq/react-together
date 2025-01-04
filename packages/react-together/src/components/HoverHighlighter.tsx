import ColorHash from 'color-hash'
import { useHoveringUsers, useMyId } from '../hooks'

const colorHash = new ColorHash()

type HoverHighlighterProps = {
  rtKey: string
  children: ReactChildren
  className?: string
  highlightMyself?: boolean
}
export default function HoverHighlighter({
  rtKey,
  children,
  className,
  highlightMyself = false
}: HoverHighlighterProps) {
  const debug = false
  const [ref, hoveringUsers, isHovering] = useHoveringUsers(rtKey)
  const myId = useMyId()

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
