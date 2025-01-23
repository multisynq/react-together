import { useConnectedUsers } from 'react-together'

export function UseConnectedUsersDemo() {
  const connectedUsers = useConnectedUsers()

  return (
    <div>
      Connected users:
      <ul>
        {connectedUsers.map(({ userId, nickname, isYou }) => (
          <li key={userId}>
            {isYou ? (
              <strong>
                {userId}: {nickname}
              </strong>
            ) : (
              <span>
                {userId}: {nickname}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
