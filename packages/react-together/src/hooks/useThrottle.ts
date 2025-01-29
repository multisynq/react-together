import { useCallback, useRef } from 'react'
import { useIsTogether } from '.'

// This hook wraps a given callback to call it at most once every `limit` milliseconds
// If we are currently disconnected from a session, we call the callback immediately
// Otherwise, we call the callback if the previous call was more than `limit` milliseconds ago
// If the callback was called less than `limit` ms ago, we schedule a call to the callback
// after `limit` ms have passed since the last call
// If multiple calls are scheduled, only the last call is executed
export default function useThrottle<T extends (...args: Parameters<T>) => void>(
  limit: number,
  callback: T
): T {
  const lastCallRef = useRef(0)
  const timeoutRef = useRef<Timer | null>(null)
  const isTogether = useIsTogether()

  return useCallback(
    (...args: Parameters<T>) => {
      if (!isTogether) {
        callback(...args)
        return
      }

      const now = Date.now()
      if (now - lastCallRef.current >= limit) {
        lastCallRef.current = now
        callback(...args)
      } else {
        const timeout = limit - (now - lastCallRef.current)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args)
          lastCallRef.current = Date.now()
        }, timeout)
      }
    },
    [callback, limit, isTogether]
  ) as T
}
