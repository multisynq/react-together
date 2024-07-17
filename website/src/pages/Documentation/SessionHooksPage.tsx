import { CodeBlock } from '@components/ui/CodeBlock'
import { NavItem } from './types'
import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import DocumentDemoBox from '@components/ui/DocumentDemoBox'

export const SessionHooksPage: React.FC = () => {
  const codeSampleIsTogether = `const isTogether = useIsTogether()
`

  const codeSampleConnectNewSession = `export default function ReactTogetherSessionManager() {
  const connectNewSession = useConnectNewSession()


  return (
    <button onClick={() => connectNewSession()}>
      Connect to a new session!
    </button>
  )
}

`
  const codeSampleLeaveSession = `export default function ReactTogetherSessionManager() {
  const leaveSession = useLeaveSession()


  return (
    <button onClick={() => leaveSession()}>
      Disconnect from current session
    </button>
  )
}
`
  const codeSampleConnectedUsers = `export default function ReactTogetherSessionManager() {
  const leaveSession = useLeaveSession()


  return (
    <button onClick={() => leaveSession()}>
      Disconnect from current session
    </button>
  )
}
`
  return (
    <>
      <h2>Session Hooks</h2>
      <h3 id='overview'>Overview</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <h3 id='example'>Example</h3>
      <DocumentDemoBox />
      <h4 id='useIsTogether'>useIsTogether()</h4>
      <p>The useIsTogether hook returns true if the user is connected to a React Together session, and false otherwise.</p>
      <CodeBlock language='javascript' code1={codeSampleIsTogether} />
      <h4 id='useConnectNewSession'>useConnectNewSession</h4>
      <p>
        The useConnectNewSession hook returns a function that when called, connects to a new React Together session. The session name and
        password are randomly generated (for now…)
      </p>
      <CodeBlock language='javascript' code1={codeSampleConnectNewSession} />
      <h4 id='useLeaveSession'>useLeaveSession()</h4>
      <p>The useLeaveSession hook returns a function that when called, disconnects the user from the current React Together session.</p>
      <CodeBlock language='javascript' code1={codeSampleLeaveSession} />
      <h4 id='useConnectedUsers'>useConnectedUsers</h4>
      <p>
        The useConnectedUsers hook returns an array of objects representing all the views that are connected to the current session. Each
        object has the following properties: viewId (string): the id of the view isYou (boolean): whether it’s the current view name: A
        randomly generated alias (for now…) to represent this view
      </p>
      <CodeBlock language='javascript' code1={codeSampleConnectedUsers} />
    </>
  )
}

export const sessionHooksNavItems: NavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'example', label: 'Example' },
  { key: 'useIsTogether', label: 'useIsTogether' },
  { key: 'useConnectNewSession', label: 'useConnectNewSession' },
  { key: 'useLeaveSession', label: 'useLeaveSession' },
  { key: 'useConnectedUsers', label: 'useConnectedUsers' },
]
