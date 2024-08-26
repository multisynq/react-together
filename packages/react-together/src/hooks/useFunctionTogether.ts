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
  const publish = useCallback(
    (...args: unknown[]) => {
      if (view && model) {
        console.log('Publishing', model.id)
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

  useEffect(() => {
    if (view) {
      const handler = (...args: any[]) => {
        callback(...args)
      }
      view.subscribe(rtKey, 'call', handler)
      return () => view.unsubscribe(rtKey, 'call', handler)
    }
  }, [rtKey, view, callback])

  return publish
}
