import { useEffect, useState } from 'react'
import { useConnectedUsers, useNicknames } from 'react-together'

export function UseNicknamesDemo() {
  const [nickname, setNickname, allNicknames] = useNicknames()
  const [localNickname, setLocalNickname] = useState(nickname)
  const connectedUsers = useConnectedUsers()

  useEffect(() => {
    setLocalNickname(nickname)
  }, [nickname])

  return (
    <div className='text-sm'>
      <div>
        <strong>All Nicknames:</strong>
        <ul>
          {connectedUsers.map(({ userId, isYou }) => (
            <li key={userId}>
              {userId}: {allNicknames[userId]}
              {isYou && ' (You)'}
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-4'>
        <div className='flex items-center'>
          <input
            className='border border-gray-300 rounded-md px-2 py-1'
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)}
            placeholder='Enter your nickname'
          />
          <button
            className='ml-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-xs px-2 py-1 rounded-md'
            onClick={() => setNickname(localNickname)}
            disabled={localNickname === nickname}
          >
            Change nickname
          </button>
        </div>
      </div>
    </div>
  )
}
