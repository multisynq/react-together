import { CroquetRoot } from '@croquet/react'
import ReactTogetherModel from '../models/ReactTogetherModel'

import { getSessionNameFromUrl, getSessionPasswordFromUrl } from '../utils'

type ReactTogetherSessionParams<D> = {
  apiKey: string
  appId: string
  name?: string
  password?: string
  model?: typeof ReactTogetherModel
  viewData?: D
}
export type ReactTogetherProps<D = undefined> = {
  children: ReactChildren
  sessionParams: ReactTogetherSessionParams<D>
  sessionIgnoresUrl?: boolean
  userId?: string
}

export default function ReactTogether<D>({
  children,
  sessionParams,
  sessionIgnoresUrl,
  userId
}: ReactTogetherProps<D & { userId?: string }>) {
  const { appId, apiKey } = sessionParams

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

  let viewData = sessionParams.viewData
  if (userId !== undefined) {
    if (viewData === undefined) {
      viewData = { userId } as D & { userId?: string }
    } else {
      viewData.userId = userId
    }
  }

  return (
    <CroquetRoot
      sessionParams={{
        model,
        name,
        password,
        appId,
        apiKey,
        options,
        viewData
      }}
      deferSession={!name || !password}
      showChildrenWithoutSession
    >
      {children}
    </CroquetRoot>
  )
}
