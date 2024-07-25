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

function mapToObject<T>(map: Map<string, T>): { [id: string]: T } {
  const obj: { [id: string]: T } = {}
  map.forEach((val, id) => (obj[id] = val))
  return obj
}

export default function useStateTogetherWithPerUserValues<T>(
  rtid: string,
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
  const viewId = view?.viewId
  const allValues = (model?.stateTogether.get(rtid) || new Map()) as Map<
    string,
    T
  >

  // Publish initial value if undefined
  const modelValue = viewId ? allValues.get(viewId) : undefined
  if (view && model && viewId && modelValue === undefined) {
    view.publish(model.id, 'setStateTogether', {
      id: rtid,
      viewId,
      newValue: initial_value
    })
  }

  // This is the local state
  const [localValue, set_localValue] = useState<T>(modelValue || initial_value)

  useEffect(() => {
    // If we are inside a session, subscribe to react-updated events
    if (view && viewId && model && session) {
      //console.log(`useStateTogetherWithPerUserValues - react-updated viewdId=${viewId} modelId=${model.id}`)
      view.subscribe(
        // @ts-expect-error: We know session has an id
        session.id,
        {
          event: 'react-updated',
          handling: 'oncePerFrame'
        },
        () => {
          //console.log(`useStateTogetherWithPerUserValues - view.subscribe( callback ) viewId=${viewId}, modelId=${model.id}`)
          const allValues = model.stateTogether.get(rtid) as Map<string, T>
          set_localValue(allValues.get(viewId) as T)
        }
      )
    }

    return () => {
      // this code will run when the component unmounts
      if (view && model) {
        view.publish(model.id, 'setStateTogether', {
          id: rtid,
          viewId,
          newValue: undefined
        })
      }
    }
  }, [])

  const setter = useCallback(
    (newValueOrFn: SetStateAction<T>): void => {
      if (model && view) {
        view.publish(model.id, 'setStateTogether', {
          id: rtid,
          viewId,
          newValue: getNewValue(localValue, newValueOrFn)
        })
      } else {
        set_localValue(newValueOrFn)
      }
    },
    [localValue, set_localValue, rtid, viewId]
  )

  return [localValue, setter, mapToObject(allValues)]
}
