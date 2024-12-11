import { useStateTogetherWithPerUserValues } from 'react-together'

interface CountPerUserProps {
  username: string
}
export function CountPerUser({ username }: CountPerUserProps) {
  const [count, set_count, allValues] =
    useStateTogetherWithPerUserValues<number>('countPerUser', 0, {
      // keepValues: true,
      // resetOnConnect: true,
      // resetOnDisconnect: true,
      // overwriteSessionValue: true
      //
      keyOverride: username
    })
  return (
    <>
      {/* <strong>{username}: </strong> */}
      <span>My value:</span>
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
          .filter(([userId]) => userId !== username)
          .map(([key, count]) => (
            <li key={key}>
              {key}: {count}
            </li>
          ))}
      </ul>
    </>
  )
}
