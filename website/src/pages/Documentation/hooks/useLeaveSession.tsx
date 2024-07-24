import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseLeaveSessionDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <p>This hook takes no parameters.</p>

      <h5>Return</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
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
          <CodeBlock language='javascript' code1={`import { useLeaveSession } from 'react-together'`} />
          <CodeBlock
            language='javascript'
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
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useLeaveSession')} keyToLookupWith='' />
}
