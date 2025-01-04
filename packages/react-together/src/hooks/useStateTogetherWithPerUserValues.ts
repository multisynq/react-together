import { useCroquetContext } from '@croquet/react'
import hash_fn, { NotUndefined } from 'object-hash'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import getNewValue from './getNewValue'
import useMyId from './useMyId'

interface ValueMap<T> {
  [userId: string]: T
}

// Represents the local state for the useStateTogetherWithPerUserValues hook.
// This interface manages both the local value and the synchronized values across all users.
// It uses a hash of the allValues to detect changes in the synchronized state.
interface LocalState<T> {
  localValue: T
  allValues: ValueMap<T>
  allValuesHash: string | null
}

// The empty object is used as the allValues value
// when the user is not connected to a session.
// Using this constant object avoids triggering
// useEffects that depend on the allValues object.
const EMPTY_OBJECT = Object.freeze({})

// Converts a Map to an object
function mapToObject<T>(map: Map<string, T>): ValueMap<T> {
  return Object.fromEntries(map.entries())
}

function getAllValuesAndHash<T>(
  map: Map<string, T>,
  omitId?: string
): { allValues: ValueMap<T>; allValuesHash: string } {
  const allValues = mapToObject(map)
  // Calculate the hash of all values, even if omitting the local value
  // So that we detect when the local value changes
  const allValuesHash = hash_fn(allValues)
  if (omitId) {
    delete allValues[omitId]
  }
  return {
    allValues,
    allValuesHash
  }
}

export interface UseStateTogetherWithPerUserValuesOptions {
  resetOnDisconnect?: boolean
  resetOnConnect?: boolean
  keepValues?: boolean
  overwriteSessionValue?: boolean
  omitLocalValue?: boolean
}
export default function useStateTogetherWithPerUserValues<
  T extends NotUndefined
>(
  rtKey: string,
  initialValue: T,
  options: UseStateTogetherWithPerUserValuesOptions = {}
): [T, Dispatch<SetStateAction<T>>, ValueMap<T>] {
  const {
    resetOnDisconnect = false,
    resetOnConnect = false,
    keepValues = false,
    overwriteSessionValue = false,
    omitLocalValue = false
  } = options

  // Memoize the initial value to ignore subsequent changes
  // https://react.dev/reference/react/useState
  const [actualInitialValue] = useState(initialValue)

  const { session, view, model } = useCroquetContext<ReactTogetherModel>()
  const myId = useMyId()

  const [allValuesState, setAllValuesState] = useState<LocalState<T>>(() => {
    if (!view || !model || myId === null) {
      return {
        localValue: actualInitialValue,
        allValues: EMPTY_OBJECT,
        allValuesHash: null
      }
    }

    // Initialize allValues with existing data or set initial value
    // We don't need to publish a setState event here, since that
    // will be done in the useEffect below
    const allValuesMap =
      (model.statePerUser.get(rtKey) as Map<string, T>) ??
      new Map([[myId, actualInitialValue]])
    const { allValues, allValuesHash } = getAllValuesAndHash(
      allValuesMap,
      omitLocalValue ? myId : undefined
    )
    return {
      localValue: allValuesMap.get(myId) ?? actualInitialValue,
      allValues,
      allValuesHash
    }
  })

  // Configure the state per user for this rtKey
  // We have to store the options configuration on the model side
  // because the publish on cleanup was not being sent
  useEffect(() => {
    if (view && model && myId) {
      // Configuring the state per user for this rtKey
      // We only need to send the config if it has not been set yet
      // or if the keepValues option has changed
      const config = model.statePerUserConfig.get(rtKey)
      if (!config || config.keepValues !== keepValues) {
        view.publish(model.id, 'configureStatePerUser', {
          rtKey,
          options: {
            // intentionally not passing other options to save bandwidth.
            // These values do not need to be synchronized
            // across users, and are only used locally to determine the behavior of the setter
            keepValues
          }
        })
      }
    }
  }, [view, model, rtKey, resetOnDisconnect, resetOnConnect, keepValues, myId])

  useEffect(() => {
    if (!session || !view || !model || myId === null) {
      setAllValuesState((prev) => ({
        localValue: resetOnDisconnect ? actualInitialValue : prev.localValue,
        allValues: EMPTY_OBJECT,
        allValuesHash: null
      }))
      return
    }

    // This handler is called when we connect to a session
    const handleConnect = () => {
      setAllValuesState((prev) => {
        // Create a copy of the model state map to avoid mutating it
        const map = new Map(model.statePerUser.get(rtKey) as Map<string, T>)

        /*
         * This code determines what value to use when connecting to a session.
         * The logic follows these rules:
         *
         * 1. If resetOnConnect is true:
         *    - Always use the initial value
         *
         * 2. If resetOnConnect is false:
         *    - First check if we have a previous local value:
         *      a) If no previous value exists:
         *         - Use session value if it exists
         *         - Otherwise use initial value
         *      b) If previous value exists:
         *         - Use previous value if no session value exists
         *         - If session value exists:
         *           • Use previous value if overwriteSessionValue is true
         *           • Use session value if overwriteSessionValue is false
         *
         * The function also tracks whether we need to publish the chosen value
         * back to the session (needed when we override the session value).
         */

        const prevLocalValue = prev.localValue
        const sessionValue = map.get(myId)

        let valueToUse: T

        if (resetOnConnect) {
          valueToUse = actualInitialValue
        } else if (prevLocalValue === undefined) {
          valueToUse = sessionValue ?? actualInitialValue
        } else if (sessionValue === undefined) {
          valueToUse = prevLocalValue ?? actualInitialValue
        } else {
          valueToUse = overwriteSessionValue ? prevLocalValue : sessionValue
        }

        if (valueToUse !== sessionValue) {
          view.publish(model.id, 'setStatePerUser', {
            rtKey,
            userId: myId,
            value: valueToUse
          })
          map.set(myId, valueToUse)
        }

        const { allValues: newAllValues, allValuesHash: newAllValuesHash } =
          getAllValuesAndHash(map, omitLocalValue ? myId : undefined)

        // Only update state if values have changed
        return prev.allValuesHash === newAllValuesHash
          ? prev
          : {
              localValue: valueToUse,
              allValues: newAllValues,
              allValuesHash: newAllValuesHash
            }
      })
    }

    handleConnect()

    // This handler is called when the model state is updated
    const handleUpdate = () => {
      setAllValuesState((prev) => {
        const allValuesMap =
          (model.statePerUser.get(rtKey) as Map<string, T>) ?? new Map()
        const { allValues: newAllValues, allValuesHash: newAllValuesHash } =
          getAllValuesAndHash(allValuesMap, omitLocalValue ? myId : undefined)

        // Only update state if values have changed
        return prev.allValuesHash === newAllValuesHash
          ? prev
          : {
              localValue: allValuesMap.get(myId) ?? actualInitialValue,
              allValues: newAllValues,
              allValuesHash: newAllValuesHash
            }
      })
    }

    view.subscribe(
      rtKey,
      { event: 'updated', handling: 'oncePerFrame' },
      handleUpdate
    )

    // Cleanup: remove value from model and unsubscribe
    return () => {
      view.unsubscribe(rtKey, 'updated', handleUpdate)
    }
  }, [
    rtKey,
    session,
    view,
    model,
    actualInitialValue,
    myId,
    resetOnDisconnect,
    resetOnConnect,
    keepValues,
    overwriteSessionValue,
    omitLocalValue
  ])

  // Setter function to update local and shared state
  const setter = useCallback(
    (newValueOrFn: SetStateAction<T>): void => {
      if (!view || !model || myId === null) {
        // Update local state when not connected
        setAllValuesState((prev) => {
          const newLocalValue = getNewValue(prev.localValue, newValueOrFn)
          return prev.localValue === newLocalValue
            ? prev
            : {
                localValue: newLocalValue,
                allValues: EMPTY_OBJECT,
                allValuesHash: null
              }
        })
      } else {
        // Update shared state when connected
        const allValues = model.statePerUser.get(rtKey) as Map<string, T>
        let prevLocalValue = allValues.get(myId)
        if (prevLocalValue === undefined) {
          // If the key is not in the allValues mapping, it is because
          // the publish(initialValue) has not been received by the current user yet
          // In that case, we use the initialValue
          console.warn(
            '[useStateTogetherWithPerUserValues:setter] prevLocalValue is undefined.' +
              `Using initialValue: ${actualInitialValue}`
          )
          prevLocalValue = actualInitialValue
        }
        const newLocalValue = getNewValue<T>(prevLocalValue, newValueOrFn)

        view.publish(model.id, 'setStatePerUser', {
          rtKey,
          userId: myId,
          value: newLocalValue
        })
      }
    },
    [rtKey, view, model, actualInitialValue, myId]
  )

  const { localValue, allValues } = allValuesState
  return [localValue, setter, allValues]
}
