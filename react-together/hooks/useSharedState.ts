import { useReactModelRoot } from '@croquet/react'
import { Dispatch, SetStateAction } from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import { isFunction } from './types'

export default function useSharedState<T>(
  id: string,
  initial_value: T
): [T, Dispatch<SetStateAction<T>>] {
  const model = useReactModelRoot<ReactTogetherModel>()

  const value = model.state.get(id) as T
  if (value === undefined) {
    model.setState<T>({ id, newValue: initial_value })
  }

  const setter = (newValueOrFn: SetStateAction<T>): void => {
    let newValue: T
    if (isFunction(newValueOrFn)) {
      const prev = value
      newValue = newValueOrFn(prev)
    } else {
      newValue = newValueOrFn
    }
    model.setState<T>({ id, newValue })
  }

  return [value, setter]
}
