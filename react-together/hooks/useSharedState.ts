import { Session, View } from '@croquet/react'
import { CroquetContext } from '@croquet/react/dist/components/CroquetContext'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import { isFunction } from './types'

// Determines the new state value
function getNewValue<T>(prev: T, newValueOrFn: SetStateAction<T>) {
  let newValue: T
  if (isFunction(newValueOrFn)) {
    newValue = newValueOrFn(prev)
  } else {
    newValue = newValueOrFn
  }
  return newValue
}

export default function useSharedState<T>(
  rtid: string,
  initial_value: T
): [T, Dispatch<SetStateAction<T>>] {
  // If we are in a session, return the shared state
  // otherwise, act as a normal useState

  const context = useContext(CroquetContext)
  let model: null | ReactTogetherModel = null
  let session: null | Session = null
  let view: null | View = null
  const insideCroquetSession = context !== undefined
  if (insideCroquetSession) {
    model = context.model as ReactTogetherModel
    session = context.session
    view = context.view
  }
  const modelValue = model?.state.get(rtid) as T

  // This is the local state
  const [value, set_value] = useState<T>(modelValue || initial_value)

  if (view && model && session) {
    // @ts-expect-error: We know session has an id
    view.subscribe(session.id, 'react-updated', () => {
      const newValue = model.state.get(rtid) as T
      set_value(newValue)
    })
  }

  const setter = useCallback(
    (newValueOrFn: SetStateAction<T>): void => {
      if (model && view) {
        // Eventually we will want to throttle publish calls
        view.publish(model.id, 'setState', {
          id: rtid,
          newValue: getNewValue(value, newValueOrFn)
        })
      } else {
        set_value(newValueOrFn)
      }
    },
    [value, set_value, model, view, rtid]
  )

  return [value, setter]
}
