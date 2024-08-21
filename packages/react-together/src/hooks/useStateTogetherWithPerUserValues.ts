import { CroquetContext, Session, View } from '@croquet/react'
import hash_fn, { NotUndefined } from 'object-hash'
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

function mapToObject<T>(map: Map<string, T>): { [id: string]: T } {
  const obj: { [id: string]: T } = {}
  map.forEach((val, id) => (obj[id] = val))
  return obj
}

export default function useStateTogetherWithPerUserValues<
  T extends NotUndefined
>(
  rtKey: string,
  initial_value: T
): [T, Dispatch<SetStateAction<T>>, { [id: string]: T }] {
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
  const viewId = view?.viewId || ''
  const [allValuesState, setAllValuesState] = useState<{
    value: Map<string, T>
    hash: string
  }>(() => {
    const value = (model?.stateTogether.get(rtKey) ||
      new Map([[viewId, initial_value]])) as Map<string, T>
    const hash = hash_fn(value)
    return { value, hash }
  })

  const { value: allValues } = allValuesState

  useEffect(() => {
    if (!session || !view || !model || !viewId) return

    const handler = () => {
      const newValues = model.stateTogether.get(rtKey) as Map<string, T>
      const newHash = hash_fn(newValues)

      setAllValuesState((prev) =>
        prev.hash === newHash ? prev : { value: newValues, hash: newHash }
      )
    }

    view.subscribe(
      rtKey,
      { event: 'updated', handling: 'oncePerFrame' },
      handler
    )

    // We need to unconditionally set the initial value to
    // avoid race conditions between the cleanup function and
    // the next call to this hook:
    // After the cleanup function publishes { ..., newValue: undefined }
    // the model may take some time to make that update
    // Meanwhile, the next call to this hook may read the previous value,
    // which will be removed when the model processes the cleanup request
    view.publish(model.id, 'setStateTogether', {
      id: rtKey,
      viewId,
      newValue: initial_value
    })

    return () => {
      // Delete view value
      view.publish(model.id, 'setStateTogether', {
        id: rtKey,
        viewId,
        newValue: undefined
      })

      // @ts-expect-error we know unsubscribe receives a handler
      view.unsubscribe(rtKey, 'updated', handler)
    }
  }, [session, view, viewId, model, rtKey, initial_value])

  const localValue = allValues.get(viewId) || initial_value

  const setter = useCallback(
    (newValueOrFn: SetStateAction<T>): void => {
      if (model && view) {
        // If in a React Together session,
        // calculate and publish the next value
        const allValues = model.stateTogether.get(rtKey) as Map<string, T>
        const prevValue = allValues.get(view.viewId)!
        const newValue = getNewValue<T>(prevValue, newValueOrFn)

        view.publish(model.id, 'setStateTogether', {
          id: rtKey,
          viewId,
          newValue
        })
      } else {
        // If outside a React Together session,
        // calculate the new value and set it locally
        // Here we are calculating the hash to maintain
        // the same state interface
        setAllValuesState((prev) => {
          const { value, hash } = prev
          const newValue = getNewValue(value.get('')!, newValueOrFn)
          const newHash = hash_fn(newValue)
          if (hash === newHash) {
            return prev
          } else {
            value.set('', newValue)
            return { value, hash: newHash }
          }
        })
      }
    },
    [view, viewId, model, rtKey]
  )

  return [localValue, setter, mapToObject(allValues)]
}
