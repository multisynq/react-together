import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseJoinUrlDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'joinUrl',
            type: 'boolean',
            description: 'Indicates whether the user is connected to a React Together session.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useJoinUrl'
      description={'The useJoinUrl hook returns true if the user is connected to a React Together session, and false otherwise.'}
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useJoinUrl } from 'react-together'`} />
          <CodeBlock language='jsx' code1={`const joinUrl = useJoinUrl()`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useJoinUrl')} />
}
