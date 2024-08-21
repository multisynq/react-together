import { CroquetContext, Session, View } from '@croquet/react'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import getNewValue from './getNewValue'

export default function useStateTogether<T>(
  rtKey: string,
  initial_value: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options?: Record<string, unknown>
): [T, Dispatch<SetStateAction<T>>] {
  // If we are in a session, return the shared state
  // otherwise, act as a normal useState

  // Accessing CroquetContext directly because
  // we may not be inside a Croquet session
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
  const modelValue = model?.state.get(rtKey) as T

  // This is the local state
  const [value, set_value] = useState<T>(
    modelValue !== undefined ? modelValue : initial_value
  )

  useEffect(() => {
    if (view && model && session) {
      const handler = () => {
        const newValue = model.state.get(rtKey) as T
        set_value((prev) => (prev === newValue ? prev : newValue))
      }
      view.subscribe(
        // @ts-expect-error: We know session has an id
        session.id,
        {
          event: 'react-updated',
          handling: 'oncePerFrame'
        },
        handler
      )
      return () => {
        try {
          // @ts-expect-error: We know session has an id
          view.unsubscribe(session.id, 'react-updated', handler)
        } catch (error) {
          console.error('Failed to unsubscribe:', error)
        }
      }
    }
  }, [session, view, model, rtKey, set_value])

  const setter = useCallback(
    (newValueOrFn: SetStateAction<T>): void => {
      if (model && view) {
        // Eventually we will want to throttle publish calls
        const oldValue = model.state.get(rtKey)! as T
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
