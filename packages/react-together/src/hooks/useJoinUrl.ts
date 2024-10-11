import { useSessionParams } from '@croquet/react'
import { useIsTogether } from '..'

export const SESSION_NAME_PARAM = 'rtName'
export const SESSION_PASSWORD_PARAM = 'rtPwd'

export default function useJoinUrl(): string | null {
  const { name, password } = useSessionParams()
  const isTogether = useIsTogether()

  if (!isTogether || !name || !password) return null

  const url = new URL(window.location.href)
  url.searchParams.set(SESSION_NAME_PARAM, name)
  url.searchParams.set(SESSION_PASSWORD_PARAM, password)
  return url.toString()
}
