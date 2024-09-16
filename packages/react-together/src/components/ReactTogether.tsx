import { CroquetRoot } from '@croquet/react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import { SessionManager } from './SessionManager'

import {
  SESSION_NAME_PARAM,
  SESSION_PASSWORD_PARAM
} from '../hooks/useJoinSessionUrl'

type ReactTogetherSessionParams = {
  name?: string
  password?: string
  appId: string
  apiKey: string
  sessionIgnoresUrl?: boolean
  model?: typeof ReactTogetherModel
}
export type ReactTogetherProps = {
  children: ReactChildren
  sessionParams: ReactTogetherSessionParams
}

export default function ReactTogether({
  children,
  sessionParams
}: ReactTogetherProps) {
  const { appId, apiKey, sessionIgnoresUrl } = sessionParams

  // By default, sessions hosted in different URLs
  // should be different sessions even if they have the same name.
  // if sessionIgnoresUrl is true, sessions with the same name will
  // be the same session disregarding where they are being hosted
  let options = undefined
  if (!sessionIgnoresUrl) {
    options = {
      sessionUrl: window.location.origin + window.location.pathname
    }
  }

  // Check if there are session params in the URL
  const searchParams = new URLSearchParams(window.location.search)
  const searchName = searchParams.get(SESSION_NAME_PARAM)
  const searchPassword = searchParams.get(SESSION_PASSWORD_PARAM)

  return (
    <CroquetRoot
      sessionParams={{
        model: sessionParams.model || ReactTogetherModel,
        name: searchName || sessionParams.name,
        password: searchPassword || sessionParams.password,
        appId,
        apiKey,
        options
      }}
      showChildrenWhenDisconnected
    >
      <SessionManager>{children}</SessionManager>
    </CroquetRoot>
  )
}
