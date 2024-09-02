import { useChangeSession } from '@croquet/react'
import { useCallback } from 'react'
import { ReactTogetherContext } from '../ReactTogetherContext'

export function SessionManager({ children }: { children: ReactChildren }) {
  const changeSession = useChangeSession()

  const createNewSession = useCallback(() => {
    // TODO: Eventually these values will be random
    // Math.random().toString(36).substring(16);
    // Do we want to add them to the URL? Maybe that could be an option passed to this function
    const newSessionName = 'v0_session'
    const newSessionPassword = 'pwd'
    changeSession({
      name: newSessionName,
      password: newSessionPassword
    })
  }, [changeSession])

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
