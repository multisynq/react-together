import { useCroquetView, useModelRoot } from '@croquet/react'
import { useCallback, useEffect } from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'

type UseFunctionTogetherCallback = (...args: unknown[]) => unknown

export default function useFunctionTogether(
  rtKey: string,
  callback: UseFunctionTogetherCallback
) {
  const view = useCroquetView()
  const model = useModelRoot<ReactTogetherModel>()

  useEffect(() => {
    if (view) {
      view.subscribe(rtKey, 'call', callback)
      return () => view.unsubscribe(rtKey, 'call', callback)
    }
  }, [rtKey, view, callback])

  return useCallback(
    (...args: unknown[]) => {
      if (view && model) {
        view.publish(model.id, 'functionTogether', {
          rtKey,
          viewId: view.viewId,
          args
        })
      } else {
        callback(...args)
      }
    },
    [rtKey, view, model, callback]
  )
}
