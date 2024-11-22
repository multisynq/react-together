import { useMyId, useStateTogetherWithPerUserValues } from 'react-together'

export default function CountPerUser() {
  const myId = useMyId()
  const [count, set_count, allValues] =
    useStateTogetherWithPerUserValues<number>('countPerUser', 0, {
      resetOnDisconnect: true
    })
  return (
    <>
      <strong>My count:</strong>
      <button
        onClick={() => set_count((p) => p + 1)}
        className="bg-neutral-500 py-1 px-3 rounded"
        onContextMenu={(e) => {
          e.preventDefault()
          set_count(0)
        }}
      >
        {count}
      </button>
      <ul>
        {Object.entries(allValues)
          .filter(([userId]) => userId !== myId)
          .map(([userId, count]) => (
            <li key={userId}>
              {userId}: {count}
            </li>
          ))}
      </ul>
    </>
  )
}
