import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useConnectedViews } from '../hooks'

interface ViewAvatarProps {
  name: string
}
function ViewAvatar({ name }: ViewAvatarProps) {
  return (
    <Avatar
      image={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`}
      size="normal"
      shape="circle"
      label={name}
      pt={{ root: { title: name } }}
    />
  )
}

type ConnectedViewsProps = {
  maxAvatars?: number
  debug?: boolean
}
export default function ConnectedViews({
  maxAvatars = 3,
  debug = false
}: ConnectedViewsProps) {
  const users = useConnectedViews()

  if (!users) return

  const size = 'normal'
  const nAvatars = Math.max(users.length - (maxAvatars - 1), 0)

  return (
    <>
      <AvatarGroup pt={{ root: { style: { gap: '10px' } } }}>
        {users.slice(0, maxAvatars - 1).map(({ name, viewId }) => (
          <ViewAvatar key={viewId} name={name} />
        ))}
        {nAvatars > 0 &&
          (nAvatars === 1 ? (
            <ViewAvatar name={users[users.length - 1].name} />
          ) : (
            <Avatar label={`+${nAvatars}`} shape="circle" size={size} />
          ))}
      </AvatarGroup>
      {debug && (
        <div style={{ textAlign: 'left' }}>
          <p>Connected users:</p>
          <ul>
            {users.map(({ viewId, name, isYou }) => (
              <li key={viewId}>
                {isYou ? (
                  <strong>
                    {viewId}: {name}
                  </strong>
                ) : (
                  <span>
                    {viewId}: {name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
