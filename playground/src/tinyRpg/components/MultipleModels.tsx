import { useState } from 'react'
import {
  useModelRoot,
  usePublish,
  useStateTogether,
  useSubscribe
} from 'react-together'
import { OverrideModel } from '../models'
import TinyRpgTogether from './TinyRpgTogether'

export function MultipleModels() {
  const [count, setCount] = useStateTogether('count', 0)
  const rootModel = useModelRoot<OverrideModel>()!

  const counterModel = rootModel.counter
  const [counter, setCounter] = useState(counterModel.count)

  useSubscribe('count', 'update', () => setCounter(counterModel.count))
  const publishReset = usePublish((d) => [counterModel.id, 'reset', d])
  return (
    <>
      <div className="flex justify-center gap-5 mt-5">
        <div>
          <h6>
            <pre>Croquet.Model </pre>Auto-Counter
          </h6>
          <div className="text-xs text-neutral-500">Click to reset</div>
          <button className="text-xl" onClick={() => publishReset()}>
            {counter}
          </button>
        </div>
        <div>
          <h6>
            <pre>useStateTogether</pre> Counter
          </h6>
          <div className="text-xs text-neutral-500">
            Click to increment / Right click to reset
          </div>
          <button
            className="text-xl"
            onClick={() => setCount((p) => (p ? p + 1 : 1))}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setCount(0)
            }}
          >
            {count}
          </button>
        </div>
      </div>
      <TinyRpgTogether />
    </>
  )
}
