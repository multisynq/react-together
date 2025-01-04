import { useMyId, useStateTogetherWithPerUserValues } from 'react-together'

export function CountPerUser() {
  const myId = useMyId()
  const [count, set_count, allValues] =
    useStateTogetherWithPerUserValues<number>('countPerUser', 0, {
      // keepValues: false
      // resetOnConnect: true,
      // resetOnDisconnect: true
      omitLocalValue: true
    })
  console.log(Object.keys(allValues))
  return (
    <>
      <strong>You ({myId}): </strong>
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
        {Object.entries(allValues).map(([key, count]) => (
          <li key={key}>
            {key}: {count}
          </li>
        ))}
      </ul>
    </>
  )
}
