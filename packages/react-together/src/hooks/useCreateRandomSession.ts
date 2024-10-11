import { App, useSetSession } from '@croquet/react'
import { useCallback } from 'react'

export default function useCreateRandomSession() {
  const setSession = useSetSession()

  return useCallback(() => {
    setSession({ name: App.randomSession(), password: App.randomPassword() })
  }, [setSession])
}
