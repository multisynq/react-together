import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseConnectNewSessionDocumentationPage() {
  const content = (
    <GenericDocPage
      title='useConnectNewSession'
      description={'The useConnectNewSession hook returns a function that when called, connects to a new React Together session.'}
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useConnectNewSession } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`const connectNewSession = useConnectNewSession()

return (
  <button onClick={() => connectNewSession()}>
    Connect to a new session!
  </button>
)`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useConnectNewSession')} keyToLookupWith='' />
}
