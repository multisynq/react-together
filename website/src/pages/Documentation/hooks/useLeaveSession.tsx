import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseLeaveSessionDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'leaveSession',
            type: '() => void',
            description: 'Function that, when called, leaves the user from the current React Together session',
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      title='useLeaveSession'
      description={
        'The useLeaveSession hook returns a function that when called, disconnects the user from the current React Together session. If the user is not connected to any session, calling that function has no effect.'
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useLeaveSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`export default function ReactTogetherSessionManager() {
  const leaveSession = useLeaveSession()

  return (
    <button onClick={() => leaveSession()}>
      Disconnect from current session
    </button>
  )
}
`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useLeaveSession')} />
}
