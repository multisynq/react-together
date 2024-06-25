import { useId, useState } from 'react'

function ID() {
  const id = useId()
  return <div>ID: {id}</div>
}

// This component was used to test if the id stays the same
// across multiple renders (based only on the component path)
export default function TestId() {
  const [wrapped, setWrapped] = useState(false)

  return (
    <div onClick={() => setWrapped((prev) => !prev)}>
      {wrapped ? <div>{<ID />}</div> : <ID />}
    </div>
  )
}
