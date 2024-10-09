import { CroquetRoot, useSetSession } from '@croquet/react'
import { useCallback } from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import { ReactTogetherContext } from '../ReactTogetherContext'

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

  const model = sessionParams.model || ReactTogetherModel
  const name = searchName || sessionParams.name
  const password = searchPassword || sessionParams.password

  return (
    <CroquetRoot
      sessionParams={{ model, name, password, appId, apiKey, options }}
      deferSession={!name && !password}
      showChildrenWithoutSession
    >
      <SessionManager>{children}</SessionManager>
    </CroquetRoot>
  )
}

function randomString(len: number) {
  return Math.floor(Math.random() * 36 ** 10)
    .toString(36)
    .slice(0, len)
}

function SessionManager({ children }: { children: ReactChildren }) {
  const setSession = useSetSession()

  const createNewSession = useCallback(() => {
    // Do we want to add them to the URL? Maybe that could be an option passed to this function
    const newSessionName = randomString(16)
    const newSessionPassword = randomString(16)
    setSession({
      name: newSessionName,
      password: newSessionPassword
    })
  }, [setSession])

  // TODO: eventually get circle from search param
  /*
    const sessionId = 
    useEffect(() => {
        const baseUrl = getWebsiteBaseURL()
        const circleId = searchParams.get('reactTogetherCircleId', null)
        if(circleId !== null) {
            const { sessionId, password } = circlesApi.getSessionCredentials(baseUrl, circleId)
            set_sessionId(sessionId)
            set_password(password)
        }
    }, [])

    // We would need some logic to not render anything until we are connected
    // to the right session
  */

  return (
    <ReactTogetherContext.Provider value={{ createNewSession }}>
      {children}
    </ReactTogetherContext.Provider>
  )
}
