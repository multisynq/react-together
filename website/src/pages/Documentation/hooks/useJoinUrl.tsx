import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: { javascript: `import { useJoinUrl } from 'react-together'` },
  usage_2: { javascript: `const joinUrl = useJoinUrl()` },
}

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
          <CodeBlock code={codes.usage_1} />
          <CodeBlock code={codes.usage_2} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useJoinUrl')} />
}
