import { useSessionName, useSessionPassword } from '@croquet/react'

export const SESSION_NAME_PARAM = 'rtName'
export const SESSION_PASSWORD_PARAM = 'rtPwd'

export default function useJoinSessionUrl() {
  const sessionName = useSessionName()
  const sessionPassword = useSessionPassword()

  if (!sessionName || !sessionPassword) return null

  const url = new URL(window.location.href)
  url.searchParams.set(SESSION_NAME_PARAM, sessionName)
  url.searchParams.set(SESSION_PASSWORD_PARAM, sessionPassword)
  return url.toString()
}
