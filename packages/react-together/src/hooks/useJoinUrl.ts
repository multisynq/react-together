import { useSessionParams } from '@croquet/react'
import { useMemo } from 'react'
import { useIsTogether } from '.'
import { getJoinUrl } from '../utils'

export default function useJoinUrl(): string | null {
  const { name, password } = useSessionParams()
  const isTogether = useIsTogether()

  return useMemo(() => {
    if (!isTogether || !name || !password) return null

    return getJoinUrl(new URL(window.location.href), name, password).toString()
  }, [name, password, isTogether])
}
