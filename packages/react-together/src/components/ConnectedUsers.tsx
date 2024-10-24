import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useConnectedUsers } from '../hooks'

interface UserAvatarProps {
  name: string
}
function UserAvatar({ name }: UserAvatarProps) {
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

type ConnectedUsersProps = {
  maxAvatars?: number
  debug?: boolean
}
export default function ConnectedUsers({
  maxAvatars = 3,
  debug = false
}: ConnectedUsersProps) {
  const users = useConnectedUsers()

  const size = 'normal'
  const nAvatars = Math.max(users.length - (maxAvatars - 1), 0)

  return (
    <>
      <AvatarGroup pt={{ root: { style: { gap: '10px' } } }}>
        {users.slice(0, maxAvatars - 1).map(({ name, userId }) => (
          <UserAvatar key={userId} name={name} />
        ))}
        {nAvatars > 0 &&
          (nAvatars === 1 ? (
            <UserAvatar name={users[users.length - 1].name} />
          ) : (
            <Avatar label={`+${nAvatars}`} shape="circle" size={size} />
          ))}
      </AvatarGroup>
      {debug && (
        <div style={{ textAlign: 'left' }}>
          <p>Connected users:</p>
          <ul>
            {users.map(({ userId, name, isYou }) => (
              <li key={userId}>
                {isYou ? (
                  <strong>
                    {userId}: {name}
                  </strong>
                ) : (
                  <span>
                    {userId}: {name}
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
