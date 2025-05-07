import { App, useSetSession } from '@multisynq/react'
import { useCallback } from 'react'

export default function useCreateRandomSession() {
  const setSession = useSetSession()

  return useCallback(() => {
    setSession({ name: App.randomSession(), password: App.randomPassword() })
  }, [setSession])
}
