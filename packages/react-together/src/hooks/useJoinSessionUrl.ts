import { useIsJoined, useSessionParams } from '@croquet/react'

export const SESSION_NAME_PARAM = 'rtName'
export const SESSION_PASSWORD_PARAM = 'rtPwd'

export default function useJoinSessionUrl(): string | null {
  const { name, password } = useSessionParams()
  const isJoined = useIsJoined()

  if (!isJoined || !name || !password) return null

  const url = new URL(window.location.href)
  url.searchParams.set(SESSION_NAME_PARAM, name)
  url.searchParams.set(SESSION_PASSWORD_PARAM, password)
  return url.toString()
}
