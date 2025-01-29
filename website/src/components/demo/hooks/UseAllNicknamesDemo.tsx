import { useAllNicknames, useConnectedUsers } from 'react-together'

export function UseAllNicknamesDemo() {
  const allNicknames = useAllNicknames()
  const connectedUsers = useConnectedUsers()

  return (
    <div>
      <strong>All Nicknames:</strong>
      <ul>
        {connectedUsers.map(({ userId }) => (
          <li key={userId}>
            {userId}: {allNicknames[userId]}
          </li>
        ))}
      </ul>
    </div>
  )
}
