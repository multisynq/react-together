import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseConnectNewSessionDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'connectNewSession',
            type: '() => void',
            description: 'A function that, when called, connects the user to a new React Together session',
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      title='useConnectNewSession'
      description={
        'The useConnectNewSession hook returns a function that when called, connects to a new React Together session. The session name and password are randomly generated'
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useConnectNewSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`const connectNewSession = useConnectNewSession()

return (
  <button onClick={() => connectNewSession()}>
    Connect to a new session!
  </button>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useConnectNewSession')} />
}
