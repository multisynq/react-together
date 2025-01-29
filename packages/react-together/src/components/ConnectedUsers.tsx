import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useConnectedUsers } from '../hooks'

interface UserAvatarProps {
  nickname: string
}
function UserAvatar({ nickname }: UserAvatarProps) {
  return (
    <Avatar
      image={`https://api.dicebear.com/8.x/initials/svg?seed=${nickname}`}
      size="normal"
      shape="circle"
      label={nickname}
      pt={{ root: { title: nickname } }}
    />
  )
}

type ConnectedUsersProps = {
  maxAvatars?: number
  debug?: boolean
}
export default function ConnectedUsers({
  maxAvatars = 3
}: ConnectedUsersProps) {
  const users = useConnectedUsers()

  const size = 'normal'
  const nAvatars = Math.max(users.length - (maxAvatars - 1), 0)

  return (
    <>
      <AvatarGroup pt={{ root: { style: { gap: '10px' } } }}>
        {users.slice(0, maxAvatars - 1).map(({ nickname, userId }) => (
          <UserAvatar key={userId} nickname={nickname} />
        ))}
        {nAvatars > 0 &&
          (nAvatars === 1 ? (
            <UserAvatar nickname={users[users.length - 1].nickname} />
          ) : (
            <Avatar label={`+${nAvatars}`} shape="circle" size={size} />
          ))}
      </AvatarGroup>
    </>
  )
}
