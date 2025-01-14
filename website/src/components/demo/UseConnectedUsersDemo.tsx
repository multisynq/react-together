import { useConnectedUsers } from 'react-together'

export function UseConnectedUsersDemo() {
  const connectedUsers = useConnectedUsers()

  return (
    <div>
      Connected users:
      <ul>
        {connectedUsers.map(({ userId, name, isYou }) => (
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
  )
}
