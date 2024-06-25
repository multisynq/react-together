import { CroquetRoot } from '@croquet/react'
import ReactTogetherModel from '../models/ReactTogetherModel'

type ReactTogetherSessionParams = {
  appId: string
  apiKey: string
  name: string
  password: string
}

export type ReactTogetherProps = {
  children: ReactChildren
  sessionParams: ReactTogetherSessionParams
}
export default function ReactTogether({
  children,
  sessionParams
}: ReactTogetherProps) {
  const { appId, apiKey, name, password } = sessionParams

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
    <CroquetRoot
      sessionParams={{
        model: ReactTogetherModel,
        appId,
        apiKey,
        name,
        password
      }}
    >
      {children}
    </CroquetRoot>
  )
}
