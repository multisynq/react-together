import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseCreateRandomSessionDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'createRandomSession',
            type: '() => void',
            description: 'A function that, when called, connects the user to a new React Together session',
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      title='useCreateRandomSession'
      description={
        'The useCreateRandomSession hook returns a function that when called, connects to a new React Together session, with a random name and password.'
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useCreateRandomSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`\
const createRandomSession = useCreateRandomSession()

return (
  <button onClick={() => createRandomSession()}>
    Connect to a new session!
  </button>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useCreateRandomSession')} />
}
