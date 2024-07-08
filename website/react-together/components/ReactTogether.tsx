import { CroquetRoot } from '@croquet/react'
import { createContext, useState } from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'

type ReactTogetherSessionParams = {
  appId: string
  apiKey: string
}

export interface IReactTogetherContext {
  createNewSession: () => void
  leaveSession: () => void
  isTogether: boolean
  sessionName: string | null
  sessionPassword: string | null
}
export const ReactTogetherContext = createContext<
  IReactTogetherContext | undefined
>(undefined)

export type ReactTogetherProps = {
  children: ReactChildren
  sessionParams: ReactTogetherSessionParams
}
export default function ReactTogether({
  children,
  sessionParams
}: ReactTogetherProps) {
  const { appId, apiKey } = sessionParams

  const [sessionName, set_sessionName] = useState<null | string>(
    // import.meta.env.VITE_CROQUET_NAME || null
    'Test session'
  )
  const [sessionPassword, set_sessionPassword] = useState<null | string>(
    // import.meta.env.VITE_CROQUET_PASSWORD || null
    '123'
  )

  const isTogether = sessionName !== null && sessionPassword !== null

  const createNewSession = () => {
    // TODO: Eventually these values will be random
    // Do we want to add them to the URL? Maybe that could be an option passed to this function
    const newSessionName = 'v0_session'
    const newSessionPassword = 'pwd'
    set_sessionName(newSessionName)
    set_sessionPassword(newSessionPassword)
  }

  const leaveSession = () => {
    set_sessionName(null)
    set_sessionPassword(null)
  }
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
    <ReactTogetherContext.Provider
      value={{
        createNewSession,
        leaveSession,
        isTogether,
        sessionName,
        sessionPassword
      }}
    >
      {sessionName !== null && sessionPassword !== null ? (
        <CroquetRoot
          sessionParams={{
            model: ReactTogetherModel,
            appId,
            apiKey,
            name: sessionName,
            password: sessionPassword
          }}
        >
          <>
            {/* Connected to session {sessionName}!! */}
            {children}
          </>
        </CroquetRoot>
      ) : (
        children
      )}
    </ReactTogetherContext.Provider>
  )
}
