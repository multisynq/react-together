import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
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
        <p>
          The <CodeSpan text='useCreateRandomSession' /> hook returns a function that when called, connects to a new React Together session,
          with a random name and password.
        </p>
      }
      usage={
        <>
          <CodeBlock language='jsx' codeShort={`import { useCreateRandomSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            codeShort={`\
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
