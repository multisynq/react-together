import { useLeaveSession as uls } from '@croquet/react'
import { useCallback } from 'react'
import { SESSION_NAME_PARAM, SESSION_PASSWORD_PARAM } from './useJoinUrl'

export default function useLeaveSession() {
  const ls = uls()

  return useCallback(() => {
    // Remove name and password from search parameters if they exist
    const url = new URL(window.location.href)
    url.searchParams.delete(SESSION_NAME_PARAM)
    url.searchParams.delete(SESSION_PASSWORD_PARAM)
    window.history.replaceState({}, '', url.toString())
    ls()
  }, [ls])
}
