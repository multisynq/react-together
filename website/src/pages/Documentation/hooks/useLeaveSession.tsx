import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseLeaveSessionDocumentationPage() {
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
            code1={`const leaveSession = useLeaveSession()

return (
  <button onClick={() => leaveSession()}>
    Leave current session!
  </button>
)`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useLeaveSession')} keyToLookupWith='' />
}
