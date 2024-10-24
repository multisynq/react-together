import { useCroquetContext } from '@croquet/react'
import { useCallback, useEffect } from 'react'

export default function useFunctionTogether<
  T extends (...args: Parameters<T>) => void
>(rtKey: string, callback: T): T {
  const { view, model } = useCroquetContext()

  useEffect(() => {
    if (view) {
      const handler = (args: Parameters<T>) => callback(...args)
      view.subscribe(rtKey, 'call', handler)
      return () => view.unsubscribe(rtKey, 'call', handler)
    }
  }, [rtKey, view, callback])

  return useCallback(
    (...args: Parameters<T>) => {
      if (view && model) {
        view.publish(model.id, 'functionTogether', { rtKey, args })
      } else {
        callback(...args)
      }
    },
    [rtKey, view, model, callback]
  ) as T
}
