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
            type: 'string | null',
            description: 'The join url',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useJoinUrl'
      description={
        'The useJoinUrl hook returns the url other users should connect to to join the current session. If there is no current session, this hook returns null'
      }
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
