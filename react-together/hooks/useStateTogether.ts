import { useReactModelRoot, useViewId } from '@croquet/react'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import { isFunction } from './types'

export default function useStateTogether<T>(
  id: string,
  initial_value: T
): [T, Dispatch<SetStateAction<T>>, { [id: string]: T }] {
  const viewId = useViewId()!
  const model = useReactModelRoot<ReactTogetherModel>()

  useEffect(() => {
    return () => {
      model.setStateTogether({ id, viewId, newValue: undefined })
    }
  }, [])

  const stateTogether = (model.stateTogether.get(id) || new Map()) as Map<
    string,
    T
  >
  let value = stateTogether.get(viewId)
  if (value === undefined) {
    value = initial_value
    model.setStateTogether({ id, viewId, newValue: initial_value })
  }

  const setter = useCallback((newValueOrFn: SetStateAction<T>): void => {
    let newValue: T
    if (isFunction(newValueOrFn)) {
      const prev = value
      newValue = newValueOrFn(prev)
    } else {
      newValue = newValueOrFn
    }
    model.setStateTogether<T>({ id, viewId, newValue })
  }, [])

  // Convert Map to POJO
  const obj: { [id: string]: T } = {}
  stateTogether.forEach((val, id) => (obj[id] = val))

  return [value, setter, obj]
}
