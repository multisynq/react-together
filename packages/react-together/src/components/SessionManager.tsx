import { useChangeSession } from '@croquet/react'
import { useCallback } from 'react'
import { ReactTogetherContext } from '../ReactTogetherContext'

function randomString(len: number) {
  const r = Math.random()
  const s = r.toString(36)
  const result = s.substring(2, len + 2)
  return result
}

export function SessionManager({ children }: { children: ReactChildren }) {
  const changeSession = useChangeSession()

  const createNewSession = useCallback(() => {
    // Do we want to add them to the URL? Maybe that could be an option passed to this function
    const newSessionName = randomString(16)
    const newSessionPassword = randomString(16)
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
