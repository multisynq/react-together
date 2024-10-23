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
            name: 'isTogether',
            type: 'boolean',
            description: 'Indicates whether the user is connected to a React Together session.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useIsTogether'
      description={
        <p>
          The <CodeSpan text='useIsTogether' /> hook returns <CodeSpan text='true' /> if the user is connected to a React Together session,
          and <CodeSpan text='false' /> otherwise.
        </p>
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useIsTogether } from 'react-together'`} />
          <CodeBlock language='jsx' code1={`const isTogether = useIsTogether()`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useJoinUrl')} />
}
