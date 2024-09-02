import { useCroquetContext } from '@croquet/react'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import getNewValue from './getNewValue'

interface UseStateTogetherOptions {}

export default function useStateTogether<T>(
  rtKey: string,
  initialValue: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: UseStateTogetherOptions = {}
): [T, Dispatch<SetStateAction<T>>] {
  // If a session is active, it uses the shared state from the session by
  // subscribing to updates and publishing changes.
  // If no session is active, it behaves like a normal useState hook,
  // maintaining local state only.

  const { session, view, model } = useCroquetContext<ReactTogetherModel>()

  const [value, set_value] = useState<T>(() => {
    // This function runs only during the initial render.
    // If the key does not exist in the model's state, it publishes the initial value.
    // Otherwise, it retrieves and returns the existing value from the model's state.
    if (!view || !model) return initialValue
    if (!model.state.has(rtKey)) {
      view.publish(model.id, 'setState', { id: rtKey, newValue: initialValue })
      return initialValue
    }
    return model.state.get(rtKey) as T
  })

  useEffect(() => {
    if (!session || !view || !model) return

    const handler = () => {
      set_value((prev) => {
        if (!model.state.has(rtKey)) {
          view.publish(model.id, 'setState', { id: rtKey, newValue: prev })
          return prev
        }
        const newValue = model.state.get(rtKey) as T
        return prev === newValue ? prev : newValue
      })
    }
    view.subscribe(
      rtKey,
      { event: 'updated', handling: 'oncePerFrame' },
      handler
    )
    handler()
    return () => view.unsubscribe(rtKey, 'updated', handler)
  }, [session, view, model, rtKey, set_value])

  const setter = useCallback(
    (newValueOrFn: SetStateAction<T>): void => {
      if (model && view) {
        // Eventually we will want to throttle publish calls
        const oldValue = model.state.get(rtKey) as T
        view.publish(model.id, 'setState', {
          id: rtKey,
          newValue: getNewValue(oldValue, newValueOrFn)
        })
      } else {
        set_value(newValueOrFn)
      }
    },
    [set_value, model, view, rtKey]
  )

  return [value, setter]
}
