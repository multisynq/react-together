import { CroquetRoot } from '@croquet/react'
import ReactTogetherModel from '../models/ReactTogetherModel'

import { getSessionNameFromUrl, getSessionPasswordFromUrl } from '../utils'

type ReactTogetherSessionParams = {
  apiKey: string
  appId: string
  name?: string
  password?: string
  sessionIgnoresUrl?: boolean
  model?: typeof ReactTogetherModel
  viewInfo?: object
}
export type ReactTogetherProps = {
  children: ReactChildren
  sessionParams: ReactTogetherSessionParams
}

export default function ReactTogether({
  children,
  sessionParams
}: ReactTogetherProps) {
  const { appId, apiKey, sessionIgnoresUrl, viewInfo } = sessionParams

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
  const url = new URL(window.location.href)
  const searchName = getSessionNameFromUrl(url)
  const searchPassword = getSessionPasswordFromUrl(url)

  const model = sessionParams.model || ReactTogetherModel
  const name = searchName || sessionParams.name
  const password = searchPassword || sessionParams.password

  return (
    <CroquetRoot
      sessionParams={{
        model,
        name,
        password,
        appId,
        apiKey,
        options,
        viewInfo
      }}
      deferSession={!name || !password}
      showChildrenWithoutSession
    >
      {children}
    </CroquetRoot>
  )
}
