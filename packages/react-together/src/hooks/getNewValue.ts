import { SetStateAction } from 'react'

export function isFunction(arg: unknown): arg is Function {
  return typeof arg === 'function'
}

// Determines the new state value
export default function getNewValue<T>(
  prev: T,
  newValueOrFn: SetStateAction<T>
) {
  let newValue: T
  if (isFunction(newValueOrFn)) {
    newValue = newValueOrFn(prev)
  } else {
    newValue = newValueOrFn
  }
  return newValue
}
