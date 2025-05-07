import { useLeaveSession as uls } from '@multisynq/react'
import { useCallback } from 'react'
import { getCleanUrl } from '../utils'

export default function useLeaveSession() {
  const ls = uls()

  return useCallback(() => {
    // Remove name and password from url if they exist
    const newUrl = getCleanUrl(new URL(window.location.href))
    window.history.replaceState({}, '', newUrl.toString())
    ls()
  }, [ls])
}
