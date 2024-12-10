import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
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
        <p>
          The <CodeSpan text='useJoinUrl' /> hook returns the url other users should connect to to join the current session. If there is no
          current session, this hook returns <CodeSpan text='null' />.
        </p>
      }
      usage={
        <>
          <CodeBlock language='jsx' codeShort={`import { useJoinUrl } from 'react-together'`} />
          <CodeBlock language='jsx' codeShort={`const joinUrl = useJoinUrl()`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useJoinUrl')} />
}
